import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {ButtonBase} from '@material-ui/core';
import './index.css'

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small footer-link pt-4 mt-4">
      <MDBContainer fluid className=" text-center text-md-left">
        <MDBRow>
          <MDBCol md="3">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="3">
          <ButtonBase style={{margin : 10}}>
            <img src="/assets/imgs/appstore/appstore.png" width={160}/>
          </ButtonBase>
          <ButtonBase style={{margin : 10}}>
            <img src="/assets/imgs/appstore/googleplay.png" width={160}/>
          </ButtonBase>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Explore</h5>
            <ul style = {{paddingLeft : 0}}>
              <li className="list-unstyled">
                <a href="#!" style = {{color : '#000'}}>Home</a>
              </li>
              <li className="list-unstyled">
                <a href="#!" style = {{color : '#000'}}>Shop</a>
              </li>
              <li className="list-unstyled">
                <a href="#!" style = {{color : '#000'}}>Feature</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Support</h5>
            <ul style = {{paddingLeft : 0}}>
              <li className="list-unstyled">
                <a href="#!" style = {{color : '#000'}}>Privacy Policy</a>
              </li>
              <li className="list-unstyled">
                <a href="#!" style = {{color : '#000'}}>Terms & Conditions</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="#"> shopping.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;