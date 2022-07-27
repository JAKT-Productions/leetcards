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
import StyleIcon from '@mui/icons-material/Style';
import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';

export default function DeckDrawer({data, setData, cards, setCards}) {
  const [DeckNames, setDeckNames] = useState(['Deck1', 'Deck2', 'Deck3', 'Deck4', 'Deck5']);
  const [DeckIDs, setDeckIDs] = useState([]);
  const [drawerContents, setDrawerContents] = useState();
  /*
  {
    user_id: user_id (integer)
    deckName ("Tarik"): deck_id,
    deckName ("Alina"): deck_id...
  }

  post req
  {
    deck_name: data.get('deck-input'),
    user_id: data.user_id
  }
response will look like (The created deck):
  {
    deckName ("Jin"): deck_id
  }
  setData({...data, ...response});
  */
  const getCards = async (deck_id) => {
    try {
      const cards = await fetch('/api/getCards', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deck_id: deck_id
        })
      });

      const parsedCard = await cards.json();
      console.log("carddata",parsedCard);
      setCards(parsedCard);

    } catch(err) {
      alert('Loading Cards Failed...')
    }
  }

  const addDeck = async (event) => {
      event.preventDefault();
      const inputData = new FormData(event.currentTarget);
    // Access text field
    // const deckName = document.getElementById('deck-input');
    // console.log(deckName);
    if (!DeckNames.includes(inputData.get('deck-input')) && inputData.get('deck-input') !== 'user_id' && inputData.get('deck-input') !== '') {

      try {
        const response = await fetch('/api/createDeck', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(  {
            deck_name: inputData.get('deck-input'),
            user_id: data.user_id
          })
        });
        console.log('Try block\n')
        const content = await response.json();
        setData({...data, ...content});
    
      } catch(err){
        window.alert('Deck Creation Failed');
      }
    }

      // setDeckNames(
      //   [...DeckNames, inputData.get('deck-input')]
      // );
  };
    // console.log("hi"); Note, current version doesn't have access to text in input field 1:50pm
    // If text field is not empty --> submit a POST request to database
    // on success --> add deck to decklist & store response in state --> clear text field

  useEffect(()=> {  
    const idArr = [];
    const deckArr = [];
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'user_id') {
        idArr.push(value);
        deckArr.push(key);
      }
    }
    setDeckNames(deckArr);
    setDeckIDs(idArr);

  },[data]);

  useEffect(()=> {
    const sidebar = list('left');
    setDrawerContents(sidebar);
  }, [DeckNames]);
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <Stack direction="row" spacing={2}>
        <Avatar
          // sx={{ bgcolor: deepOrange[500] }}
          alt="Kevin"
          src="/broken-image.jpg"
        />
        <Typography variant="h6">Hello, Kevin!</Typography>
      </Stack>
      <Divider />
      <Box sx={{ '& > :not(style)': { m: 1 } }} component="form" onSubmit={addDeck}>
      <Typography variant="h6">Decks</Typography>
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
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>{getCards(DeckIDs[index])}}>
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
    <>
      <Drawer variant="permanent" anchor={'left'}>
        {drawerContents}
      </Drawer>
    </>
  );
}
