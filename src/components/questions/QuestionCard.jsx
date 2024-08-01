import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function QuestionCard(props) {
  const { teams } = props;
  const [isAnswerShown, setAnswerShown] = useState(false);
  const [points, setPoints] = useState({});
  const { question } = props;
  const { t } = useTranslation();

  const handlePointsChange = (teamId, value) => {
    setPoints((prevPoints) => ({
      ...prevPoints,
      [teamId]: value,
    }));
  };

  const setPointsToTeams = () => {
    teams.forEach((team) => {
      const pointsForTeam = points[team.id] || 0;
      props.onAddPoints(pointsForTeam, null, team.id);
    });
    props.onAnswer(true, true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isAnswerShown ? (
        <React.Fragment>
          {question.isStarQuestion ? (
            <React.Fragment>
              <h1>{t("points")}</h1>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {teams.map((team) => (
                  <div
                    key={team.id}
                    style={{ flex: "1 1 200px", margin: "10px" }}
                  >
                    <h1>{team.name}</h1>
                    <input
                      className="input-small"
                      type="number"
                      onChange={(e) =>
                        handlePointsChange(team.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <button className="input-button" onClick={setPointsToTeams}>
                {t("add")}
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1 style={{ color: `var(--answer-bg-color)` }}>
                {question.answer}
              </h1>
              <div className="question-card">
                <button
                  className="input-button"
                  onClick={() => props.onAnswer(true)}
                >
                  {t("right")}
                </button>
                <button
                  className="input-button"
                  onClick={() => props.onAnswer(false)}
                >
                  {t("wrong")}
                </button>
              </div>
            </React.Fragment>
          )}
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
