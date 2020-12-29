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
import { Divider, ButtonBase } from '@material-ui/core';

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

export default function FeedbackDialogs(props) {
  const {onAdd, onClose, errmsg, ...rest} = props;
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');
  const [err_feedback, setErrFeedback] = React.useState(false);

  React.useEffect(() => {
    setOpen(props.open)
  }, [props.open])
  
  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const handleSubmit=()=>{
    if(feedback == '')
    {
      setErrFeedback(true)
      return
    }
    setErrFeedback(false)
    onAdd(feedback)
  }

  return (
    <div>
      <Dialog  style = {{zIndex : 1000}}  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        </DialogTitle>
        <DialogContent >
        <form noValidate autoComplete="off">
          <h4 style={{textAlign : 'center'}}>Leave Your Feedback</h4>
          <div style={{width : '100%', color : '#f00', textAlign : 'center', fontSize : 16}}>{errmsg}</div>
          <div className="minw-450" style = {{display : 'flex', flexDirection : 'column', padding : 45, paddingTop : 25,}}>
            <TextField variant="outlined" label="Feedback" error = {err_feedback} className="mt-20" value ={feedback} onChange={(e)=>setFeedback(e.currentTarget.value)}
              multiline={true} rowsMax = {20} rows = {10}
            />
            <Button autoFocus onClick={handleSubmit} color="primary" className="mt-20 signin-btn">
              Submit
            </Button>
          </div>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
