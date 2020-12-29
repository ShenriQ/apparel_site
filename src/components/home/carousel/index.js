import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import './index.css';

const CarouselPage = () => {
  return (
    <div style = {{width : '100% !important'}}>
      <MDBCarousel
      activeItem={1}
      length={3}
      showControls={true}
      showIndicators={true}
    //   className="z-depth-1"
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView className="carousel_item_view">
            <img
              className="d-block item_img"
              src="assets/imgs/demo_men/3.jpg"
              alt="First slide"
              // style = {{clipPath: 'url(#wave)'}}
            />
          {/* <MDBMask overlay="black-light" /> */}
          </MDBView>
          {/* <MDBCarouselCaption>
            <h3 className="h3-responsive carousel_title">Free Shipping</h3>
            <p className = "carousel_subtitle">Shipping is on us</p>
          </MDBCarouselCaption> */}
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView className="carousel_item_view">
            <img
              className="d-block item_img"
              src="assets/imgs/demo_women/1.jpg"
              alt="Second slide"
              // style = {{clipPath: 'url(#wave)'}}
            />
          {/* <MDBMask overlay="black-strong" /> */}
          </MDBView>
          {/* <MDBCarouselCaption>
            <h3 className="h3-responsive carousel_title" >Free Support</h3>
            <p className = "carousel_subtitle">24/24 available</p>
          </MDBCarouselCaption> */}
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView className="carousel_item_view">
            <img
              className="d-block item_img"
              src="assets/imgs/demo_women/3.jpg"
              alt="Third slide"
              // style = {{clipPath: 'url(#wave)'}}
            />
          {/* <MDBMask overlay="black-slight" /> */}
          </MDBView>
          {/* <MDBCarouselCaption>
            <h3 className="h3-responsive carousel_title">Best Deal</h3>
            <p className = "carousel_subtitle">Quality guaranteed</p>
          </MDBCarouselCaption> */}
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </div>
  );
}

export default CarouselPage;