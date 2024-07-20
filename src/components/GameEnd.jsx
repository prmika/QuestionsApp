import React from "react";
import { useTranslation } from "react-i18next";

function GameEnd({ winner }) {
  const { t } = useTranslation();
  const isTie = Array.isArray(winner);
  if (isTie) {
    const winnerNames = winner.map((team) => team.name);
    return (
      <div>
        <h1>{t("its_tie")}</h1>
        <h2 style={{ fontSize: "5em" }}>{t("continuation_game")} </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <h3
            style={{
              fontSize: "5em",
              color: `var(--answer-bg-color`,
              margin: "10px",
            }}
          >
            {winnerNames.join(" & ")}
          </h3>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{t("game_over")}</h1>
        <h2 style={{ fontSize: "5em", color: `var(--answer-bg-color` }}>
          {t("winner_is")} {winner.name}!
        </h2>
        <h3 style={{ fontSize: "5em" }}>
          {t("points")}: {winner.points}
        </h3>
      </div>
    );
  }
}

export default GameEnd;
