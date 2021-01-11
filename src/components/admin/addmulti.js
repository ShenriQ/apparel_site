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

const AddMultipleApparel = (props) => {
  const classes = useStyles();

  const [photos, setPhotos] = useState([]);
  const img_photo = useRef(null)

  useEffect(()=>{
  }, [props.user])


  const handleImageChange = async (e) => {
    if(e.target.files == null || e.target.files.length == 0) return
    let urls = []
    props.dispatch({type : SHOW_LOAD, payload : 'Uploading...'});
    for(var i = 0; i < e.target.files.length; i ++)
    {
      try {
        let file_ref = props.user.id + '/' + e.target.files[i].name;
        let file_name = e.target.files[i].name.split('.')[0]
        await storage.ref(file_ref).put(e.target.files[i])
        let fireBaseUrl = await storage.ref(file_ref).getDownloadURL()
        console.log(fireBaseUrl);
        urls.push({
          name : file_name,
          url : fireBaseUrl
        })
      }
      catch(err){
        console.log(err)
        props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Photo uploading Error!'}});
      }
    }
    setPhotos(urls)
    props.dispatch({type : DISMISS_LOAD, payload : ''});
  }

  const addNewApparel = () => {
    let allPromises = []
    photos.map(photo => {
      let apparel_obj = {name : photo.name, description : photo.url, photo : photo.url, apparel_type : props.user.apparel_type, category : props.user.category}
      allPromises.push(addApparel(props.user, apparel_obj))
    })
    if(allPromises.length == 0) return
    props.dispatch({type : SHOW_LOAD, payload : 'Adding a apparel...'});
    Promise.all(allPromises).then(responses => {
      console.log(responses)
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
        <h4 className='h4-responsive font-weight-bold text-center my-5'> Add multiple apparels</h4>
      </div>
      <div className="row" style={{width : '100%', minHeight : '50vh', paddingTop : '10vh'}}>
        <div className="col-md-12 col-sm-12">
          <div>
            {/* <img src={photo == '' ? '/assets/imgs/placeholder.png' : photo}  className={classes.photo}/> */}
            <div>
            <input type="file" ref={img_photo} accept=".png, .jpg, .jpeg" multiple onChange={handleImageChange} />
            <Button onClick={addNewApparel} variant="outlined" color="secondary" style={{borderRadius : 24, fontSize: 14, marginTop : 8}}>
              Upload
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default connect(null)(AddMultipleApparel) ;