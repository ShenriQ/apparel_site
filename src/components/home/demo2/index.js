import {React, useEffect, useState} from 'react';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, FormControl, Select, Grid} from '@material-ui/core';
import Carousel from '../../apparel_carousel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  row :  {display: 'flex', justifyContent : 'center', alignItems : 'center'},
  label : {width : 200, textAlign : 'left'},
  photo : {
    width : 80, height : 80, borderRadius : 40,
    boxShadow: '0 0 25px rgba(140,152,164,.6)!important'
  },
}));

const demo_men = [
  {photo : '/assets/imgs/demo_men/1.jpg', name : 'Dress Shirt'},
  {photo : '/assets/imgs/demo_men/2.jpg', name : 'T-Shirt'},
  {photo : '/assets/imgs/demo_men/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_men/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_men/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_men/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_men/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_men/3.jpg', name : 'Sweater'},
]
const demo_women = [
  {photo : '/assets/imgs/demo_women/1.jpg', name : 'Dress Shirt'},
  {photo : '/assets/imgs/demo_women/2.jpg', name : 'T-Shirt'},
  {photo : '/assets/imgs/demo_women/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_women/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_women/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_women/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_women/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_women/3.jpg', name : 'Sweater'},
  {photo : '/assets/imgs/demo_women/3.jpg', name : 'Sweater'},
]

const Latest = (props) => {
  const classes = useStyles();

  return (
    <section className='text-center my-5'>
    <div className = "feature_container">
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
        <h2 className='h1-responsive font-weight-bold text-center my-5'>Apparel Display</h2>
      </div>
      <div className="row" style={{width : '100%'}}>
        <div className="col-md-2 col-sm-12">
          <div>
            <img src={props.data.profile_img_file == '' ? "/assets/imgs/avatars/user.png" : props.data.profile_img_file} className={classes.photo}/>
          </div>
          <div style={{marginTop : 24}}>
            <div style={{textDecorationLine : 'underline', fontWeight : '500', fontSize : 18}}>Apparel Info</div>
            <div style={{fontWeight : '400', fontSize : 14}}><b>Category :  </b> {props.data.category}</div>
            <div style={{ fontWeight : '400', fontSize : 14}}><b>Type : </b> {props.data.type}</div>
          </div>
        </div>
        <div className="col-md-10 col-sm-12">
          <Carousel products = {props.category == 'Men' ? demo_men : demo_women}/>
          <div className={classes.row} style={{marginTop : 24}}>
            <Button onClick={() => props.showDemo(1, 'Men', 'All')} variant="outlined" color="secondary" style={{borderRadius : 24, width : 200}}>Done</Button>
          </div>
        </div>
      </div>
      
    </div>
    </section>
  );
};

export default Latest;