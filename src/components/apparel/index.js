import {React, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, FormControl, Select, Grid} from '@material-ui/core';
import Carousel from '../apparel_carousel';
import FeedbackDialogs from '../modals/feedback';
import {db, auth} from '../../utils/firebase';
import {getUserAllApparels, addFeedback} from '../../apis/apparel';
import {SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT} from '../../redux_helper/constants/action-types';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  profile_photo : {
    width : 100, height : 100, borderRadius : 50,
    boxShadow: '0 0 25px rgba(140,152,164,.6)!important'
  },
  row :  {display: 'flex', justifyContent : 'center', alignItems : 'center'},
  label : {width : 200, textAlign : 'left'}
}));


const Apparel = (props) => {
  const classes = useStyles();
  const [open_modal, OpenModal] = useState(false);
  const [apparels, SetApparels] = useState([]);

  useEffect(()=>{
    console.log('auth.currentUser', auth.currentUser)
    getApparels()
  }, [props.user])

  
  const getApparels = () => {
    props.dispatch({type : SHOW_LOAD, payload : 'Loading...'});
    getUserAllApparels(props.user.id).then(response => {
      let tmp_apparels = []
      response.forEach((doc) => {
        tmp_apparels.push(doc.data())
      })
      SetApparels(tmp_apparels);
      props.dispatch({type : DISMISS_LOAD, payload : ''});
    })
    .catch(err => {
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Loading apparels Error!'}});
    })
  }

  const onAddFeedback=(txt)=>{
    let feedback = {
      id : props.user.id, 
      date : new Date(),
      category : props.user.category,
      apparel_type : props.user.apparel_type,
      zipcode : props.user.zipcode,
      country : props.user.country,
      email : props.user.email,
      comment : txt
    }
    props.dispatch({type : SHOW_LOAD, payload : 'Leaving Your Feedback...'});
    addFeedback(feedback).then(response => {
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : 'Your feedback is saved!'}});
      OpenModal(false)
    })
    .catch(err => {
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Loading apparels Error!'}});
    })
  }

  const AddNew=()=>{
    document.location.href = '/add_apparel';
  }

  return (
    <section className='text-center my-5'>
    <div className = "feature_container">
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
        <h2 className='h1-responsive font-weight-bold text-center my-5'>Apparel Display</h2>
      </div>
      <div className="row" style={{width : '100%'}}>
        <div className="col-md-2 col-sm-12">
          <div>
            <img src={props.user.photo == "" ? "/assets/imgs/avatars/user.png" : props.user.photo} className={classes.profile_photo}/>
          </div>
          <div style={{marginTop : 24}}>
            <a style={{textDecorationLine : 'underline', fontWeight : '500', fontSize : 18}} href="/profile">{props.user.name}</a>
            {/* <div style={{textDecorationLine : 'underline', fontWeight : '500', fontSize : 18}}>Apparel Info</div> */}
            {/* <div style={{fontWeight : '400', fontSize : 14}}><b>Category :  </b> {props.category}</div>
            <div style={{ fontWeight : '400', fontSize : 14}}><b>Type : </b> {props.type}</div> */}
          </div>
          <div style={{marginTop : 24, marginBottom : 24}}>
            <Button onClick={()=>AddNew()} variant="outlined" color="secondary" style={{borderRadius : 24, }}>
              Add new apparel
            </Button>
          </div>
        </div>
        <div className="col-md-10 col-sm-12">
          {
            apparels.length == 0 ?
            <div style={{marginTop : 20, marginBottom : 40}}>
              <img src={"/assets/imgs/empty.png"} style={{width : 240, height : 240}}/>
              <div style={{fontSize : 16, fontWeight : '600', color : '#777'}}>You don't have apparels yet!</div>
            </div>
            :
            <Carousel products = {apparels}/>
          }
          <div className={classes.row} style={{marginTop : 24}}>
            <Button onClick={()=>OpenModal(true)} variant="outlined" color="secondary" style={{borderRadius : 24, }}>
              Please provide your feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
    <FeedbackDialogs open={open_modal} onClose = {()=>OpenModal(false)} onAdd={onAddFeedback}/>
    </section>
  );
};

const mapstate_props=(state)=>{
  return {
    user : state.userReducer.user
  }
}
export default connect(mapstate_props)(Apparel) ;