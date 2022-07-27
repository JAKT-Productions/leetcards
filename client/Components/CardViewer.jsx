import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CardViewer({cards, setCards}) {
const [index, setIndex] = useState(0);
const [cardInfo, setCardInfo] = useState({
    question: null,
    answer: null,
    favorite: null,
    iscode: null,
    tags: null
})
function next() {
    if (index < cards.length - 1) {
        setIndex(index + 1);
    }
}

function prev() {
    if (index > 0) {
        setIndex(index - 1);
    }
}
console.log("cards:", cards)

// useEffect(()=> {
//     if (cards.length>0) {
//         const {question, answer, favorite, iscode, tags} = cards[index];
//         setCardInfo({
//             question: question,
//             answer: answer,
//             favorite: favorite,
//             iscode: iscode,
//             tags: tags
//         });
    
//     }
// });


{/* <button previous onClick=(()=>fxn())/> */}

  return (
    <>
      <Card sx={{ minWidth: 275, marginLeft: 35 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Question
          </Typography>
          <Typography variant="h5" component="div">
            {cards.length > 0 && cards[index].question}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Answer
          </Typography>
          <Typography variant="body2">
            {cards.length > 0 && cards[index].answer}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Learn More</Button> */}
          <Button onClick={prev}>Previous</Button>
          <Button onClick={next}>Next</Button>
        </CardActions>
      </Card>
    </>
  );
}



