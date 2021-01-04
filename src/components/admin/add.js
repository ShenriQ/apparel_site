import {useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, FormControl, Select, Grid, Breadcrumbs, Link} from '@material-ui/core';
import Carousel from '../apparel_carousel';
import FeedbackDialogs from '../modals/feedback';
import {db, auth, storage} from '../../utils/firebase';
import {addApparel} from '../../apis/apparel';
import {SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT, SET_USER} from '../../redux_helper/constants/action-types';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  photo : {
    width : 280, height : 280, borderWidth : 1, borderStyle : 'dotted', borderColor : '#777',
    boxShadow: '0 0 25px rgba(140,152,164,.6)!important'
  },
  row :  {display: 'flex', justifyContent : 'center', alignItems : 'center'},
  label : {width : 200, textAlign : 'left'},
  titleBar : {
    backgroundColor : '#f8f9fa !important',
    width : '100%',
    padding : 20
  },
  title : {
    [theme.breakpoints.up('md')]: {
        fontSize : 22
    },
    [theme.breakpoints.up('lg')]: {
        fontSize : 22
    },
    [theme.breakpoints.down('sm')]: {
        fontSize : 18
    },
    fontWeight : 800,
    color : '#777'
  }
}));

const AddApparel = (props) => {
  const classes = useStyles();
  const [open_modal, OpenModal] = useState(false);
  const [err_name, setErrName] = useState(false);
  const [err_description, setErrDescription] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [apparel_type, setApparelType] = useState('All');
  const [photo, setPhoto] = useState('');
  const img_photo = useRef(null)

  useEffect(()=>{
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

    let apparel_obj = {name : name, description : description, photo : photo, apparel_type : apparel_type, category : category}
    props.dispatch({type : SHOW_LOAD, payload : 'Adding a apparel...'});
    addApparel(props.user, apparel_obj).then(response => {
      console.log(response)
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : 'The apparel is added successfully!'}});
      
      props.onAdded(props.user)
    })
    .catch(err => {
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Creating new apparel Error!'}});
    })
  }

  return (
    <section className='text-center'>
      <div className ={classes.titleBar} >
            <div className="container" style = {{justifyContent : 'flex-start'}}>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link color="inherit" href="/apparel" className={classes.title}> Users </Link>
                  <Link color="inherit" href="/apparel" > {props.user.id == 'demo-user' ? 'Demo user' : props.user.name} </Link>
                  <Link color="textPrimary" href="#" > New apparel </Link>
                </Breadcrumbs>
            </div>
        </div>
    <div className = "feature_container">
      <div className="row" style={{width : '100%', justifyContent : 'center'}}>
        <h4 className='h4-responsive font-weight-bold text-center my-5'>New Apparel</h4>
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
          <div className={classes.row}>
            <div className={classes.label}>Category</div>
            <div>
              <FormControl className={classes.formControl}>
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
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Apparel Type</div>
            <div>
              <FormControl className={classes.formControl}>
                <Select
                  native
                  variant="outlined"
                  value={apparel_type}
                  onChange={(e)=>setApparelType(e.currentTarget.value)}
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
          </div>
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

export default connect(null)(AddApparel) ;