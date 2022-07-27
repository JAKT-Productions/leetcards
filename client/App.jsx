import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// Import components and pages
import DashboardView from './Views/DashboardView.jsx';
import LoginView from './Views/LoginView.jsx';
import SignupView from './Views/SignupView';
import StudyView from './Views/StudyView';
import themeOptions from './theme';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme(themeOptions);


export default function App() {

  
  const [data, setData] = useState({});
  // const [DeckNames, setDeckNames] = useState(['Deck1', 'Deck2', 'Deck3', 'Deck4', 'Deck5']);
  // Replace line 11 w/ line 12 and drill down to DeckDrawer
  console.log(data)
  return (
    <Routes>
      {/* <Route path={'/'} element={<DashboardView setDeckNames={setDeckNames} deckNames={deckNames}/>} /> */}
      <Route path={'/'} element={<ThemeProvider theme={theme}><LoginView setData={setData}/></ThemeProvider>} />
      <Route path="/signup" element={<ThemeProvider theme={theme}><SignupView /></ThemeProvider>} />

      <Route
        path="/dashboard/access"
        element={
          Object.keys(data).length > 0 ? (
            <ThemeProvider theme={theme}><DashboardView data={data} setData={setData} /></ThemeProvider>
          ) : (
            'Invalid permissions'
          )
        }
      />
    </Routes>
  );
}
