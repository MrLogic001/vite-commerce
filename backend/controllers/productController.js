import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

{
  /*-----------Controller for adding products-------------*/
}
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    console.log("Received files:", req.files); // Log the received files

    const image1 = req.files.image1 ? req.files.image1[0] : null;
    const image2 = req.files.image2 ? req.files.image2[0] : null;
    const image3 = req.files.image3 ? req.files.image3[0] : null;
    const image4 = req.files.image4 ? req.files.image4[0] : null;

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== (undefined || null)
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product added",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller for list all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error({ success: false, message: error.message });
  }
};

{
  /*------------Controller for removing products--------------*/
}
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id); // Corrected line
    res.status(200).json({
      success: true,
      message: "Product removed.",
    });
  } catch (error) {
    console.error(error.message); // Use console.error for errors
    res.status(500).json({
      success: false,
      message: "An internal server error occurred: " + error.message,
    });
  }
};

// Controller for fetching single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    } else {
      res.status(200).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    console.error({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
