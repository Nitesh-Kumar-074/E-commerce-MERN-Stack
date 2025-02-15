import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const productSchema = new mongoose.Schema({
       name: { type: String, required: true },
       owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
       },
       description: { type: String, required: true },
       price: { type: Number, required: true },
       category: [{ type: String}],
       brand: { type: String, required : true },
       stock: { type: Number, required: true, default: 0 },
       images: [{ url: String, public_id: String }], // for image storage (e.g., Cloudinary)
       ratings: { type: Number, default: 0 },
       color : {type : String,required : true},
       sizes : [{type:String}]
     },{timestamps:true});

productSchema.plugin(mongoosePaginate)
const Product = mongoose.model("Product",productSchema)

export {Product}