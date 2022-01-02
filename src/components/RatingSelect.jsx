import {useContext, useEffect, useState} from 'react';
import FeedbackContext from '../context/FeedbackContext';

function RatingSelect({select}) {
  const ratingSelections = [];
  const numberOfSelections = 10;  
  const [selected, setSelected] = useState(numberOfSelections);

  const {feedbackEdit} = useContext(FeedbackContext);

  useEffect(() => {
    setSelected(feedbackEdit.item.rating);
  }, [feedbackEdit]);
  
  const handleChange = (e) => {
    setSelected(+e.currentTarget.value);
    select(+e.currentTarget.value);
  };

  for(let i = 1; i < numberOfSelections + 1; i++){
    ratingSelections.push(<li key={i}>
      <input type='radio' id={`num${i}`} name='rating' value={i} onChange={handleChange} checked={selected === i} /><label htmlFor={`num${i}`}>{i}</label>
    </li>);
  }

  return (
      <ul className='rating'>
        {ratingSelections.map((item) => item)}
      </ul>
  )
}

export default RatingSelect;
