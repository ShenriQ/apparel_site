import {React, useEffect, useState} from 'react';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, FormControl, Select, Radio, RadioGroup, FormControlLabel} from '@material-ui/core';
import countryList from 'react-select-country-list'
import {connect} from 'react-redux';
import {SHOW_ALERT} from '../../../redux_helper/constants/action-types';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  row :  {display: 'flex', justifyContent : 'center', alignItems : 'center'},
  label : {width : 200, textAlign : 'left'}
}));


const Demo1 = (props) => {
  const classes = useStyles();
  const [countries, setCountries] = useState([])
  const [data, setData] = useState({
    category : 'Men', 
    type : 'All',
    zipcode : '',
    country : '',
    email : '',
    sample_picture : 'yes',
    profile_img_file : ''
  });

  const [err_zipcode, setErrorZip] = useState(false)
  const [err_country, setErrorCountry] = useState(false)
  const [err_email, setErrorEmail] = useState(false)

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  };

  const handleImgFileChange=(event)=>{
      let  files = event.target.files

      // FileReader support
      if (FileReader && files && files.length) {
          var fr = new FileReader();
          fr.onload = function () {
            setData({
              ...data,
              profile_img_file : fr.result
            })
          }
          fr.readAsDataURL(files[0]);
      }
  }

  useEffect(()=>{
    setCountries(countryList().getData())
    setData({
      ...data,
      country : countryList().getData()[0].label
    })
  }, [])

  const isNumber=(string)=>{return /^\d+$/.test(string);}
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  const onSubmit=() =>{
    if(data.zipcode.length <5 || data.zipcode.length > 10 || isNumber(data.zipcode) != true ) {
      setErrorZip(true)
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg: 'Zip code should have 5 ~ 10 digits'}})
      return
    }
    setErrorZip(false)
    if(data.country == '') {
      setErrorCountry(true)
      return
    }
    setErrorCountry(false)
    if(data.email.length > 45 || validateEmail(data.email) == false) {
      setErrorEmail(true)
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg: 'Please enter valid email!'}})
      return
    }
    setErrorEmail(false)

    if(data.sample_picture == 'no' && data.profile_img_file == '')
    {
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg: 'Please upload profile image!'}})
      return
    }

    props.showDemo(2, data)
  }


  return (
    <section className='text-center my-5'>
      
    <div className = "feature_container">
      <h3 className='h1-responsive font-weight-bold text-center ' style={{marginTop : 30}}>Show Me</h3>
      <p className='font-w-500 text-center w-responsive mx-auto '>
      You can run the “Show Me” demo in two ways:
      </p>
      <p className='font-w-500 text-center w-responsive mx-auto '>
        a)	Sample:  It uses sample profile picture to view the show.
          User needs select the “Sample profile picture” to “Y” for this scenario.
      </p>
      <p className='font-w-500 text-center w-responsive mx-auto '>
        b)	User: User needs to upload his/her own profile picture to view the Show.
          User needs to upload his/her profile picture using  “User profile picture upload” field below.
      </p>
      <p className='font-w-500 text-center w-responsive mx-auto '>
          Please leave your feedback using the link below to improve user satisfaction.
          If you like the show, please open an account. The mobile app will be available soon.
      </p>
      <div className={classes.row}>
        <div className={classes.label}>Category</div>
        <div>
          <FormControl className={classes.formControl}>
            <Select
              native
              variant="outlined"
              value={data.category}
              onChange={handleChange}
              inputProps={{
                name: 'category',
              }}
            >
              <option value={'Men'}>Men</option>
              <option value={'Women'}>Women</option>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Apparel Type</div>
        <div>
          <FormControl className={classes.formControl}>
            <Select
              native
              variant="outlined"
              value={data.type}
              onChange={handleChange}
              inputProps={{
                name: 'type'
              }}
            >
              <option value={'All'}>All</option>
              <option value={'Shirt'}>Shirt</option>
              <option value={'T-shirt'}>T-Shirt</option>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Zip code</div>
        <div>
        <TextField label="zip code" error = {err_zipcode} onChange={handleChange} name="zipcode" variant="outlined" value={data.zipcode}  className={classes.formControl}/>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Country</div>
        <div>
          <FormControl error = {err_country} className={classes.formControl}>
            <Select
              error = {err_country}
              native
              variant="outlined"
              value={data.country}
              onChange={handleChange}
              inputProps={{
                name: 'country'
              }}
            >
              {
                countries.map((item, index)=>
                  <option value={item.label}>{item.label}</option>
                )
              }
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>E-mail</div>
        <div>
        <TextField placeholder="your@email.com" error = {err_email} onChange={handleChange} name="email" variant="outlined" value={data.email} className={classes.formControl}/>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Sample Profile Picture</div>
        <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup row name="sample_picture" value={data.sample_picture} onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Profile Picture Upload</div>
        <div>
              <input type="file" onChange={handleImgFileChange} disabled={data.sample_picture == 'yes' ? true : false}  className={classes.formControl}/>
        </div>
      </div>
      <div className={classes.row} style={{marginTop : 24}}>
        <Button onClick={onSubmit} variant="outlined" color="secondary" style={{borderRadius : 24, width : 200}}>Submit</Button>
      </div>
    </div>
    </section>
  );
};

export default connect(null)(Demo1);