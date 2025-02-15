import { Order} from '../models/order.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const createOrder = async(req,res) => {
       try {
              const user = req.user._id
              const {items,shippingInfo,amount} = req.body
              if((!Array.isArray(items)) || items.length === 0){
                     return res.status(200).json(new ApiResponse(true,200,"There is no items in order"))
              }
              
              let taxAmount = amount*0.18;
              let shippingAmount = 0.08*amount;
              let totalAmount = amount + taxAmount + shippingAmount;
              const createdOrder = await Order.create({
                     user,
                     orderItems : items,
                     shippingInfo,
                     taxAmount,
                     shippingAmount,
                     totalAmount
              })
              return res.status(200).json(new ApiResponse(true,200,"Order places successfully",createdOrder))
       } catch (error) {
              console.error(error)
              return res.status(500).json("Caught error in createOrder function")
       }
}


export {createOrder}