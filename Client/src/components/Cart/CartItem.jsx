import React, { useEffect, useState } from 'react'
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {getCartItemById,updateQuantityOfCartItem,deleteCartItem} from '../../connectors/services.js'
import {useDispatch} from 'react-redux'
import { Button } from '@mui/material';
import {useSelector} from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import {updateQuantity,removeItemFromCart} from '../../store/cart.js'

function CartItem({item}) {
  const dispatch = useDispatch()
  const [totalPrice,setTotalPrice] = useState(item.quantity*item.product.price)
  const [quantity,setQuantity] = useState(item.quantity)
  // const loggedInUser = useSelector(state => state.auth)
  // const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  

  const additionHandler = async () => {
    try {
      // setLoading(true);
      const newQuantity = quantity + 1; // Calculate the new quantity
      
      setQuantity(newQuantity); // Update the quantity state
      setTotalPrice(newQuantity * item.product.price);
      dispatch(updateQuantity({cartItemId : item._id,newQuantity}))
      // Update total price
      // setLoading(false);
      await updateQuantityOfCartItem(item._id, newQuantity); // Call the API with new quantity
      setError(false);
    } catch (error) {
      console.error("Error occurred in additionHandler", error);
      // setLoading(false);
      setError(true);
    }
  };
  
  
  const subtractionHandler = async () => {
    try {
      // setLoading(true);
      if (quantity === 1) {
        dispatch(removeItemFromCart({cartItemId : item._id}))
        await deleteCartItem(item._id);
      } else {
        const newQuantity = quantity - 1; // Calculate the new quantity
        setQuantity(newQuantity)
        setTotalPrice(newQuantity*item.product.price)
        dispatch(updateQuantity({cartItemId : item._id,newQuantity}))
        await updateQuantityOfCartItem(item._id, newQuantity); // Call the API with new quantity
      }
      setError(false);
    } catch (error) {
      console.error("Error occurred in subtractionHandler", error);
      setError(true);
    }
  };
  const removeHandler = async () => {
    try {
      dispatch(removeItemFromCart({cartItemId : item._id}))
        await deleteCartItem(item._id);
        setError(false)
    } catch (error) {
      alert("Can't remove item from cart")
      console.error("Error occurred in removeHandler function:", error);
      setError(true);
    }
  };
  

  if(error || !item){
    return <div>Error in getting cartItem</div>
  }

  return (
    item ? <div className="grid grid-cols-3 items-start gap-4 bg-white my-2 p-2 rounded-lg">
    <div className="col-span-2 flex items-start gap-4">
        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
            <img src={item.product.images[0].url} className="w-full h-full object-contain" />
        </div>

        <div className="flex flex-col">
            <h3 className="text-base font-bold text-gray-800">{item.product.name}</h3>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">Size: {item.size}</p>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">Unit price: Rs.{item.product.price}</p>
            

            <Button className='bg-red-600 text-white text-sm' onClick={removeHandler}>REMOVE <DeleteIcon/></Button>
        </div>
    </div>

    <div className="ml-auto">
        <h4 className="text-lg max-sm:text-base font-bold text-gray-800">Rs. {totalPrice}</h4>

        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 mt-4">
      <button
        onClick={subtractionHandler}
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <RemoveIcon />
      </button>
      <span className="mx-4 text-gray-800 font-small">{quantity}</span>
      <button
        onClick={additionHandler}
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <AddIcon />
      </button>
    </div>
    </div>
</div> : <div>Loading...</div>
  )
}

export default CartItem


