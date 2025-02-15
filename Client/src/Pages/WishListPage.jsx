import React, { useEffect, useState } from "react";
import {getAllWishlistItems} from '../connectors/services.js'
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from 'react-router-dom'
import { Button } from "@mui/material";
import { IconButton }from "@mui/material";
import {removeFromWishlist} from '../connectors/services.js'

const WishlistPage = () => {
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(false)
  const [reloadItems,setReloadItems] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    async function fetchWishlistItems() {
      try {
        const wishlistItems = await getAllWishlistItems()
        setItems(wishlistItems)
      } catch (error) {
        console.log("error occured while getting wishlist items in frontend ",error)
      }
    }
    fetchWishlistItems()
    setLoading(false)
  },[reloadItems])

  const removeFromWishListHandler = async(productId) => {
    const removedWishlistItem = await removeFromWishlist(productId)
    if(!removedWishlistItem){
      alert("An error occured while adding item to wishlist , Make sure you have internet connection")
    }
    else{
      alert("Item removed from wishlist")
    }
    setReloadItems(prev => !prev)
  }

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 space-y-4 z-1">
      {
        items.length > 0 ? 
        <div className="container mx-auto p-4">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Product Name</th>
            <th className="p-4 text-left">Unit Price</th>
            <th className="p-4 text-left">Stock Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="p-4 flex items-center gap-4">
                <img
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span>{item.product.name}</span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">
                    {item.product.price}
                  </span>
                </div>
              </td>
              <td className="p-4">
                {/* <span
                  className={`${
                    item.stockStatus === "In Stock"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.stockStatus}
                </span> */}
                <span className="text-green-500">In stock</span>
              </td>
              <td className="p-4 flex items-center gap-4">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {navigate(`/productDetail/${item.product._id}`)}}
                  // disabled={item.stockStatus === "Stock Out"}
                >
                  View product
                </Button>
                <IconButton aria-label="delete" color="error"  onClick={() => {removeFromWishListHandler(item.product._id)}}>
                  <DeleteIcon/>
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        
        : <div className=" bg-gray-300 h-96">
          <div className="font-extrabold w-screen text-3xl opacity-60">
          You don't have any items in wishlist
          </div>
         
        </div>
      }
    </div>
  );
};

export default WishlistPage;


