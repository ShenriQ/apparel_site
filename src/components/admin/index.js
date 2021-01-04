import {React, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Users from './users';
import Apparels from './apparels';
import AddNew from './add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom : 20
  },
}));

function AdminPage(props) {
  const classes = useStyles();
  const [curUser, setCurUser] = useState('')
  const [pageId, setPageId] = useState(0)
  useEffect(() => {
  }, [])

  const onSelectedUser=(user)=>{
    setCurUser(user)
    setPageId(1)
  }

  const onAdd=(user) => {
    setCurUser(user)
    setPageId(2)
  }

  const onAdded=(user) => {
    setCurUser(user)
    setPageId(1)
  }

  return (
    <div className={classes.root}>
      {pageId == 0 && <Users onSelectedUser={onSelectedUser} />}
      {pageId == 1 && <Apparels user = {curUser} onAdd={onAdd} />}
      {pageId == 2 && <AddNew user = {curUser} onAdded={onAdded}/> }
    </div>
  );
}

const mapstate_props = (state) => {
    return {
      user : state.userReducer.user,
    }
}
export default connect(mapstate_props)(AdminPage)