import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
};

async function createCartItem(formdata) {
  try {
    const createdItem = await axios.post(`${BASE_URL}/shopping/cart/createItem`, formdata, {
      ...axiosConfig
    });
    return createdItem?.data?.data;
  } catch (error) {
    console.log('error in addItemToCart connector ', error);
    return null;
  }
}

async function updateQuantityOfCartItem(cartItemId, quantity) {
  try {
    const updatedCartItem = await axios.patch(`${BASE_URL}/shopping/cart/updateQuantityOfItem/${cartItemId}`, { quantity }, {
      ...axiosConfig
    });
    return updatedCartItem?.data?.data;
  } catch (error) {
    console.log('error in updateQuantityOfCartItem connector  ', error);
    return null;
  }
}

async function existedCartItem(productId, size) {
  try {
    const cartItem = await axios.get(`${BASE_URL}/shopping/cart/existedCartItem/${productId}/${size}`, {
      withCredentials: true
    });
    return cartItem?.data?.data;
  } catch (error) {
    console.log('error in existedItem connector  ', error);
    return null;
  }
}

async function deleteCartItem(cartItemId) {
  try {
    const deletedCartItem = await axios.delete(`${BASE_URL}/shopping/cart/deleteItem/${cartItemId}`, {
      withCredentials: true
    });
    return deletedCartItem?.data?.data;
  } catch (error) {
    console.log('error in deleteCartItem connector  ', error);
    return null;
  }
}

async function getCartItemById(cartItemId) {
  try {
    const cartItem = await axios.get(`${BASE_URL}/shopping/cart/getItemById/${cartItemId}`, {
      withCredentials: true
    });
    return cartItem?.data?.data;
  } catch (error) {
    console.log('error in getCartItemById connector  ', error);
    return null;
  }
}

async function getCartItemsOfUser() {
  try {
    const cartItems = await axios.get(`${BASE_URL}/shopping/cart/getAllItemsOfUser`, {
      withCredentials: true
    });
    return cartItems?.data?.data;
  } catch (error) {
    console.log('error in getCartItemsOfUser connector  ', error);
    return null;
  }
}

async function addToWishList(productId) {
  try {
    const wishlistItem = await axios.post(`${BASE_URL}/shopping/wishlist/addToWishList/${productId}`, {}, {
      withCredentials: true
    });
    return wishlistItem?.data?.data;
  } catch (error) {
    console.log('error in addToWishList connector  ', error);
    return null;
  }
}

async function removeFromWishlist(productId) {
  try {
    const deletedWishlistItem = await axios.delete(`${BASE_URL}/shopping/wishlist/removeFromWishlist/${productId}`, {
      withCredentials: true
    });
    return deletedWishlistItem?.data?.data;
  } catch (error) {
    console.log('error in removeFromWishlist connector  ', error);
    return null;
  }
}

async function itemAlreadyInWishlist(productId) {
  try {
    const item = await axios.get(`${BASE_URL}/shopping/wishlist/alreadyInWishList/${productId}`, {
      withCredentials: true
    });
    return item?.data?.data;
  } catch (error) {
    console.log('error in itemAlreadyInWishlist connector  ', error);
    throw error;
  }
}

async function getAllWishlistItems() {
  try {
    const items = await axios.get(`${BASE_URL}/shopping/wishlist/getAllWishlistItems`, {
      withCredentials: true
    });
    console.log("items received in wishlist connector ", items?.data?.data);
    return items?.data?.data;
  } catch (error) {
    console.log("Error in getAllWishlistItems in connector", error);
    throw error;
  }
}

async function createProduct(formdata) {
  try {
    const createdProduct = await axios.post(`${BASE_URL}/shopping/product/createProduct`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
    return createdProduct?.data?.data;
  } catch (error) {
    console.log('error in createProduct connector  ', error);
    return null;
  }
}

async function getProductById(productId) {
  try {
    const product = await axios.get(`${BASE_URL}/shopping/product/getProductById/${productId}`);
    return product?.data?.data;
  } catch (error) {
    console.log('error in getProductById connector  ', error);
    return null;
  }
}

async function updateProduct(productId, formdata) {
  try {
    const updatedProduct = await axios.patch(`${BASE_URL}/shopping/product/updateProduct/${productId}`, formdata, {
      ...axiosConfig
    });
    return updatedProduct?.data?.data;
  } catch (error) {
    console.log('error in updateProduct connector  ', error);
    return null;
  }
}

async function getProducts(firstLevelCategory, secondLevelCategory, parameters) {
  try {
    const response = await axios.get(`${BASE_URL}/shopping/product/paginatedProducts/${firstLevelCategory}/${secondLevelCategory}/${parameters.color}/${parameters.page}`);
    return response?.data;
  } catch (error) {
    console.error('Error in getProducts:', error.message);
    return null;
  }
}

async function createProductWithoutCloudinary(formdata) {
  try {
    const product = await axios.post(`${BASE_URL}/shopping/product/createProductWithoutCloudinary`, formdata, {
      ...axiosConfig
    });
    return product?.data?.data;
  } catch (error) {
    console.log('error in createProductWithoutCloudinary connector  ', error);
    return null;
  }
}

export {
  createCartItem,
  existedCartItem,
  updateQuantityOfCartItem,
  deleteCartItem,
  getCartItemById,
  getCartItemsOfUser,
  addToWishList,
  removeFromWishlist,
  itemAlreadyInWishlist,
  getAllWishlistItems,
  createProduct,
  getProductById,
  updateProduct,
  getProducts,
  createProductWithoutCloudinary
};


// import axios from 'axios'

// async function createCartItem(formdata) {
//        try {
//               const createdItem = await axios.post(`/shopping/cart/createItem`,formdata,{
//                      headers: {
//                             "Content-Type" : "application/json"
//                      }
//               })
//               return createdItem?.data?.data
//        } catch (error) {
//               console.log('error in addItemToCart connector ', error)
//               return null
//        }
// }

// async function updateQuantityOfCartItem(cartItemId, quantity) {
//        try {
//               const updatedCartItem = await axios.patch(`/shopping/cart/updateQuantityOfItem/${cartItemId}`, { quantity }, {
//                      headers: {
//                             'Content-Type': 'application/json'
//                      }
//               })
//               return updatedCartItem?.data?.data
//        } catch (error) {
//               console.log('error in updateQuantityOfCartItem connector  ', error)
//               return null
//        }
// }

// async function existedCartItem(productId,size){
//        try {
//               const cartItem = await axios.get(`/shopping/cart/existedCartItem/${productId}/${size}`)
//               return cartItem?.data?.data

//        } catch (error) {
//               console.log('error in existedItem connector  ', error)
//               return null
//        }
// }

// async function deleteCartItem(cartItemId) {
//        try { 
//               const deletedCartItem = await axios.delete(`/shopping/cart/deleteItem/${cartItemId}`)
//               return deletedCartItem?.data?.data
//        } catch (error) {
//               console.log('error in deleteCartItem connector  ', error)
//               return null
//        }
// }

// async function getCartItemById(cartItemId) {
//        try {
//               const cartItem = await axios.get(`/shopping/cart/getItemById/${cartItemId}`)
//               return cartItem?.data?.data
//        } catch (error) {
//               console.log('error in getCartItemById connector  ', error)
//               return null
//        }
// }

// async function getCartItemsOfUser(){
//        try {
//               const cartItems = await axios.get(`/shopping/cart/getAllItemsOfUser`)
//               return cartItems?.data?.data
//        } catch (error) {
//               console.log('error in getCartItemsOfUser connector  ', error)
//               return null  
//        }
// }

// async function addToWishList(productId) {
//        try {
//               const wishlistItem = await axios.post(`/shopping/wishlist/addToWishList/${productId}`)
//               return wishlistItem?.data?.data
//        } catch (error) {
//               console.log('error in  addToWishList connector  ', error)
//               return null
//        }
// }

// async function removeFromWishlist(productId) {
//        try {
//               const deletedWishlistItem = await axios.delete(`/shopping/wishlist/removeFromWishlist/${productId}`)
//               return deletedWishlistItem?.data?.data
//        } catch (error) {
//               console.log('error in  removeFromWishlist connector  ', error)
//               return null
//        }
// }

// async function itemAlreadyInWishlist(productId){
//        try {
//               const item = await axios.get(`/shopping/wishlist/alreadyInWishList/${productId}`)
//               return item?.data?.data
//        } catch (error) {
//               console.log('error in itemAlreadyInWishlist  connector  ', error)
//               throw error
//        }
// }

// async function getAllWishlistItems(){
//        try {
//               const items = await axios.get(`/shopping/wishlist/getAllWishlistItems`)
//               console.log("items received in wishlist connector ",items?.data?.data)
//               return items?.data?.data
//        } catch (error) {
//               console.log("Error in getAllWishlistItems in connector",error)
//               throw error
//        }
// }

// async function createProduct(formdata) {
//        try {
//               const createdProduct = await axios.post(`/shopping/product/createProduct`, formdata, {
//                      headers: {
//                             'Content-Type': 'multipart/form-data'
//                      }
//               })
//               return createdProduct?.data?.data
//        } catch (error) {
//               console.log('error in  createProduct connector  ', error)
//               return null
//        }
// }

// async function getProductById(productId) {
//        try {
//               const product = await axios.get(`/shopping/product/getProductById/${productId}`)
//               return product?.data?.data
//        } catch (error) {
//               console.log('error in  createProduct connector  ', error)
//               return null
//        }
// }

// async function updateProduct(productId, formdata) {
//        try {
//               const updatedProduct = await axios.patch(`/shopping/product/updateProduct/${productId}`, formdata, {
//                      headers: {
//                             'Content-Type': 'application/json'
//                      }
//               })
//               return updatedProduct?.data?.data
//        } catch (error) {
//               console.log('error in  updateProduct connector  ', error)
//               return null
//        }
// }

// async function getProducts(firstLevelCategory, secondLevelCategory, parameters) {
//        try {
//            const response = await axios.get(`/shopping/product/paginatedProducts/${firstLevelCategory}/${secondLevelCategory}/${parameters.color}/${parameters.page}`);
//            return response?.data;
//        } catch (error) {
//            console.error('Error in getProducts:', error.message);
//            return null;
//        }
//    }
   

// async function createProductWithoutCloudinary(formdata) {
//        try {
//               const product = await axios.post(`/shopping/product/createProductWithoutCloudinary`, formdata, {
//                      headers: {
//                             'Content-Type': 'application/json'
//                      }
//               })
//               return product?.data?.data
//        } catch (error) {
//               console.log('error in  createProductWithoutCloudinary connector  ', error)
//               return null
//        }
// }


// export {
//        createCartItem,
//        existedCartItem,
//        updateQuantityOfCartItem,
//        deleteCartItem,
//        getCartItemById,
//        getCartItemsOfUser,
//        addToWishList,
//        removeFromWishlist,
//        itemAlreadyInWishlist,
//        getAllWishlistItems,
//        createProduct,
//        getProductById,
//        updateProduct,
//        getProducts,
//        createProductWithoutCloudinary
// }