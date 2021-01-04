import {React, useEffect, useState} from 'react';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, FormControl, Select, Grid} from '@material-ui/core';
import Carousel from '../../apparel_carousel';
import {getDemoApparels, addFeedback} from '../../../apis/apparel';
import {connect} from 'react-redux';
import {SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT} from '../../../redux_helper/constants/action-types';
import FeedbackDialogs from '../../modals/feedback';

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


const Latest = (props) => {
  const classes = useStyles();
  const [open_modal, OpenModal] = useState(false);
  const [apparels, SetApparels] = useState([]);
  const sample_profile = {Men : "https://firebasestorage.googleapis.com/v0/b/vendos-291d2.appspot.com/o/sample-profile-img%2Fman.png?alt=media&token=9ba9be72-9d8a-43d9-bc31-b68dad88b0dc",
                          Women : "https://firebasestorage.googleapis.com/v0/b/vendos-291d2.appspot.com/o/sample-profile-img%2Fwoman.png?alt=media&token=932b4d43-868a-480c-94bc-a57f3a4dddfc" }
  useEffect(()=> {
    props.dispatch({type : SHOW_LOAD, payload : 'Loading...'});
    getDemoApparels({category : props.data.category, apparel_type : props.data.type}).then(response => {
        let tmp_apparels = []
        if(props.data.profile_img_file == '')
        {
          if (props.data.category == "Men"){
            tmp_apparels.push({photo : sample_profile.Men, name : "Man"})
          }
          else {
            tmp_apparels.push({photo : sample_profile.Women, name : "Woman"})
          }
        }
        
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
  }, [props.data])

  const onAddFeedback=(txt)=>{
    let feedback = {
      id : "demo-user-" + new Date().getTime(), 
      date : new Date(),
      category : props.data.category,
      apparel_type : props.data.type,
      zipcode : props.data.zipcode,
      country : props.data.country,
      email : props.data.email,
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

  return (
    <section className='text-center my-5'>
    <div className = "feature_container">
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
        <h2 className='font_36_txt font-weight-bold text-center my-5'>Apparel Display</h2>
      </div>
      <div className="row" style={{width : '100%'}}>
        <div className="col-md-2 col-sm-12">
          <div>
            <img src={props.data.profile_img_file == '' ? sample_profile[props.data.category] : props.data.profile_img_file} className={classes.photo}/>
          </div>
          <div style={{marginTop : 24}}>
            <div style={{textDecorationLine : 'underline', fontWeight : '500', fontSize : 18}}>Apparel Info</div>
            <div style={{fontWeight : '400', fontSize : 14}}><b>Category :  </b> {props.data.category}</div>
            <div style={{ fontWeight : '400', fontSize : 14}}><b>Type : </b> {props.data.type}</div>
          </div>
        </div>
        <div className="col-md-10 col-sm-12">
          <Carousel products = {apparels}/>
          <div className={classes.row} style={{marginTop : 24}}>
            <Button onClick={() => props.showDemo(1, props.data)} variant="outlined" color="secondary" style={{borderRadius : 24, width : 200}}>Done</Button>
            <Button onClick={()=>OpenModal(true)} variant="outlined" color="secondary" style={{borderRadius : 24, marginLeft : 30}}>
                Provide Feedback
            </Button>
          </div>
        </div>
      </div>
      <FeedbackDialogs open={open_modal} onClose = {()=>OpenModal(false)} onAdd={onAddFeedback}/>
    </div>
    </section>
  );
};


export default connect(null)(Latest);