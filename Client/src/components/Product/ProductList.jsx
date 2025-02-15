import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

import { Button } from '@mui/material'


function ProductList({ products, setPageNo, totalPages, pageNo }) {
       const handleClick = (e) => setPageNo(Number(e.target.value));
   
       const buttons = Array.from({ length: totalPages }, (_, i) => i + 1);
   
       if (!Array.isArray(products) || products.length === 0) {
           return <h2 className="font-extrabold text-black">No Products Found</h2>;
       }
   
       return (
           <div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                   {products.map((item, index) => (
                       <ProductCard key={index} productItem={item} />
                   ))}
               </div>
               <div className="flex justify-center items-center h-full mt-4">
                   {buttons.map((item) => (
                       <Button
                           key={item}
                           value={item}
                           onClick={handleClick}
                           className={item !== pageNo ? "bg-blue-400" : "bg-green-500"}
                       >
                           {item}
                       </Button>
                   ))}
               </div>
           </div>
       );
   }
   

export default ProductList