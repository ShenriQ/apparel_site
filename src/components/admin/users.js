import {React, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Divider} from '@material-ui/core';
import './index.css'
import {SHOW_ALERT, DISMISS_LOAD, SHOW_LOAD} from '../../redux_helper/constants/action-types'
import {getAllUsers} from '../../apis/user';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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

function Users(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    props.dispatch({type : SHOW_LOAD, payload : 'Loading...'});
    getAllUsers().then(response => {
      let tmp_users = []
      response.forEach((doc) => {
        tmp_users.push({
          id : doc.id,
          ...doc.data()
        })
      })

      setUsers(tmp_users.filter(item=> item.email != "admin@user.com"));
      props.dispatch({type : DISMISS_LOAD, payload : ''});
    })
    .catch(err => {
      props.dispatch({type : DISMISS_LOAD, payload : ''});
      props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Loading apparels Error!'}});
    })
  }
  return (
    <div className={classes.root}>
        <div className ={classes.titleBar} >
            <div className="container" style = {{justifyContent : 'flex-start'}}>
                <div className={classes.title}>Users</div>
            </div>
        </div>
        <div className="container" style = {{marginTop : 18, marginBottom : 18}}> <div className={classes.title}>DEMO USER</div> </div>
        <div className="container" ><Divider style={{width : '100%'}}/></div>
        <div className="container" style={{ alignItems : 'center', marginTop : 18, marginBottom : 18}}>
          <div style={{marginRight : 250}}><img src='/assets/imgs/avatars/user.png' className="pimg"/></div>
          <div>
            <IconButton edge="end" style={{marginRight : 18, backgroundColor : '#83b735'}} onClick={()=> props.onSelectedUser({id : 'demo-user'})}>
                <ion-icon name="arrow-forward-outline" style={{fontSize : 18, color : '#fff'}}></ion-icon>
            </IconButton>
          </div>
        </div>
        <div className="container" style = {{marginTop : 55, marginBottom : 18}}> <div className={classes.title}>Registered Users</div> </div>
        <div className="container" ><Divider style={{width : '100%'}}/></div>
        <div className="container" style={{minHeight : '50vh', marginTop : 18, marginBottom : 18}}>
        <TableContainer  component={Paper} style = {{boxShadow : 'none'}}>
            <Table className={classes.table} aria-label="caption table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">PHOTO</TableCell>
                    <TableCell align="center">NAME</TableCell>
                    <TableCell align="center">CATEGORY</TableCell>
                    <TableCell align="center">TYPE</TableCell>
                    <TableCell align="center">COUNTRY</TableCell>
                    <TableCell align="center">CITY</TableCell>
                    <TableCell align="center">ZIPCODE</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user, index) => (
                    <TableRow key={index}>
                    <TableCell align="center">
                            <img src={
                            user.photo == '' ? '/assets/imgs/avatars/user.png' : user.photo
                            } className="pimg"/>
                    </TableCell>
                    <TableCell align="center">
                            <span className="pname">{user.name}</span>
                    </TableCell>
                    <TableCell align="center">
                        <span className="pname">{user.category}</span>
                    </TableCell>
                    <TableCell align="center">
                    <span className="pname">{user.apparel_type}</span>
                    </TableCell>
                    <TableCell align="center">
                    <span className="pname">{user.country}</span>
                    </TableCell>
                    <TableCell align="center">
                    <span className="pname">{user.city}</span>
                    </TableCell>
                    <TableCell align="center">
                    <span className="pname">{user.zipcode}</span>
                    </TableCell>
                    <TableCell align="center">
                        <IconButton edge="end" style={{marginRight : 18, backgroundColor : '#83b735'}} onClick={()=> props.onSelectedUser(user)}>
                        <ion-icon name="arrow-forward-outline" style={{fontSize : 18, color : '#fff'}}></ion-icon>
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

const mapstate_props = (state) => {
    return {
      user : state.userReducer.user,
    }
}
export default connect(mapstate_props)(Users)