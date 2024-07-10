import React, { useEffect, useState } from "react";

function QuestionCard(props) {
  const [isAnswerShown, setAnswerShown] = useState(false);
  const { question } = props;

  const handlePoints = (isCorrect) => () => {
    props.onAnswer(isCorrect);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isAnswerShown ? (
        <React.Fragment>
          <h1 style={{ color: `var(--answer-bg-color` }}>{question.answer}</h1>
          <div style={{ marginTop: "120px" }}>
            <button onClick={handlePoints(true)}>Oikein</button>
            <button onClick={handlePoints(false)}>Väärin</button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1>{question.question}</h1>
          <div style={{ marginTop: "120px" }}>
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => setAnswerShown(true)}
            >
              Vastaus
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default QuestionCard;
