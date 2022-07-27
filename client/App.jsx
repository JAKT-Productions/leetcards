import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// Import components and pages
import DashboardView from './Views/DashboardView';
import LoginView from './Views/LoginView';
import SignupView from './Views/SignupView';
import StudyView from './Views/StudyView';

export default function App() {

  const [data, setData] = useState({});


  return (
    <Routes>
      <Route path={'/'} element={<LoginView setData={setData}/>} />
      <Route path="/signup" element={<SignupView />} />

      <Route
        path="/dashboard/access"
        element={
          Object.keys(data).length > 0 ? (
            <DashboardView data={data} />
          ) : (
            'Invalid permissions'
          )
        }
      />
    </Routes>
  );
}
