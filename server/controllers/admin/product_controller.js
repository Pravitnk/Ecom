import { imageUpload } from "../../helper/cloudinary.js";
import ProductModel from "../../models/products.model.js";

//image upload
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUpload(url);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("error".error.message);

    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = await new ProductModel({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();
    res.status(200).json({
      success: true,
      message: "New Product added",
    });
  } catch (error) {
    console.error("error", error);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//fetch all the product
const getAllProduct = async (req, res) => {
  try {
    const listOfAllProduct = await ProductModel.find({});

    res.status(200).json({
      success: true,
      data: listOfAllProduct,
      message: "fetched all the products",
    });
  } catch (error) {
    console.error("error", error);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//edit or update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await ProductModel.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.salePrice = totalStock || findProduct.totalStock;

    await findProduct.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("error", error);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    console.error("error", error);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export {
  handleImageUpload,
  addProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
