import React, { useEffect } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu} from '@material-ui/core';
import {Menu as MenuIcon, AccountCircle, Notifications as NotificationsIcon, MoreVert  as MoreIcon} from '@material-ui/icons';
import {connect} from 'react-redux';
// custom import
import './index.css';
import SignInDialog from '../modals/signin';
import ForgotPasswordDialog from '../modals/forgotpasswordModal';
import { GET_USER, API_LOGIN, API_REGISTER, OPEN_SIGNIN_MODAL, CLOSE_SIGNIN_MODAL} from '../../redux_helper/constants/action-types';
import ProfileMenu from './ProfileMenu';
import MobileMenu from './MobileMenu';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flex : 1
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = (props) => {

  const classes = useStyles();
  const [open_Forgotmodal, OpenForgotModal] = React.useState(false);
  const [open_signmodal, OpenSignModal] = React.useState(false)
  const [errmsg, setErrorMsg] = React.useState('')

  useEffect(() => {
    props.dispatch({type : GET_USER, payload : ''})
    OpenSignModal(props.isOpensignModal)
  }, [props.isOpensignModal])

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  const onLoginModalCallback = (payload) => {
    if(payload == 'success')
    {
      onCloseSignModal()
    }
    else {
      document.location.href = payload
    }
  }

  const onLogin = (user) => {
    props.dispatch({type : API_LOGIN, payload : {user : user, callback : onLoginModalCallback}})
  }
  const onRegister = (user) => {
    props.dispatch({type : API_REGISTER, payload : {user : user, callback : onLoginModalCallback}})
  }
  const onOpenSignModal = () => {
    props.dispatch({type : OPEN_SIGNIN_MODAL, payload : {}})
  }
  const onCloseSignModal = () => {
    props.dispatch({type : CLOSE_SIGNIN_MODAL, payload : {}})
  }

  return (
    <div className={classes.grow}>
      <AppBar className = "header" position="static">
        <Toolbar className="toolbar">
          <svg style = {{height: '0px', width : '0px'}}>
              <clipPath id="wave" clipPathUnits="objectBoundingBox">
              {/* <path class="st0" d="M1,0c0,0-0.3,0.1-0.5,0.1S0.3,0,0,0.1V1h1L1,0z"/> */}
              <path className="st0" d="M0,0.96 C0.2,1.05 0.4,0.94 0.5,0.9 C0.7,0.8 0.74,0.87 0.88,0.94 C0.93,0.97 0.94,0.98 0.98,0.97 L1,0.96  L1,0 L0,0 Z"/> 
              </clipPath>
          </svg>
          
          <Typography className={classes.title} variant="h6" noWrap>
            Apparel 
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <ul className="navbar-nav ml-auto header-link">
                <li className="nav-item"><a className="nav-link page-scroll" href="/">Home</a></li>
                {
                  props.user.id != null && 
                  <li className="nav-item">
                    <a className="nav-link page-scroll" href="/apparel">
                      {
                        props.user.email == "madhubobba2@gmail.com" ? "Users" : "Apparel"
                      }
                    </a>
                  </li>
                }
            </ul>
            {
              props.user.id == null ?
              <IconButton edge="end" onClick={()=> { setErrorMsg(''); onOpenSignModal();}} >
                <ion-icon name="person-outline" style = {{fontSize : 24}}></ion-icon>
              </IconButton>
              :
              <ProfileMenu />
            }
          </div>
          <div className={classes.sectionMobile}>
            <MobileMenu/>
          </div>
        </Toolbar>
      </AppBar>
      <ForgotPasswordDialog open={open_Forgotmodal}  onClose = {()=>OpenForgotModal(false)}  />
      <SignInDialog open={open_signmodal} errmsg = {errmsg} openForogtModal={()=>{OpenForgotModal(true); onCloseSignModal();}} onClose = {()=>onCloseSignModal()} onLogin={onLogin} onRegister={onRegister}/>
    </div>
  );
}

const mapstate_props = (state) => {
  return {
    user : state.userReducer.user,
    isOpensignModal : state.loadingReducer.isSignModal
  }
}

export default connect(mapstate_props)(Header)