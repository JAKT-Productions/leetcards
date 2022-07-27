import React, { useState, useEffect } from 'react';
// Import components and pages
import DeckDrawer from '../Components/DeckDrawer';
import CardViewer from '../Components/CardViewer';

export default function DashboardView({data, setData}) {
  const [cards, setCards] = useState([]);
  return (
    <>
      <DeckDrawer data={data} setData={setData} cards={cards} setCards={setCards} />
      <CardViewer cards={cards} setCards={setCards} />
    </>
  );
}