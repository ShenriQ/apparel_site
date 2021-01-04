import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button, InputAdornment, Dialog, IconButton, TextField, Typography, Divider, ButtonBase, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './signin.css';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  textfield : {
    marginTop : 20
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{textAlign: 'center'}}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function SignInDialogs(props) {
  const {onLogin, onRegister, onClose, errmsg, ...rest} = props;
  const [formType, setFormType] = React.useState('Sign in');
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [con_pass, setConPass] = React.useState('');
  const [show_pass, setShowPass] = React.useState(false);

  const [err_name, setErrName] = React.useState(false);
  const [err_email, setErrEmail] = React.useState(false);
  const [err_pass, setErrPass] = React.useState(false);
  const [err_con_pass, setErrConPass] = React.useState(false);

  React.useEffect(() => {
    setOpen(props.open)
  }, [props.open])
  
  const handleClose = () => {
    onClose();
  };

  const changeForm=()=>{
    setFormType(formType == 'Sign in' ? 'Sign up' : 'Sign in')
  }

  const handleSubmit=()=>{
    if(formType == 'Sign in'){
      if(email == ''){
        setErrEmail(true)
        return
      }
      setErrEmail(false)
      if(pass == ''){
        setErrPass(true)
        return
      }
      setErrPass(false)
      onLogin({email: email, password : pass})
    }
    else
    {
      if(name == ''){
        setErrName(true)
        return
      }
      setErrName(false)
      if(email == ''){
        setErrEmail(true)
        return
      }
      setErrEmail(false)
      if(pass == ''){
        setErrPass(true)
        return
      }
      setErrPass(false)
      // if(con_pass != pass){
      //   setErrConPass(true)
      //   return
      // }
      // setErrConPass(false)
      onRegister({name : name, email: email, password : pass, photo : ""})
    }
  }

  return (
    <div>
      <Dialog style = {{zIndex : 1000}}  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        </DialogTitle>
        <DialogContent >
        <form noValidate autoComplete="off">
          <h4 style={{textAlign : 'center'}}>{formType}</h4>
          <div style={{width : '100%', color : '#f00', textAlign : 'center', fontSize : 16}}>{errmsg}</div>
          <div className="minw-450" style = {{display : 'flex', flexDirection : 'column', padding : 45, paddingTop : 25,}}>
            {
              formType != 'Sign in' && 
              <TextField variant="outlined" label="Name" error={err_name} placeholder="Enter max 50 characters" onChange={(e)=>setName(e.currentTarget.value)} value={name} className="mt-20"/>
            }
            <TextField onChange={(e)=>setEmail(e.currentTarget.value)} error={err_email} value={email} variant="outlined" label="Email" placeholder="your@email.com" className="mt-20"/>
            <FormControl variant="outlined" className="mt-20">
              <InputLabel >Password</InputLabel>
            <OutlinedInput onChange={(e)=>setPass(e.currentTarget.value)} error={err_pass} value={pass} type= {show_pass ? "text" : "password"} 
              label="Password" 
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={()=> setShowPass(!show_pass)}
                  >
                    {show_pass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              />
            </FormControl>
            {/* {
              formType != 'Sign in' && 
              <TextField onChange={(e)=>setConPass(e.currentTarget.value)} error={err_con_pass} value={con_pass} type="password" variant="outlined" label="Confirm Password" className="mt-20"/>
            } */}
            <Button autoFocus onClick={handleSubmit} color="primary" className="mt-20 signin-btn">
              {formType}
            </Button>
            {
              formType == 'Sign in' && 
              <Button autoFocus onClick={props.openForogtModal} color="primary" style={{fontSize : 14, marginTop : 15}}>
                Forgot password
              </Button>
            }
            <Button autoFocus onClick={changeForm} color="secondary" style={{fontSize : 14, marginTop : 35}}>
              {formType == 'Sign in' ? "Don't have an account yet?" : "Already have an account?"} 
            </Button>
          </div>
        </form>
        <Divider style={{marginLeft : 45, marginRight : 45, marginBottom : 20}}/>
        <div style={{textAlign : 'center'}}>
          <ButtonBase style={{margin : 10}}>
            <img src="/assets/imgs/appstore/appstore.png" width={160}/>
          </ButtonBase>
          <ButtonBase style={{margin : 10}}>
            <img src="/assets/imgs/appstore/googleplay.png" width={160}/>
          </ButtonBase>
        </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
