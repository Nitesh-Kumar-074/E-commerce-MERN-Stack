import { Product } from '../models/product.model.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { uploadImageOnCloudinary } from '../utils/cloudinary.js'

const createProduct = async (req, res) => { 
       try { 
              const { name, description, price, category, brand, stock } = req.body
              if (!name || !description || !price || !brand) {
                     return res.status(404).json(new ApiResponse(false, 404, "All fields are compulsary"))
              }
              if (!Array.isArray(category) || category.length < 2) {
                     return res.status(404).json(new ApiResponse(false, 404, "At least two-level category is required"));
              }

              if (!req.user) {
                     return res.status(404).json(new ApiResponse(false, 404, "User must be logged in to add product in store"))
              }
              let productImages = []
              if (req.files && req.files.productImages && Array.isArray(req.files.productImages) && req.files.productImages.length > 0) {
                     for (let idx = 0; idx < Math.min(5, req.files.productImages.length); idx++) {
                            productImages.push(req.files.productImages[idx].path)
                     }
              }
              if (productImages.length == 0) {
                     return res.status(404).json(new ApiResponse(false, 404, "Product images are not present"))
              }
              let images = [];
              for (let i = 0; i < productImages.length; i++) {
                     let response = await uploadImageOnCloudinary(productImages[i])
                     let newObject = {
                            url: response.url,
                            public_id: response.asset_id
                     }
                     images.push(newObject)
              }
              const createdProduct = await Product.create({
                     name,
                     description,
                     owner: req.user._id,
                     price,
                     category,
                     brand,
                     stock: stock || 0,
                     images
              })

              return res.status(201).json(new ApiResponse(true, 201, "Product created successfully", createdProduct))

       } catch (error) {
              console.error(error)
              return res.status(500).json( "Error in product creation")
       }
}

const getProductById = async (req, res) => {
       try {
              const { productId } = req.params
              if (!productId) {
                     return res.status(404).json(new ApiResponse(false, 404, "productId is missing in parameter"))
              }
              const product = await Product.findById(productId)
              if (!product) {
                     return res.status(404).json(new ApiResponse(false, 404, "product not found"))
              }
              return res.status(200).json(new ApiResponse(true, 200, "Product fetched successfully", product))
       } catch (error) {
              console.error(error)
              return res.status(500).json( "Error in get product by id")
       }
}

const updateProduct = async (req, res) => {
       try {
              const productId = req.params
              let { description, price, stock } = req.body
              const product = await getProductById(productId)
              if (!product) {
                     return res.status(404).json(new ApiResponse(false, 404, "Product not found"))
              }
              description = description || product.description
              price = price || product.price
              stock = stock || product.stock
              const updatedProduct = await Product.findByIdAndUpdate(productId, {
                     description,
                     price,
                     stock
              })
              return res.status(200).json(new ApiResponse(true, 200, "Product updated successfully", updatedProduct))
       } catch (error) {
              console.error(error)
              return res.status(500).json("Error caught in updateProduct")
       }
}

const getProducts = async (req, res) => {
       try {
              const { firstLevelCategory, secondLevelCategory } = req.params
              if (!firstLevelCategory || !secondLevelCategory) {
                     return res.status(404).json(new ApiResponse(false, 404, "All parameters are not present"))
              }
              const products = await Product.find({
                     "category.0": firstLevelCategory,
                     "category.1": secondLevelCategory,
              }) || [];

              if (products.length === 0) {
                     return res
                            .status(200)
                            .json(new ApiResponse(true, 200, "No products found for the given categories"));
              }

              return res
                     .status(200)
                     .json(new ApiResponse(true, 200, "Products fetched successfully", products));
       } catch (error) {
              console.error(error)
              return res.status(500).json("Error caught in updateProduct")
       }
}

const createProductWithoutCloudinary = async (req, res) => {
       try {
              const { name, description, price, category, brand, stock, images,color,sizes } = req.body
              if (!req.user) {
                     return res.status(404).json(new ApiResponse(false, 404, "User must be logged in to add product in store"))
              }
              const createdProduct = await Product.create({
                     name,
                     description,
                     owner: req.user._id,
                     price,
                     category,
                     brand,
                     stock: stock || 0,
                     images,
                     color,
                     sizes
              })

              return res.status(201).json(new ApiResponse(true, 201, "Product created successfully", createdProduct))

       } catch (error) {
              console.error(error)
              return res.status(500).json('Error in create products function')
       }
}

const paginatedProducts = async (req, res) => {
       try {
       //     const page = parseInt(req.query.page, 10) || 1; // Default page 1
       //     const colors = req.query.color ? req.query.color.split(',') : [];
           const { firstLevelCategory, secondLevelCategory,color,page } = req.params;
           const colors = color ? color.split(',') : []
           if (!firstLevelCategory || !secondLevelCategory) {
               return res.status(400).json({
                   success: false,
                   status: 400,
                   message: "All parameters are not present",
               });
           }
   
           const response = await Product.paginate(
               {
                   color: { $in: colors },
                   "category.0": firstLevelCategory,
                   "category.1": secondLevelCategory,
               },
               { page, limit: 8 }
           );
   
           return res.status(200).json(response);
       } catch (error) {
           console.error("Error in paginatedProducts", error);
           return res.status(500).json({
               success: false,
               message: `An error occurred: ${error.message}`,
           });
       }
   };
   
   
   

export { createProduct, getProductById, updateProduct, getProducts, createProductWithoutCloudinary,paginatedProducts }