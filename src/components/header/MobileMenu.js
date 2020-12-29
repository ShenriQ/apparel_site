import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button,IconButton,Menu,MenuItem,ListItemIcon,ListItemText,Divider } from '@material-ui/core';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PersonIcon from '@material-ui/icons/Person';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      // backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        // color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


export default function MobileMenu(props) {
  const {cur_workspace, ...rest} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <IconButton
            //   className={classes.signOutButton}
            color="inherit"
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleClick}
            >
            <MoreIcon style = {{fontSize : 24}} />
        </IconButton>
        <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
        <StyledMenuItem style = {{padding : 8}}>
          <ion-icon name="person-outline" style = {{fontSize : 18, margin : 4}}></ion-icon>
          <span style={{fontSize : 14, marginLeft : 6}}>Profile Setting</span>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem 
          style = {{padding : 8}}
          onClick = {() => {
              sessionStorage.removeItem('user');
              document.location.href = '/';
          }}> 
          <ExitToAppOutlinedIcon fontSize="small" style = {{fontSize : 18, margin : 4}}/>
          <span style={{fontSize : 14, marginLeft : 6}}>Log out</span>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}