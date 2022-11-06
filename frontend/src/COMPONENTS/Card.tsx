
import React   from 'react';
import { useLocation } from 'react-router-dom';
import {Swiper , SwiperSlide} from "swiper/react";
import "swiper/css";
 

function Card() {

  let picsPerPost;
  let title : string;
  let price : number;
  let description : string;

    const state = useLocation().state;
    if(state)
    {
         picsPerPost = state.pics ;
         title = state.title;
         price = state.price;
         description = state.description;

    }

    else
    {
      title = "";
      price=0;
      description ="";
    }

  
    return (
      <div  style={{textAlign:"center" , height:"85vh"  }}>
        <Swiper  spaceBetween={10} slidesPerView={1}  className='imageDetailsContainer'  >
          {picsPerPost?.map((pic : string)=> <SwiperSlide key={Math.random() * Math.random()} > 
            <img className='imageDetailsPreviewImg' src={`${process.env.REACT_APP_SERVER_URL}/${pic}`} alt="" />
          </SwiperSlide> )}
            </Swiper>
             <h6 style={{color:"gray"}}>SWIPE FOR MORE PICS</h6>
              <h2 >{title}</h2>
             <h3 style={{color:"green"}}> ${price}</h3>
             <h4 style={{textAlign:"start" , marginLeft:"50px"}}> Description :  </h4>
             <h4 style={{color:"darkgray"}}>{description}</h4>
        </div>
    );
}

export default Card;