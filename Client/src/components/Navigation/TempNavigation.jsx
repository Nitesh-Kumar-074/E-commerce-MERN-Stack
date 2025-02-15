import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {toggleStatus} from '../../store/cart.js'

function TempNavigation() {
       const dispatch = useDispatch()
       const items = useSelector(store => store.cart.items)
       const [quantity,setQuantity] = useState(0)
       useEffect(() => {
              let qnty = 0
              items.map((item) => {
                     qnty += item.quantity
              })
              setQuantity(qnty)
       },[items])
       const handleClick = () => {
              dispatch(toggleStatus())
       }
  return (
    <div>
       <Button className='text-3xl m-4 p-4 bg-black ' onClick={handleClick}>CART  {quantity}</Button>
    </div>
  )
}

export default TempNavigation