import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function QuestionCard(props) {
  const [isAnswerShown, setAnswerShown] = useState(false);
  const { question } = props;
  const { t } = useTranslation();

  const handlePoints = (isCorrect) => () => {
    props.onAnswer(isCorrect);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isAnswerShown ? (
        <React.Fragment>
          <h1 style={{ color: `var(--answer-bg-color` }}>{question.answer}</h1>
          <div className="question-card">
            <button className="input-button" onClick={handlePoints(true)}>
              {t("right")}
            </button>
            <button className="input-button" onClick={handlePoints(false)}>
              {t("wrong")}
            </button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1>{question.question}</h1>
          <div className="question-card">
            <button
              className="input-button"
              onClick={() => setAnswerShown(true)}
            >
              {t("show_answer")}
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default QuestionCard;
