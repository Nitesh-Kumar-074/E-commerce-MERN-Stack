import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../connectors/services.js';
import NotFoundPage from './NotFoundPage.jsx';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector,useDispatch } from 'react-redux';
import {createCartItem,existedCartItem,updateQuantityOfCartItem,addToWishList,removeFromWishlist,itemAlreadyInWishlist} from '../connectors/services.js'
import {addItemToCart,updateQuantity} from '../store/cart.js'
// import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [size,setSize] = useState("Not applicable")
  const [quantity,setQuantity] = useState(1)
  const [alreadyInWishList,setAlreadyInWishList] = useState(false)

  const loggedInUser = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const itemsPresentInCart = useSelector(state => state.cart)

  const handleSizeClick = (e) => {
    setSize(e.target.value)
  }

  useEffect(() => {
    async function fetchWishlistStatus(){
      const item = await itemAlreadyInWishlist(productId)
      if(item){
        setAlreadyInWishList(true)
      }
      else{
        setAlreadyInWishList(false)
      }
    }
    if(loggedInUser.flag)
    fetchWishlistStatus()
  },[])

  const addToWishListHandler = async () => {
    const createdWishlistItem = await addToWishList(productId) 
    if(!createdWishlistItem){
      alert("An error occured while adding item to wishlist , Make sure you have internet connection")
      setAlreadyInWishList(false)
    }
    else{
      alert("Item added in wishlist")
      setAlreadyInWishList(true)
    }
  }

  const removeFromWishListHandler = async () => {
    const removedWishlistItem = await removeFromWishlist(productId)
    if(!removedWishlistItem){
      alert("An error occured while adding item to wishlist , Make sure you have internet connection")
      setAlreadyInWishList(true)
    }
    else{
      alert("Item removed from wishlist")
      setAlreadyInWishList(false)
    }
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await getProductById(productId);
        setProduct(response);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);


  const addToCartHandler = async () => {
    async function hello(){
      const cartItemAlreadyExist = await existedCartItem(productId,size)
    if(cartItemAlreadyExist){
      const cartItemId = cartItemAlreadyExist._id
      const newQuantity = cartItemAlreadyExist.quantity + quantity
      const updatedItem = await updateQuantityOfCartItem(cartItemId,newQuantity)
      dispatch(updateQuantity({cartItemId,newQuantity}))
    }
    else{
      const data = {quantity,size,productId}
      const createdItem = await createCartItem(data)
      dispatch(addItemToCart({createdItem}))
    }
    alert("Item added to cart")
    }
    hello()
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <NotFoundPage />;
  }

  return (
    <div className="font-[sans-serif] p-4">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full lg:sticky top-0">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2 w-16 shrink-0">
                {product.images?.map((item, idx) => (
                  <img
                    key={idx}
                    src={item.url}
                    alt={item.public_id}
                    onClick={() => setImageIndex(idx)}
                    className={`aspect-[64/85] object-cover w-full cursor-pointer border-2 ${
                      idx === imageIndex ? 'border-black' : 'border-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex-1">
                <img
                  src={product.images[imageIndex]?.url}
                  alt={product.images[imageIndex]?.public_id}
                  className="w-full aspect-[548/712] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-500 mt-1 text-sm">{product.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <h4 className="text-green-800 text-2xl font-bold">Rs. {product.price}</h4>
            </div>

            <hr className="my-6 border-gray-300" />

            <div>
              <h3 className="text-lg font-bold text-gray-800">Sizes</h3>
              <div className="flex flex-wrap gap-4 mt-4">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={handleSizeClick}
                    value={size}
                    disabled={!loggedInUser.flag}
                    className="w-10 h-9 border border-gray-300 hover:border-blue-600  text-sm flex items-center justify-center"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {
              size !== "Not applicable" && <div className="flex flex-col items-center gap-4">
              <p className="font-semibold text-lg">
                Selected size = <span className="font-bold text-purple-600">{size}</span>
              </p>
              <div className="flex items-center border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100">
                <AddIcon className="text-gray-700 cursor-pointer hover:text-purple-600 hover:scale-110 transition-transform border-r-2" onClick={() => {setQuantity((prev) => (prev+1))}}/>
                <p className="mx-4 text-lg font-bold text-gray-800">{quantity}</p>
                <RemoveIcon className="text-gray-700 cursor-pointer hover:text-purple-600 hover:scale-110 transition-transform border-l-2" onClick={() => {
                  setQuantity((prev) => {
                    if(prev > 1) 
                      return prev-1;
                    else
                    return prev
                  })
                }}/>
              </div>
              
              <button className="bg-red-600 font-semibold text-lg py-3 px-8 rounded-md text-white hover:bg-red-700 hover:scale-105 transition-transform" onClick={addToCartHandler}>
                Add to Cart
              </button>
            </div>
            
            }
            <br /><br />
            <hr/>
            <br/>
            
            <hr className="my-6 border-gray-300" />{
            loggedInUser.flag ? alreadyInWishList ? <button className='text-lg bg-red-600 text-white rounded-lg px-6 py-4 border-red-800' onClick={removeFromWishListHandler}>Remove from Wishlist  <HeartBrokenIcon/></button>  : <button className='text-lg bg-pink-600 text-white rounded-lg px-6 py-4 border-pink-800' onClick={addToWishListHandler}>Add to wishlist <FavoriteIcon/></button> : <div>You can't add any product in your cart or wishlist, until you are not logged in.
                <br/>
                <span style={{fontFamily:"cursive"}}>Want to login ? <button className='text-blue-700' onClick={() => {navigate("/signin")}}>Login</button></span>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
