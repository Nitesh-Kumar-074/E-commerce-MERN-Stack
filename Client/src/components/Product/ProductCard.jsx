import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
// import {addItemToCart} from '../../store/cart.js'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';


export default function ProductCard({productItem}) {
  const loggedInUser = useSelector((state) => state.auth)
  const id = productItem.id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const handleAddToCart = () => {
  //   if(!loggedInUser.flag){
  //     alert("you need to login first")
  //   }
  //   else{
  //     dispatch(addItemToCart({
  //       productId : id,
  //       quantity : 1
  //     }))
  //   }
  // }
  return (
    
       <Card sx={{ width: 240, maxWidth: '100%', boxShadow: 'lg',zIndex : 1 }} className='hover:shadow-xl'>
       <CardOverflow>
         <div className="relative w-full" style={{ aspectRatio: '1 / 1.2' }}>
           <img
             src={productItem.images[0].url}
             loading="lazy"
             alt=""
             className= "object-cover object-top w-full h-full cursor-pointer"
             onClick={() => {navigate(`/productDetail/${productItem._id}`)}}
           />
         </div>
       </CardOverflow>
       <CardContent>
         <Typography level="body-xs">{productItem.brand}</Typography>
         {/* <Link
           href={`/productDetail/${productItem._id}`}
           color="neutral"
           textColor="text.primary"
           overlay
           endDecorator={<ArrowOutwardIcon />}
           sx={{ fontWeight: 'md' }}
         >
           {productItem.name}
         </Link> */}
        <p>{productItem.name}</p>
         <Typography
           level="title-lg"
           sx={{ mt: 1, fontWeight: 'xl' }}
           endDecorator={
             <Chip component="span" size="sm" variant="soft" color="success">
               Lowest price
             </Chip>
           }
         >
           Rs. {productItem.price}
         </Typography>
         <Typography level="body-sm">
           (Only <b>{productItem.stock}</b> left in stock!)
         </Typography>
       </CardContent>
       <CardOverflow>
         {/* <Button variant="solid" color="danger" size="lg" onClick={handleAddToWishlist}>
           Add to cart
         </Button> */}
       </CardOverflow>
     </Card>
     
  );
}

