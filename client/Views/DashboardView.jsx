import React, { useState, useEffect } from 'react';
// Import components and pages
import DeckDrawer from '../Components/DeckDrawer';

export default function DashboardView({data, setData}) {

  return (
    <>
      <DeckDrawer data={data} setData={setData}/>
    </>
  );
}