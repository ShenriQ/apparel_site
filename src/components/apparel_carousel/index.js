import {React, useEffect, useState} from 'react';
import { MDBRow, MDBCol, } from 'mdbreact';
import {ButtonBase} from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import {isMobile} from 'react-device-detect';
import 'react-multi-carousel/lib/styles.css';
// custom input
import './index.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1400, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  small_tablet : {
    breakpoint: { max: 1024, min: 510 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 510, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const Product = ({product, onClick}) => {
  return (
    <ButtonBase onClick = {onClick} style={{flexDirection : 'column', padding : 20, borderColor : '#777', borderRadius : 10, borderWidth : 1, borderStyle : 'dotted'}}>
      <div>
        <img src={product.photo} width={80} height={80}/>
      </div>
      <div style={{marginTop : 24}}>
          <div style={{ fontWeight : '600', fontSize : 16}}>{product.name}</div>
      </div>
    </ButtonBase>
  )
}

const Discount = (props) => {
  const [cur_product_id, setCurProductId] = useState(0)
  const [products, setProducts] = useState(props.products)
  useEffect(()=>{
    setProducts(props.products)
  }, [props.products])

  const onShow = (index) => {
    setCurProductId(index)
  }

  return (
    <section className='text-center'>
      {
        products.length > 0 &&
          <div className = "apparel_container">
            <div style={{width : '95%', display : 'flex', }}>
              <div style={{width : '70%'}}>
                <img src={products[cur_product_id].photo} style={{width : '100%', height : 350, objectFit: 'contain'}}/>
              </div>
              <div style={{width : '30%'}}>
                <div style={{marginTop : 24}}>
                  <div style={{textDecorationLine : 'underline', fontWeight : '500', fontSize : 18, marginBottom : 16}}>Product Information</div>
                  <div style={{fontWeight : '400', fontSize : 14, display : 'flex', flexDirection : 'column'}}>
                    <div style = {{ width : 100, textAlign : 'left', marginRight: 16, fontWeight : 'bold'}}>Name : </div>
                    <div style={{wordBreak: 'break-word'}}>{products[cur_product_id].name}</div>
                  </div>
                  <div style={{fontWeight : '400', fontSize : 14, display : 'flex', flexDirection : 'column'}}>
                    <div style = {{width : 100,textAlign : 'left', marginRight: 16, fontWeight : 'bold'}}>Description : </div>
                    <div style={{wordBreak: 'break-word'}}>{products[cur_product_id].description}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{width : '95%'}}>
              <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={false} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                partialVisible = {false}
                // autoPlaySpeed={3000}
                keyBoardControl={true}
                // customTransition="transform 300ms ease-in-out"
                // customTransition="all 1s linear"
                transitionDuration={100}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={isMobile ? "mobile" : "desktop"}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {
                    products.map((product, index) =>
                      <Product product = {product} key = {index} onClick={() => onShow(index)}/>
                    )
                }
              </Carousel>
            </div>
          </div>
      }
    </section>
  );
};

export default Discount;