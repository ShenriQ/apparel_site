import {React, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Breadcrumbs, Link} from '@material-ui/core';
import './index.css'
import {SHOW_ALERT, DISMISS_LOAD, SHOW_LOAD} from '../../redux_helper/constants/action-types'
import {getUserAllApparels, deleteApparel} from '../../apis/apparel';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom : 20
  },
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

function Apparels(props) {
  const classes = useStyles();
  const [apparels, setApparels] = useState([])
  useEffect(() => {
    getApparels()
  }, [props.user])

  const getApparels = () => {
    props.dispatch({type : SHOW_LOAD, payload : 'Loading...'});
    getUserAllApparels(props.user.id).then(response => {
      let tmp_apparels = []
      response.forEach((doc) => {
        tmp_apparels.push({
          id : doc.id,
          ...doc.data()
        })
      })

      setApparels(tmp_apparels);
      props.dispatch({type : DISMISS_LOAD, payload : ''});
    })
    .catch(err => {
      console.log(err)
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Loading apparels Error!'}});
    })
  }

  const rmvApparel = (apparel_id) =>{
    props.dispatch({type : SHOW_LOAD, payload : 'Deleting...'});
    deleteApparel(props.user, apparel_id).then(response => {
      getApparels()
      props.dispatch({type : DISMISS_LOAD, payload : ''});
    })
    .catch(error => {
      console.log(error)
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Deleting apparel Error!'}});
    })
  }

  return (
    <div className={classes.root}>
        <div className ={classes.titleBar} >
            <div className="container" style = {{justifyContent : 'flex-start'}}>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link color="inherit" href="/apparel" className={classes.title}> Users </Link>
                  <Link color="inherit" href="/apparel" > {props.user.id == 'demo-user' ? 'Demo user' : props.user.name} </Link>
                  <Link color="textPrimary" href="#" > Apparels </Link>
                </Breadcrumbs>
            </div>
        </div>
        <div className="container" style={{marginTop : 24, marginBottom : 24, justifyContent : 'flex-end'}}>
            <Button onClick={()=>props.onAdd(props.user)} variant="outlined" color="secondary" style={{borderRadius : 24, }}>
              Add new apparel
            </Button>
          </div>
          
        <div className="container" style={{minHeight : '50vh'}}>
          
        <TableContainer  component={Paper} style = {{boxShadow : 'none'}}>
            <Table className={classes.table} aria-label="caption table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">PHOTO</TableCell>
                    <TableCell align="center">NAME</TableCell>
                    <TableCell align="center">CATEGORY</TableCell>
                    <TableCell align="center">TYPE</TableCell>
                    <TableCell align="center">DESCRIPTION</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {apparels.map((apparel, index) => (
                    <TableRow key={index}>
                    <TableCell align="center">
                            <img src={apparel.photo} className="pimg"/>
                    </TableCell>
                    <TableCell align="center">
                            <span className="pname">{apparel.name}</span>
                    </TableCell>
                    <TableCell align="center">
                            <span className="pname">{apparel.category}</span>
                    </TableCell>
                    <TableCell align="center">
                            <span className="pname">{apparel.apparel_type}</span>
                    </TableCell>
                    <TableCell align="center">
                        <span className="pname">{apparel.description}</span>
                    </TableCell>
                    <TableCell align="center">
                        <IconButton edge="end" style={{marginRight : 18, backgroundColor : '#83b735'}} onClick={() => rmvApparel(apparel.id)}>
                        <ion-icon name="trash-outline" style={{fontSize : 18, color : '#fff'}}></ion-icon>
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    </div>
  );
}


export default connect(null)(Apparels)