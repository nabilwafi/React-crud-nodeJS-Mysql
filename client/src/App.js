import React, { useState, useEffect } from "react";
import Axios from "axios";
import InputForm from "./component/InputForm";
import "./css/Style.css";

function App() {
  const [movieName, setMoviewName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8888/api/get").then((res) =>
      setMovieReviewList(res.data)
    );
  }, [movieReviewList]);

  const handleSubmit = () => {
    Axios.post("http://localhost:8888/api/insert", {
      movieName,
      movieReview: review,
    });

    setMoviewName("");
    setReview("");

    setMovieReviewList([
      ...movieReviewList,
      { movie_name: movieName, movie_review: review },
    ]);
  };

  const handleDelete = async (id) => {
    await Axios.delete(`http://localhost:8888/api/delete/${id}`);
  };

  const handleUpdate = (movieName) => {
    Axios.put(`http://localhost:8888/api/update/${movieName}`, {
      movieName,
      movieReview: newReview,
    });

    setNewReview("");
  };

  return (
    <div className="App">
      <h1 className="title">Crud Application</h1>

      <div className="form">
        <div className="form-wrapper">
          <label htmlFor="movie">Movie Name</label>
          <input
            className="form-input"
            id="movie"
            type="text"
            placeholder="Movie Name"
            onChange={(e) => setMoviewName(e.target.value)}
          />
        </div>
        <InputForm title="review" onChange={(e) => setReview(e.target.value)} />

        <div className="form-wrapper btn-wrapper">
          <button onClick={handleSubmit} className="btn">
            Submit
          </button>
        </div>
      </div>

      <div className="card-wrap">
        {movieReviewList.map((result, index) => (
          <div key={index} className="card">
            <h1>{result.movie_name}</h1>
            <p>{result.movie_review}</p>
            <div className="trigger-card">
              <button onClick={() => handleDelete(result.id)}>Delete</button>
              <input
                onChange={(e) => setNewReview(e.target.value)}
                type="text"
              />
              <button
                href=""
                className="blue"
                onClick={() => handleUpdate(result.movie_name)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
