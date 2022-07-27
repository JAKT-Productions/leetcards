import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// Import components and pages
import DashboardView from './Views/DashboardView.jsx';
import LoginView from './Views/LoginView.jsx';
import SignupView from './Views/SignupView';
import StudyView from './Views/StudyView';

export default function App() {

  const [data, setData] = useState({});
  // const [DeckNames, setDeckNames] = useState(['Deck1', 'Deck2', 'Deck3', 'Deck4', 'Deck5']);
  // Replace line 11 w/ line 12 and drill down to DeckDrawer
  console.log(data)
  return (
    <Routes>
      {/* <Route path={'/'} element={<DashboardView setDeckNames={setDeckNames} deckNames={deckNames}/>} /> */}
      <Route path={'/'} element={<LoginView setData={setData}/>} />
      <Route path="/signup" element={<SignupView />} />

      <Route
        path="/dashboard/access"
        element={
          Object.keys(data).length > 0 ? (
            <DashboardView data={data} setData={setData} />
          ) : (
            'Invalid permissions'
          )
        }
      />
    </Routes>
  );
}
