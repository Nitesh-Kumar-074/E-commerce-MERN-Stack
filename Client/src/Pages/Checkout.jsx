import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
function Checkout() {
  const navigate = useNavigate()
  const [products,setProducts] = useState([])
  const items = useSelector(state => state.cart.items)
  // setProducts(items)
  // console.log(items)
  let totalPrice = 0
  let tax = 0
  let deliveryCharge = 0

  for(let i =0;i<items.length;i++){
    totalPrice += items[i].product.price*items[i].quantity
  }

  tax = totalPrice*(0.18).toFixed(2)
  deliveryCharge = totalPrice*(0.1)
  let totalAmount = totalPrice*(1.28)
  totalPrice = totalPrice.toFixed(2)
  tax = tax.toFixed(2)
  deliveryCharge = deliveryCharge.toFixed(2)
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-gray-100 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {
                  items.map((item,idx) => <div className="flex items-start gap-4" key={idx}>
                  <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                    <img src={item.product.images[0].url} className="w-full object-contain" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-sm lg:text-base text-gray-800">Pumps</h3>
                    <ul className="text-xs text-gray-800 space-y-1 mt-3">
                      <li>Size <span className="float-right">{item.size}</span></li>
                      <li>Quantity <span className="float-right">{item.quantity}</span></li>
                      <li>Total Price <span className="float-right">{item.product.price*item.quantity}</span></li>
                    </ul>
                  </div>
                </div>)
                }                
                
              </div>
            </div>

            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4">
              <div className='mb-4 space-y-3'>
                {/* <p>Items price  -  <span className="ml-5">Rs. {totalPrice}</span></p>
                <p>Tax amount   -  <span className="ml-auto">Rs. {tax}</span></p>
                <p>Delivery Charge   -  <span className="ml-auto">Rs. {deliveryCharge}</span></p> */}
                <p className="flex flex-wrap gap-4   text-gray-800">Items price  <span className="ml-auto">{totalPrice}</span></p>
                <p className="flex flex-wrap gap-4   text-gray-800">Tax amount <span className="ml-auto">{tax}</span></p>
                <p className="flex flex-wrap gap-4   text-gray-800">Delivery charge <span className="ml-auto">{deliveryCharge}</span></p>
              </div>
              <h4 className="flex flex-wrap gap-4 text-sm lg:text-base font-bold text-gray-800">Total <span className="ml-auto">{totalAmount.toFixed(2)}</span></h4>
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form className="mt-8" onSubmit={(e) => {
            e.preventDefault()
          }}>
            <div>
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input required type="text" placeholder="First Name"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>

                <div>
                  <input required type="text" placeholder="Last Name"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>

                <div>
                  <input required type="email" placeholder="Email"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>

                <div>
                  <input required type="number" placeholder="Phone No."
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input required type="text" placeholder="Address Line"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <input required type="text" placeholder="City"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <input required type="text" placeholder="State"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <input required type="text" placeholder="Zip Code"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
              </div>

              <div className="flex gap-4 max-md:flex-col mt-8">
                <button type="button" className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1" onClick={() => {navigate(-1)}}>Cancel</button>
                <button type="submit" className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
                  alert("Ordered successfully")
                  navigate("/")
                }}>Complete Purchase</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout