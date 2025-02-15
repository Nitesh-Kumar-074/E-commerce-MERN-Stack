import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../components/Cart/CartItem.jsx'
import { toggleStatus } from '../store/cart.js'
import { useNavigate } from 'react-router-dom'
import { getCartItemsOfUser } from '../connectors/services.js'
function CartTab() {
  const loggedInUser = useSelector(state => state.auth)
  const statusTab = useSelector(state => state.cart.cartTabStatus)
  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCloseTabCart = () => {
    navigate(-1)
  }

  return (
    <div>
      <h2 className="p-5 text-black text-2xl " style={{fontFamily:"Algerian"}}>Shopping Cart</h2>
      <div className="p-5 text-white overflow-y-scroll max-h-[calc(100vh-180px)]">
        {items.length > 0 ?

          items.map((item, index) => <CartItem key={index} item={item} />) :

          <div className='flex flex-col items-center justify-center h-full text-black text-2xl font-extrabold '>
            No items present in cart
            <img src='https://media.istockphoto.com/id/2166604387/vector/isometric-cardboard-box-carton-open-package-transportation-shipping-and-delivery.jpg?s=612x612&w=0&k=20&c=BSRzSHUJrELsvF5v1A7KuTUVyF3Cn09QPsXuQYgpu_c=' className='w-80'/>
          </div>}
      </div>{
        items.length > 0 && 
      <div className="w-full grid grid-cols-2">
        <button className="bg-black text-white p-3" onClick={handleCloseTabCart} >CLOSE</button>
        <button
          className={`p-3 text-white ${items.length > 0 ? "bg-purple-600" : "bg-purple-200"}`}
          disabled={items.length === 0}
          onClick={() => navigate("/checkout")}
        >
          CHECKOUT
        </button>
        
    </div>}
      </div >
  )
}

export default CartTab

