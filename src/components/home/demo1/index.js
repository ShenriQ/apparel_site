import {React, useEffect, useState} from 'react';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, FormControl, Select} from '@material-ui/core';

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


const Latest = (props) => {
  const classes = useStyles();
  const [data, setData] = useState({
    category : 'Men', 
    type : 'All',
    zipcode : '',
    country : '',
    email : ''
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

  useEffect(()=>{
  }, [])

  const onSubmit=() =>{
    if(data.zipcode == '') {
      setErrorZip(true)
      return
    }
    setErrorZip(false)
    if(data.country == '') {
      setErrorCountry(true)
      return
    }
    setErrorCountry(false)
    if(data.email == '') {
      setErrorEmail(true)
      return
    }
    setErrorEmail(false)
    props.showDemo(2, data.category, data.type)
  }


  return (
    <section className='text-center my-5'>
      
    <div className = "feature_container">
      <h2 className='h1-responsive font-weight-bold text-center my-5'>Show Me</h2>
      <p className='grey-text text-center w-responsive mx-auto mb-5'>
        (Please fill out the section below)
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
        <TextField label="country" error = {err_country} onChange={handleChange} name="country" variant="outlined" value={data.country} className={classes.formControl}/>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>E-mail</div>
        <div>
        <TextField label="email" error = {err_email} onChange={handleChange} name="email" variant="outlined" value={data.email} className={classes.formControl}/>
        </div>
      </div>
      <div className={classes.row} style={{marginTop : 24}}>
        <Button onClick={onSubmit} variant="outlined" color="secondary" style={{borderRadius : 24, width : 200}}>Submit</Button>
      </div>
    </div>
    </section>
  );
};

export default Latest;