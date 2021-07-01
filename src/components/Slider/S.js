import React, { useEffect,useRef,useState} from 'react';
import SwiperCore, { Navigation,EffectCoverflow,Swiper,Autoplay, } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import './S.css'
import jeans from '../../assets/images/jeans.jpg'
import shirts from '../../assets/images/shirts.jpg'
import tshirts from '../../assets/images/t-shirt.jpg'
import menshirt from '../../assets/images/shirt-men.jpg'
import mentshirt from '../../assets/images/t-shirt-men.jpg'
import womentshirt from '../../assets/images/t-shirt-women.jpg'
import kurtamen from '../../assets/images/kurta-men.jpg'
import kurtawomen from '../../assets/images/kurta-women.jpg'
import axios from 'axios'
import C from '../Card/Card.js'
SwiperCore.use([Navigation,Autoplay]);
function S() {
  const swiper = useRef(null)
  const [data,setData] = useState([])
  useEffect(()=>{
    swiper.current=new Swiper('.swiper-container',{
      grabCursor: true,
      centeredSlides: true,
      loop:true,
      autoplay:{
        delay: 2500,
        disableOnInteraction: false,
        
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      
    })
   /* axios.get('http://localhost:8080/on-air-mvc/AllOffer')
    .then(response =>{
      setData(response.data)
      
    })
    .catch(error =>{
        console.log(error)
    })*/

  },[])
  
  let id=0
  return (
    <div className="slider">
      <div className="swiper-container">
          <div className="swiper-wrapper">
            {
              /*data.map(el => 
              <div key={id++} className='swiper-slide'>
               
              </div>
              )*/
            } 
            <div key={id++} className='swiper-slide'>
              <C name="Best in Men" offer="20" img={kurtamen}/> 
            </div> 
            <div key={id++} className='swiper-slide'>
              <C name="Best in Women" offer="30" img={kurtawomen} />
            </div> 
            <div key={id++} className='swiper-slide'>
              <C name="Best in Jeans" offer="20" img={jeans} />
            </div> 
            <div key={id++} className='swiper-slide'>
              <C name="Best in Shirts" offer="10" img={shirts} /> 
            </div> 
            <div key={id++} className='swiper-slide'>
              <C name="Best in T-Shirts" offer="20" img={tshirts} /> 
            </div> 
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
      </div>
    </div>
  );
}
export default S