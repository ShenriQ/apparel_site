import React, {useEffect, useState} from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import {getDemoApparels, addFeedback} from '../../../apis/apparel';
import './index.css';

const CarouselPage = () => {
  const [men_apparels, SetMenApparels] = useState([]);
  const [women_apparels, SetWomenApparels] = useState([]);

  useEffect(()=> {
    getDemoApparels({category : "Men", apparel_type : "All"}).then(response => {
        let tmp_apparels = []
        response.forEach((doc) => {
          tmp_apparels.push(doc.data())
        })
        SetMenApparels(tmp_apparels.slice(0, 3));
      })
      .catch(err => {
    })
    getDemoApparels({category : "Women", apparel_type : "All"}).then(response => {
      let tmp_apparels = []
      response.forEach((doc) => {
        tmp_apparels.push(doc.data())
      })
      SetWomenApparels(tmp_apparels.slice(0, 3));
    })
    .catch(err => {
    })
  }, [])

  console.log(men_apparels, women_apparels)
  return (
    <div style = {{width : '100% !important'}}>
      <MDBCarousel
      activeItem={1}
      length={men_apparels.length + women_apparels.length}
      showControls={true}
      showIndicators={true}
    //   className="z-depth-1"
    >
      <MDBCarouselInner>
        {
          men_apparels.map((item, index) => 
          <MDBCarouselItem key={index} itemId={index + 1}>
            <MDBView className="carousel_item_view">
              <img
                className="d-block item_img"
                src={item.photo}
              />
            </MDBView>
          </MDBCarouselItem>
          )
        }
        {
          women_apparels.map((item, index) => 
          <MDBCarouselItem key={index + 3} itemId={men_apparels.length + index + 1}>
            <MDBView className="carousel_item_view">
              <img
                className="d-block item_img"
                src={item.photo}
              />
            </MDBView>
          </MDBCarouselItem>
          )
        }
      </MDBCarouselInner>
    </MDBCarousel>
    </div>
  );
}

export default CarouselPage;