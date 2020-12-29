import {useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, FormControl, Select, Grid} from '@material-ui/core';
import Carousel from '../apparel_carousel';
import FeedbackDialogs from '../modals/feedback';
import {db, auth, storage} from '../../utils/firebase';
import {updateUserData} from '../../apis/user';
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
    width : 240, height : 240, borderRadius : 120,
    boxShadow: '0 0 25px rgba(140,152,164,.6)!important'
  },
  row :  {display: 'flex', justifyContent : 'center', alignItems : 'center'},
  label : {width : 200, textAlign : 'left', fontSize : 16, fontWeight : '600', color : '#777'}
}));

const Profile = (props) => {
  const classes = useStyles();
  const [open_modal, OpenModal] = useState(false);
  const [err_name, setErrName] = useState(false);
  const [err_email, setErrEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Men');
  const [apparel_type, setType] = useState('All');
  const [zipcode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [photo, setPhoto] = useState('');
  const img_photo = useRef(null)

  useEffect(()=>{
    console.log('auth.currentUser', auth.currentUser)
    setName(props.user.name);
    setEmail(props.user.email);
    setPhoto(props.user.photo);
    setCategory(props.user.category);
    setType(props.user.apparel_type);
    setCountry(props.user.country);
    setZipCode(props.user.zipcode);
  }, [props.user])

  const uploadImage = () => {
    if(props.user.id == null) return
    img_photo.current.click()
  }

  const handleImageChange = (e) => {
    const image = e.target.files[0]
    if(image == null) return
    console.log(image)

    let file_ref = props.user.id + '/profile.jpg';
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

  const uploadProfile = () => {
    if(name == ''){
      setErrName(true)
      return
    }
    setErrName(false)
    let changed_user = Object.assign({}, props.user) 
    changed_user.photo = photo
    changed_user.name = name
    changed_user.email = email
    changed_user.apparel_type = apparel_type
    changed_user.category = category
    changed_user.zipcode = zipcode
    changed_user.country = country
        
    props.dispatch({type : SHOW_LOAD, payload : 'Updating profile...'});
    updateUserData(changed_user).then(response => {
      console.log(response)
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : 'Your profile is updated successfully!'}});
      props.dispatch({type : SET_USER, payload : changed_user});
    })
    .catch(err => {
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Updating Profile Error!'}});
    })
  }

  return (
    <section className='text-center my-5'>
    <div className = "feature_container">
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
        <h2 className='h1-responsive font-weight-bold text-center my-5'>Your Profile</h2>
      </div>
      <div className="row" style={{width : '100%'}}>
        <div className="col-md-6 col-sm-12">
          <div>
            <img src={photo == '' ? '/assets/imgs/avatars/user.png' : photo}  className={classes.photo}/>
            <div>
            <input type="file" ref={img_photo} accept=".png, .jpg, .jpeg" hidden onChange={handleImageChange} />
            <Button onClick={uploadImage} variant="outlined" color="secondary" style={{borderRadius : 24, fontSize: 14, marginTop : 8}}>
              Change
            </Button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div style = {{display : 'flex', flexDirection : 'column', padding : 45, paddingTop : 25,}}>
          <TextField variant="outlined" label="Name" error={err_name} onChange={(e)=>setName(e.currentTarget.value)} value={name} className="mt-20"/>
          <TextField variant="outlined" label="Email" disabled error={err_email} onChange={(e)=>setEmail(e.currentTarget.value)} value={email} className="mt-20"/>
          <div className={classes.row}>
            <div className={classes.label}>Category</div>
            <FormControl className={classes.formControl} >
              <Select
                native
                variant="outlined"
                value={category}
                onChange={(e)=>setCategory(e.currentTarget.value)}
                inputProps={{
                  name: 'category',
                }}
              >
                <option value={'Men'}>Men</option>
                <option value={'Women'}>Women</option>
              </Select>
            </FormControl>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Apparel Type</div>
            <FormControl className={classes.formControl}>
              <Select
                native
                variant="outlined"
                value={apparel_type}
                onChange={(e)=>setType(e.currentTarget.value)}
                inputProps={{
                  name: 'apparel_type'
                }}
              >
                <option value={'All'}>All</option>
                <option value={'Shirt'}>Shirt</option>
                <option value={'T-shirt'}>T-Shirt</option>
              </Select>
            </FormControl>
          </div>
          <TextField variant="outlined" label="Zip Code" onChange={(e)=>setZipCode(e.currentTarget.value)} value={zipcode} className="mt-20"/>
          <TextField variant="outlined" label="Country" onChange={(e)=>setCountry(e.currentTarget.value)} value={country} className="mt-20"/>
          </div>
        </div>
      </div>
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
          <div className={classes.row} style={{marginTop : 24, marginBottom : 20}}>
            <Button onClick={uploadProfile} variant="outlined" color="secondary" style={{borderRadius : 24, }}>
              Update profile
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
export default connect(mapstate_props)(Profile) ;