import React from 'react'
import Layout from './components/Layout.jsx'
import HomePage from './Pages/HomePage.jsx'
import ProductDetailPage from './Pages/ProductDetailPage.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProductPage from './components/Product/ProductPage.jsx'
import Navigation from './components/Navigation/Navigation.jsx'
import Login from './Pages/Login/Login.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import WishlistPage from './Pages/WishListPage.jsx'
import Checkout from './Pages/Checkout.jsx'
import {useSelector} from 'react-redux'
import CartTab from './Pages/CartTab.jsx'
import LoadingPage from './Pages/LoadingPage.jsx'
import {PaymentFailure,PaymentSuccess} from './Pages/PaymentPages.jsx'
function App() {
  const data = useSelector(state => state.auth)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<HomePage/>}/>
      <Route path='signin' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='productsPage/:firstCategory/:secondCategory' element={<ProductPage/>}/>
      <Route path='/productDetail/:productId' element={<ProductDetailPage/>}/>
      <Route path='/wishlist' element={<WishlistPage/>} />
      <Route path='cart' element={<CartTab/>}/>
      <Route path='loading' element={<LoadingPage/>}/>
      <Route path='success' element={<PaymentSuccess/>}/>
      <Route path='failure' element={<PaymentFailure/>}/>
      </Route>
      <Route path='checkout' element={<Checkout/>}/>
      
    </Routes>
    </BrowserRouter>
    )
}

export default App 