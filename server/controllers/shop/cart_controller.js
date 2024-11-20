import Cart from "../../models/cart.model.js";
import ProductModel from "../../models/products.model.js";
import userModel from "../../models/user.model.js";

const findUserIdByClerkId = async (clerkId) => {
  const user = await userModel.findOne({ clerkId });
  if (!user) {
    throw new Error("User not found");
  }
  return user._id; // Return MongoDB ObjectId
};

const addToCart = async (req, res) => {
  try {
    const { clerkId, productId, quantity } = req.body;
    console.log("clerkId, productId, quantity", clerkId, productId, quantity);

    if (!clerkId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const userId = await findUserIdByClerkId(clerkId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({
        productId,
        quantity,
        price: product.price, // Add price field
      });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error Occured",
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const { clerkId } = req.params; // Replace userId with clerkId

    if (!clerkId) {
      return res.status(404).json({
        success: false,
        message: "clerkId not found",
      });
    }

    // Find the userId associated with the clerkId
    const userId = await findUserIdByClerkId(clerkId);
    console.log("Mapped UserId:", userId);

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "cart not found",
      });
    }

    // Filter valid cart items
    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error Occured",
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { clerkId, productId, quantity } = req.body;

    if (!clerkId || !productId || quantity === undefined || quantity === null) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    // Fetch userId using clerkId
    const userId = await findUserIdByClerkId(clerkId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present",
      });
    } else {
      // Update item quantity
      cart.items[findCurrentProductIndex].quantity += quantity;

      // Ensure quantity does not fall below 1
      if (cart.items[findCurrentProductIndex].quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Quantity cannot be less than 1.",
        });
      }
    }

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error Occurred",
    });
  }
};

const deleteToCart = async (req, res) => {
  try {
    const { clerkId, productId } = req.params;
    console.log("clerkId", clerkId);
    console.log("productId", productId);

    if (!clerkId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    // Fetch the userId using clerkId
    const userId = await findUserIdByClerkId(clerkId);

    let cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Filter out the product to delete
    cart.items = cart.items.filter(
      (item) => item.productId && item.productId._id.toString() !== productId
    );

    await cart.save();

    // Populate cart items again (this isn't necessary if already populated above)
    await Cart.populate(cart, {
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error Occurred",
    });
  }
};

export { addToCart, getCartItems, updateCartItemQuantity, deleteToCart };
