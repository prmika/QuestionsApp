import React, { useEffect, useState } from "react"; // Ensure React, useEffect, and useState are imported
import { questionsPack } from "./questions"; // Import questionsPack
import Card from "./Card.jsx";
import "./App.css";

function QuestionsTable(props) {
  const [questionStack, setQuestions] = useState(questionsPack);
  const [cardState, setCardState] = useState({
    isShown: false,
    selectedQuestion: null,
    stackIndex: null,
  });
  const closeCard = () => {
    setCardState({ isShown: false, selectedQuestion: null, stackIndex: null });
  };
  const setQuestionAnswered = (isAswerCorrect) => {
    const points = cardState.selectedQuestion.points;
    props.onAnswer(points, isAswerCorrect);

    questionStack[cardState.stackIndex].questions[
      cardState.qIndex
    ].show = false;
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
                  <div className="answeredQuestionBox">
                    {questionObj.points}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={endGame}>End game</button>
      {cardState.isShown && (
        <div className="cardOverlay">
          <Card
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
