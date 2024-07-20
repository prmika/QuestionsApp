import React, { useEffect, useState } from "react";
import { questionsPack } from "../../questions.js";
import QuestionCard from "./QuestionCard.jsx";
import "../../App.css";
import { useTranslation } from "react-i18next";

function QuestionsTable(props) {
  const [questionStack, setQuestions] = useState(questionsPack);
  const [cardState, setCardState] = useState({
    isShown: false,
    selectedQuestion: null,
    stackIndex: null,
  });
  const { t } = useTranslation();
  const closeCard = () => {
    setCardState({ isShown: false, selectedQuestion: null, stackIndex: null });
  };
  const setQuestionAnswered = (isAswerCorrect) => {
    const points = cardState.selectedQuestion.points;
    props.onAnswer(points, isAswerCorrect);

    questionStack[cardState.stackIndex].questions[
      cardState.qIndex
    ].show = false;
    questionStack[cardState.stackIndex].questions[
      cardState.qIndex
    ].isCorrect = isAswerCorrect;
    // If all questions are answered, end the game
    const isGameFinished = questionStack.every((item) =>
      item.questions.every((q) => !q.show)
    );
    console.log(isGameFinished);
    if (isGameFinished) {
      endGame();
    }
    closeCard();
  };
  const endGame = () => {
    props.endGame(true);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        {questionStack.map((item, index) => (
          <div key={index} style={{ flex: 1, margin: "5px" }}>
            <h2>{item.category}</h2>
            {item.questions.map((questionObj, qIndex) => (
              <div key={qIndex} style={{ marginBottom: "10px" }}>
                {questionObj.show ? (
                  <button
                    className="questionButton"
                    onClick={() =>
                      setCardState({
                        isShown: true,
                        selectedQuestion: questionObj,
                        stackIndex: index,
                        qIndex: qIndex,
                      })
                    }
                  >
                    {questionObj.points}
                  </button>
                ) : (
                  <div className="answeredQuestionBox" style={{backgroundColor: questionObj.isCorrect ? `var(--answer-bg-color)` : "red" }}>
                    {questionObj.points}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{
          padding: "1em 2em",
          fontSize: "16px",
          cursor: "pointer",
          position: "fixed",
          bottom: "10px",
          right: "10px",
        }}>
      <button className="input-button" style={{backgroundColor: "red"}} onClick={endGame}>{t("end_game")}</button>
      </div>
      {cardState.isShown && (
        <div className="cardOverlay">
          <QuestionCard
            question={cardState.selectedQuestion}
            onClose={closeCard}
            onAnswer={setQuestionAnswered}
          />
        </div>
      )}
    </>
  );
}

export default QuestionsTable;
