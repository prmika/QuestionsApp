import React, { useEffect, useState } from "react";
import { questionsPack } from "../../questions.js";
import QuestionCard from "./QuestionCard.jsx";
import "../../App.css";
import { useTranslation } from "react-i18next";

function QuestionsTable(props) {
  const { teams } = props;
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
    questionStack[cardState.stackIndex].questions[cardState.qIndex].isCorrect =
      isAswerCorrect;
    // If all questions are answered, end the game
    const isGameFinished = questionStack.every((item) =>
      item.questions.every((q) => !q.show)
    );
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
      <div className="questionsContainer">
        {questionStack.map((item, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 20%",
              margin: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                textAlign: "center",
                fontStyle: "bold",
              }}
            >
              {item.category}
            </h2>
            {item.questions.map((questionObj, qIndex) => (
              <div
                key={qIndex}
                style={{ marginBottom: "10px", minWidth: "15em" }}
              >
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
                    style={{ width: "100%" }}
                  >
                    {questionObj.points}
                  </button>
                ) : (
                  <button
                    className="questionButton"
                    style={{
                      backgroundColor: questionObj.isCorrect
                        ? `var(--answer-bg-color)`
                        : "red",
                      color: "black",
                      width: "100%",
                      opacity: questionObj.isCorrect ? 1 : 0.5,
                      cursor: "not-allowed",
                    }}
                    disabled
                  >
                    {questionObj.points}
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "1rem 1rem",
          fontSize: "16px",
          cursor: "pointer",
          position: "fixed",
          bottom: "10px",
          right: "10px",
        }}
      >
        <button
          className="input-button"
          style={{ backgroundColor: "red" }}
          onClick={endGame}
        >
          {t("end_game")}
        </button>
      </div>
      {cardState.isShown && (
        <div className="cardOverlay">
          <QuestionCard
            teams={teams}
            question={cardState.selectedQuestion}
            onClose={closeCard}
            onAnswer={setQuestionAnswered}
            onAddPoints={props.onAddPoints}
          />
        </div>
      )}
    </>
  );
}

export default QuestionsTable;
