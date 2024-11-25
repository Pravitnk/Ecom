import mongoose from "mongoose";
import Address from "../../models/address.js";

const addAddress = async (req, res) => {
  try {
    const { clerkId, address, state, city, pincode, phone, notes } = req.body;

    if (
      !clerkId ||
      !address ||
      !state ||
      !city ||
      !pincode ||
      !phone ||
      !notes
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const newlyCreatedAddress = await Address.create({
      clerkId,
      address,
      state,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    res.status(200).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Address Server Error Occurred",
    });
  }
};

const getAllAddress = async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const addresses = await Address.find({ clerkId });

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Address Server Error Occurred",
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { clerkId, addressId } = req.params;
    const formData = req.body;

    if (!clerkId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and Address ID's are required",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        clerkId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address not found",
      });
    }
    // await address.save();

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Address Server Error Occurred",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { clerkId, addressId } = req.params;
    const formData = req.body;

    if (!clerkId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and Address ID's are required",
      });
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      clerkId,
    });

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Address Server Error Occurred",
    });
  }
};

export { addAddress, getAllAddress, updateAddress, deleteAddress };
