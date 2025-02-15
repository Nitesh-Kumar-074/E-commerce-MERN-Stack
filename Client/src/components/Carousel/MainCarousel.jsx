import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {MainCarouselData} from './MainCarouselData.js'

const items = MainCarouselData.map((item) => <img src={item.image}/>)

const MainCarousel = () => (
    <div className='z-1'>
    <AliceCarousel
        mouseTracking
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
        controlsStrategy="alternate"
    />
    </div>
);

export default MainCarousel