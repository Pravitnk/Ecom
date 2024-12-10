import ProductModel from "../../models/products.model.js";

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "keyword is required and must be in string",
      });
    }
    const regex = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { brand: regex },
      ],
    };
    const searchResults = await ProductModel.find(createSearchQuery);
    res.json({
      success: true,
      message: "Search Results",
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: fasle,
      message: "Server Error occured",
    });
  }
};

export { searchProducts };
