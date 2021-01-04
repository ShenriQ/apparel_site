import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './signin.css';
import { Divider, ButtonBase } from '@material-ui/core';
import {auth} from '../../utils/firebase';
import {SHOW_ALERT} from '../../redux_helper/constants/action-types';
import {connect} from 'react-redux';

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

function ForgotDialogs(props) {
  const {onClose, ...rest} = props;
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [err_email, setErrEmail] = React.useState(false);
  const [errmsg, setErrMsg] = React.useState('');

  React.useEffect(() => {
    setOpen(props.open)
    setEmail('')
  }, [props.open])
  
  const handleClose = () => {
    onClose();
  };

  function validateEmail(_email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(_email);
  }

  const handleSubmit=()=>{
    if(validateEmail(email) == false)
    {
      setErrMsg('Please enter valid email!')
      setErrEmail(true)
      return
    }
    setErrMsg('')
    setErrEmail(false)
    auth.sendPasswordResetEmail(email).then(response => {
      props.dispatch({type : SHOW_ALERT, payload: {type : 'success', msg : 'Password reset email was sent!'}})
      onClose();
    })
    .catch(error=> {
      props.dispatch({type : SHOW_ALERT, payload: {type : 'error', msg : 'Error occured!'}})
      console.log(error)
    })
   
  }

  return (
    <div>
      <Dialog  style = {{zIndex : 1000}}  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        </DialogTitle>
        <DialogContent >
        <form noValidate autoComplete="off">
          <h4 style={{textAlign : 'center'}}>Fogot Passowrd?</h4>
          <div style={{width : '100%', color : '#f00', textAlign : 'center', fontSize : 16}}>{errmsg}</div>
          <div className="minw-450" style = {{display : 'flex', flexDirection : 'column', padding : 45, paddingTop : 25,}}>
            <TextField  variant="outlined" label="Email" placeholder="your@email.com" error = {err_email} className="mt-20" value ={email} onChange={(e)=>setEmail(e.currentTarget.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ion-icon name="mail-outline"></ion-icon>
                  </InputAdornment>
                ),
              }}
            />
            <Button autoFocus onClick={handleSubmit} color="primary" className="mt-20 signin-btn">
              Send email
            </Button>
          </div>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default connect(null)(ForgotDialogs)