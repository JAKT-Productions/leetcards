import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import StyleIcon from '@mui/icons-material/MoveToInbox';
// import StyleIcon from '@mui/icons-material/Mail';
import StyleIcon from '@mui/icons-material/Style';
import TextField from '@mui/material/TextField';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function DeckDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const [DeckNames, setDeckNames] = useState(['Deck1', 'Deck2', 'Deck3', 'Deck4', 'Deck5']);
  const [drawerContents, setDrawerContents] = useState();


  const addDeck = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

    // Access text field
    const deckName = document.getElementById('deck-input');
    console.log(deckName);
     setDeckNames((prevDecks)=>{
      [...prevDecks, 'Deck6']
    })
    // console.log("hi"); Note, current version doesn't have access to text in input field 1:50pm
    // If text field is not empty --> submit a POST request to database
    // on success --> add deck to decklist & store response in state --> clear text field
  };

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };

  useEffect(()=> {
    const sidebar = list('left');
    setDrawerContents(sidebar);
  }, [DeckNames]);
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      Hello
      <Divider />
      <Box sx={{ '& > :not(style)': { m: 1 } }} onSubmit={addDeck}>
        <h2>Decks</h2>
        <>
          <TextField
              id="deck-input"
              label="Add deck"
              type="input"
              name="deck-input"
              variant="standard"
            />
          <Fab type="submit" size="small" color="secondary" aria-label="add">
            <AddIcon/>
          </Fab>
        </>
      </Box>
      <List>
        {[...DeckNames].map((text, index) => (
          <ListItem key={text} onClick={console.log("render deck cards logic here")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <StyleIcon /> : <StyleIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            variant="permanent"
            anchor={anchor}
            open={state[anchor]}
            // onClose={toggleDrawer(anchor, false)}
          >
            {drawerContents}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
