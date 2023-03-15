import React from 'react'
import { useState , useContext} from 'react';
import axios from 'axios';
import {AuthContext} from "../../src/context/auth.context"
import { useNavigate } from 'react-router-dom';
import "./review.css"

function Review(props) {
  const {setUpdated, thisRadio} = props
  const [reviews, setReviews] = useState("");
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleReview = (e) => {
    setReviews(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/review`,
        { comment: reviews, radioId: thisRadio._id, userId: user._id }
      );
      setReviews("");
      setUpdated(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="form-reviews" onSubmit={handleSubmit}>
        <label>
          Do you enjoy this station? <br></br>
          Leave a review:
          <input type="text" value={reviews} onChange={handleReview} />
        </label>
        <button type="submit">Send review</button>
      </form>
    </div>
  );
}

export default Review