import {useContext, useEffect, useState} from 'react';
import FeedbackContext from '../context/FeedbackContext';
import Card from "./shared/Card";
import RatingSelect from './RatingSelect';
import Button from "./shared/Button";

function FeedbackForm() {
  const {feedbackEdit, addFeedback, updateFeedback } = useContext(FeedbackContext);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(feedbackEdit.edit){
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    const inputtedText = e.target.value.trim();
    if(inputtedText === '' || inputtedText.length === 0){
      setBtnDisabled(true);
      setMessage(null);
    }else if(inputtedText !== '' && inputtedText.length <= 10){
      setBtnDisabled(true);
      setMessage('Text must be at least 10 characters');
    }else{
      setBtnDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim().length > 10){
      const newFeedback = {
        text,
        rating
      };

      if(feedbackEdit.edit){
        updateFeedback(feedbackEdit.item.id, newFeedback)
      }else{
        addFeedback(newFeedback);
      }

      
      setText('');
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input type="text" placeholder='Write a review' onChange={handleTextChange} value={text} />
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm;
