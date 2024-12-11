import Feature from "../../models/features.js";

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featureImages = new Feature({
      image,
    });
    await featureImages.save();
    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: featureImages,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});
    res.json({
      success: true,
      message: "Feature images retrieved successfully",
      data: images,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
    });
  }
};

export { addFeatureImage, getFeatureImages };
