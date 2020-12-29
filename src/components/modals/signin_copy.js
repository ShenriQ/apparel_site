import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [con_pass, setConPass] = React.useState('');

  React.useEffect(() => {
    setOpen(props.open)
  }, [props.open])
  
  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const changeForm=()=>{
    setFormType(formType == 'Sign in' ? 'Sign up' : 'Sign in')
  }

  const handleSubmit=()=>{
    if(formType == 'Sign in'){
      onLogin({user_email: email, user_password : pass, device_id : "" })
    }
    else
    {
      onRegister({user_id: "", user_name : name, user_email: email, user_password : pass, user_phone : "", device_id : "" })
    }
  }

  return (
    <div>
      <Dialog onClose={handleClose} style = {{zIndex : 1000}}  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        </DialogTitle>
        <DialogContent >
        <form noValidate autoComplete="off">
          <h4 style={{textAlign : 'center'}}>{formType}</h4>
          <div style={{width : '100%', color : '#f00', textAlign : 'center', fontSize : 16}}>{errmsg}</div>
          <div className="minw-450" style = {{display : 'flex', flexDirection : 'column', padding : 45, paddingTop : 25,}}>
            {
              formType != 'Sign in' && <TextField variant="outlined" label="Name" onChange={(e)=>setName(e.currentTarget.value)} value={name} className="mt-20"/>
            }
            <TextField onChange={(e)=>setEmail(e.currentTarget.value)} value={email} variant="outlined" label="Email Address" className="mt-20"/>
            <TextField onChange={(e)=>setPass(e.currentTarget.value)} value={pass} type="password" variant="outlined" label="Password" className="mt-20"/>
            {
              formType != 'Sign in' && <TextField onChange={(e)=>setConPass(e.currentTarget.value)} value={con_pass} type="password" variant="outlined" label="Confirm Password" className="mt-20"/>
            }
            <Button autoFocus onClick={handleSubmit} color="primary" className="mt-20 signin-btn">
              {formType}
            </Button>
            <Button autoFocus onClick={changeForm} color="secondary" style={{fontSize : 14, marginTop : 35}}>
              {formType == 'Sign in' ? "Don't have an account yet?" : "Already have an account?"} 
            </Button>
          </div>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
