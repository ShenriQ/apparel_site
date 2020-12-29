import {useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, FormControl, Select, Grid} from '@material-ui/core';
import Carousel from '../apparel_carousel';
import FeedbackDialogs from '../modals/feedback';
import {db, auth, storage} from '../../utils/firebase';
import {addApparel} from '../../apis/apparel';
import {SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT, SET_USER} from '../../redux_helper/constants/action-types';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  photo : {
    width : 280, height : 280, borderWidth : 1, borderStyle : 'dotted', borderColor : '#777',
    boxShadow: '0 0 25px rgba(140,152,164,.6)!important'
  },
  row :  {display: 'flex', justifyContent : 'center', alignItems : 'center'},
  label : {width : 200, textAlign : 'left'}
}));

const AddApparel = (props) => {
  const classes = useStyles();
  const [open_modal, OpenModal] = useState(false);
  const [err_name, setErrName] = useState(false);
  const [err_description, setErrDescription] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const img_photo = useRef(null)

  useEffect(()=>{
    console.log('auth.currentUser', auth.currentUser)
  }, [props.user])

  const uploadImage = () => {
    if(props.user.id == null) return
    img_photo.current.click()
  }

  const handleImageChange = (e) => {
    const image = e.target.files[0]
    if(image == null) return
    console.log(image)

    let file_ref = props.user.id + '/apparel_' + new Date().getTime() + '.jpg';
    props.dispatch({type : SHOW_LOAD, payload : 'Uploading...'});
    storage.ref(file_ref).put(image).on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, 
      (err) => {
        //catches the errors
        console.log(err)
        props.dispatch({type : DISMISS_LOAD, payload : ''});
        props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Photo Uploading Error!'}});
      }, 
      () => {
        // .child('a.jpg')
        storage.ref(file_ref).getDownloadURL()
        .then(fireBaseUrl => {
          setPhoto(fireBaseUrl);

          props.dispatch({type : DISMISS_LOAD, payload : ''});
          // props.dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : 'Profile Photo is updated successfully!'}});
        })
        .catch(err => {
          props.dispatch({type : DISMISS_LOAD, payload : ''});
          props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Photo Url Getting Error!'}});
        }) 
    })
  }

  const addNewApparel = () => {
    if(name == ''){
      setErrName(true)
      return
    }
    setErrName(false)
    if(description == ''){
      setErrDescription(true)
      return
    }
    setErrDescription(false)

    let apparel_obj = {name : name, description : description, photo : photo}
    props.dispatch({type : SHOW_LOAD, payload : 'Adding a apparel...'});
    addApparel(props.user, apparel_obj).then(response => {
      console.log(response)
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : 'The apparel is added successfully!'}});
      document.location.href = '/apparel'
    })
    .catch(err => {
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Creating new apparel Error!'}});
    })
  }

  return (
    <section className='text-center my-5'>
    <div className = "feature_container">
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
        <h2 className='h1-responsive font-weight-bold text-center my-5'>New Apparel</h2>
      </div>
      <div className="row" style={{width : '100%'}}>
        <div className="col-md-6 col-sm-12">
          <div>
            <img src={photo == '' ? '/assets/imgs/placeholder.png' : photo}  className={classes.photo}/>
            <div>
            <input type="file" ref={img_photo} accept=".png, .jpg, .jpeg" hidden onChange={handleImageChange} />
            <Button onClick={uploadImage} variant="outlined" color="secondary" style={{borderRadius : 24, fontSize: 14, marginTop : 8}}>
              Upload
            </Button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div style = {{display : 'flex', flexDirection : 'column', padding : 45, paddingTop : 25,}}>
          <TextField variant="outlined" label="Name" error={err_name} onChange={(e)=>setName(e.currentTarget.value)} value={name} className="mt-20"/>
          <TextField variant="outlined" label="Description" multiline rows={4} rowsMax={5} error={err_description} onChange={(e)=>setDescription(e.currentTarget.value)} value={description} className="mt-20"/>
          </div>
        </div>
      </div>
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
          <div className={classes.row} style={{marginTop : 24, marginBottom : 20}}>
            <Button onClick={addNewApparel} variant="outlined" color="secondary" style={{borderRadius : 24, }}>
              Add New Apparel
            </Button>
          </div>
      </div>
    </div>
    <FeedbackDialogs open={open_modal} onClose = {()=>OpenModal(false)} />
    </section>
  );
};

const mapstate_props=(state)=>{
  return {
    user : state.userReducer.user
  }
}
export default connect(mapstate_props)(AddApparel) ;