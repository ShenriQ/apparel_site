import {useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, FormControl, Select, Grid, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import Carousel from '../apparel_carousel';
import FeedbackDialogs from '../modals/feedback';
import {db, auth, storage, serverTime} from '../../utils/firebase';
import {updateUserData} from '../../apis/user';
import {SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT, SET_USER} from '../../redux_helper/constants/action-types';
import {connect} from 'react-redux';
import countryList from 'react-select-country-list'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  photo : {
    width : 150, height : 150, borderRadius : 75,
    boxShadow: '0 0 25px rgba(140,152,164,.6)!important'
  },
  row :  {display: 'flex', justifyContent : 'center', alignItems : 'center'},
  label : {width : 200, textAlign : 'left', fontSize : 16, fontWeight : '600', color : '#777'}
}));

const Profile = (props) => {
  const classes = useStyles();
  const [open_modal, OpenModal] = useState(false);
  const [err_name, setErrName] = useState(false);
  const [err_city, setErrCity] = useState(false);
  const [err_zipcode, setErrZipcode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Men');
  const [apparel_type, setType] = useState('All');
  const [city, setCity] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [freeze, setFreeze] = useState('no')
  const [photo, setPhoto] = useState('');
  const img_photo = useRef(null)
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    console.log('auth.currentUser', auth.currentUser)
    setName(props.user.name);
    setEmail(props.user.email);
    setPhoto(props.user.photo);
    setCategory(props.user.category);
    setType(props.user.apparel_type);
    setCity(props.user.city)
    setZipCode(props.user.zipcode);
    setFreeze(props.user.freeze)

    setCountries(countryList().getData())
    setCountry(props.user.country == '' ? countryList().getData()[0].label : props.user.country);
  }, [props.user])

  const uploadImage = () => {
    if(props.user.id == null) return
    img_photo.current.click()
  }

  const handleImageChange = (e) => {
    const image = e.target.files[0]
    if(image == null) return
    if(image.size > 2097152){
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Upload only 2MB size below images'}});
      return
    }
    if(image.name.split(".").length > 1 && (image.name.split(".")[1]== "png" || image.name.split(".")[1]== "jpeg" || image.name.split(".")[1]== "jpg"))
    {
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
    else {
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Upload only .png or .jpg or .jpeg files'}});
    }
  }
  const isNumber=(string)=>{return /^\d+$/.test(string);}
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  const uploadProfile = () => {
    if(name.length == 0){
      setErrName(true)
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Name should not be empty!'}});
      return
    }
    if(name.length > 50){
      setErrName(true)
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Name should be less than 50 characters!'}});
      return
    }
    setErrName(false)

    if(city.length < 5 || city.length > 20){
      setErrCity(true)
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'City Name should be in 5~20 characters!'}});
      return
    }
    setErrCity(false)

    if(zipcode.length <5 || zipcode.length > 10 || isNumber(zipcode) != true ) {
      setErrZipcode(true)
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg: 'Zip code should have 5 ~ 10 digits'}})
      return
    }
    setErrZipcode(false)

    let changed_user = {
      id : props.user.id,
      photo : photo,
      name : name,
      email : email,
      apparel_type : apparel_type,
      category : category,
      city : city,
      zipcode : zipcode,
      country : country,
      freeze : freeze,
      createdAt : serverTime
    }
        
    props.dispatch({type : SHOW_LOAD, payload : 'Updating profile...'});
    updateUserData(changed_user).then(response => {
      console.log(response)
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : 'Your profile is updated successfully!'}});
      props.dispatch({type : SET_USER, payload : changed_user});
      document.location.href = "/apparel"
    })
    .catch(err => {
      console.log(err)
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Updating Profile Error!'}});
    })
  }

  return (
    <section className='text-center my-5'>
    <div className = "feature_container">
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
        <h2 className='h2-responsive font-weight-bold text-center my-5'>Your Profile</h2>
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
          <TextField variant="outlined" label="Email" disabled onChange={(e)=>setEmail(e.currentTarget.value)} value={email} className="mt-20"/>
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
          <TextField variant="outlined" placeholder="should be in 5 ~ 20 characters" error={err_city} label="City" onChange={(e)=>setCity(e.currentTarget.value)} value={city} className="mt-20"/>
          <TextField variant="outlined" placeholder="Enter 5 ~ 10 digits" error={err_zipcode} label="Zip Code" onChange={(e)=>setZipCode(e.currentTarget.value)} value={zipcode} className="mt-20"/>
          
          <FormControl className="mt-20">
            <Select
              native
              variant="outlined"
              value={country}
              onChange={(e)=>setCountry(e.currentTarget.value)}
              inputProps={{
                name: 'country',
              }}
            >
              {
                countries.map((item, index)=>
                  <option value={item.label}>{item.label}</option>
                )
              }
            </Select>
          </FormControl>
          <div className={classes.row}>
            <div className={classes.label}>Freeze account?</div>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup row name="freeze" value={freeze} onChange={(e)=>setFreeze(e.currentTarget.value)}>
                <FormControlLabel value={'yes'} control={<Radio />} label="Yes" />
                <FormControlLabel value={'no'} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
          </div>
        </div>
      </div>
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
          <div className={classes.row} style={{marginTop : 24, marginBottom : 20}}>
            <Button onClick={uploadProfile} variant="outlined" color="secondary" style={{borderRadius : 24, }}>
              Update profile
            </Button>
          </div>
          {/* <div className={classes.row} style={{marginTop : 24, marginBottom : 20}}>
            <a style={{textDecorationLine : 'underline', color : '#00f'}} href = "\apparel">View Apparel</a>
          </div> */}
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