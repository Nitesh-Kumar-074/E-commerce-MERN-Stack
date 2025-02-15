import {createSlice} from '@reduxjs/toolkit'



const initialState = {
       items : [],
       cartTabStatus : false
}
 
const cartSlice = createSlice({
       name : "cart", 
       initialState,
       reducers : { 
              loadCartItems : (state,action) => {
                     const {items} = action.payload
                     state.items = [...items]
              },
              addItemToCart : (state,action) => {
                     const {createdItem} = action.payload
                     state.items.push(createdItem)
              },
              updateQuantity : (state,action) => {
                     const {cartItemId,newQuantity} = action.payload
                     for(let i = 0;i<state.items.length;i++){
                            if(state.items[i]._id === cartItemId){
                                   state.items[i].quantity = newQuantity
                                   break
                            }
                     }
              },
              removeItemFromCart : (state,action) => {
                     const {cartItemId} = action.payload
                     state.items = state.items.filter(item => item._id !== cartItemId)
              },
              toggleStatus : (state,action) => {
                     state.cartTabStatus = !state.cartTabStatus
              }

       }
})

export const {toggleStatus,loadCartItems,addItemToCart,updateQuantity,removeItemFromCart,} = cartSlice.actions

export default cartSlice.reducer


// removeItemFromCart : (state,action) => {
//        const {productId} = action.payload
//        state.items = state.items.filter(product => product.productId !== productId)
// },
// decreaseQuantityOfItem : (state,action) => {
//        const {productId} = action.payload
//        const index = state.items.findIndex(product => product.productId === productId)
//        if(state.items[index].quantity == 1){
//               state.items = state.items.filter(product => product.productId !== productId)
//        }
//        else{
//               state.items[index].quantity--;
//        }
// },