import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useHistory} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));



export default function SimpleList({items,onclick}) {
    const classes = useStyles();
    const history=useHistory()
  let renderedList;
  const onsubmit = () => {
    onclick("")
  }
    if (items) { 
        console.log(items)
        if (items.search.length > 0) {
            renderedList = items.search.map((item, index) => {
              return (
                <ListItem button key={index} onClick={() => { history.push(`/profile/${item.id}`); onsubmit() }}>
                        <ListItemText primary={item.name} />
        </ListItem>
                
            )
        })
        }
     }
  return (
    <div className={classes.root} style={{marginTop:"10px"}}>
      <List component="nav" aria-label="main mailbox folders">
       {renderedList}
      
      </List>
      
    </div>
  );
}
