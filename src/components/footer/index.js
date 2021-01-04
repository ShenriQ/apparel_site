import React,{useEffect, useState} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {ButtonBase, TextField, Button} from '@material-ui/core';
import './index.css'
import {db} from '../../utils/firebase';
import {connect} from 'react-redux';
import {SHOW_ALERT, SHOW_LOAD, DISMISS_LOAD} from '../../redux_helper/constants/action-types';

const FooterPage = (props) => {
  const [email, setEmail] = useState('')
  const handleChange = (event) => {
    setEmail(event.target.value)
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const onSubscribe=()=>{
    if(validateEmail(email))
    {
      props.dispatch({type : SHOW_LOAD, payload : 'Subscribing....'});
      db.collection('subscribers').add({email : email}).then(response => {
        props.dispatch({type : DISMISS_LOAD, payload : ''});
        props.dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : 'Subscribe success!'}});
      })
      .catch(error => {
        console.log(error)
        props.dispatch({type : DISMISS_LOAD, payload : ''});
        props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Error ocurred!'}});
      })
    }
  }

  return (
    <MDBFooter color="blue" className="font-small footer-link pt-4 mt-4">
      <MDBContainer fluid className=" text-center text-md-left align-center">
        <MDBRow className="container">
          <MDBCol md="4">
          <ButtonBase style={{margin : 10}}>
            <img src="/assets/imgs/appstore/appstore.png" width={160}/>
          </ButtonBase>
          <ButtonBase style={{margin : 10}}>
            <img src="/assets/imgs/appstore/googleplay.png" width={160}/>
          </ButtonBase>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Explore</h5>
            <ul style = {{paddingLeft : 0}}>
              <li className="list-unstyled">
                <a href="/" style = {{color : '#000'}}>Home</a>
              </li>
              <li className="list-unstyled">
                <a href="/" style = {{color : '#000'}}>About</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Subscribe Us</h5>
            <ul style = {{paddingLeft : 0}}>
              <li className="list-unstyled">
              <input
                type="email" 
                placeholder="subscribe@email.com"  
                onChange={handleChange} 
                name="email" 
                value={email} 
                style={{height : 40}}
                />
              </li>
              <Button color="primary" onClick={onSubscribe}>Submit</Button>
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

export default connect(null)(FooterPage);