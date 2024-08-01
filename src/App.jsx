import React, { useEffect, useState } from "react";
import "./App.css";
import QuestionsTable from "./components/questions/QuestionsTable.jsx";
import TeamSelect from "./components/teams/TeamSelect.jsx";
import AddPointsCard from "./AddPointsCard.jsx";
import { useTranslation } from "react-i18next";
import TeamsTable from "./components/teams/TeamsTable.jsx";
import GameEnd from "./components/GameEnd.jsx";

function App() {
  const { t } = useTranslation();
  const [teams, setTeams] = useState([]);
  const [play, setPlay] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [winner, setWinner] = useState(null);
  const [teamPlaying, setTeamPlaying] = useState(null);
  const [showAddPointsCard, setShowAddPointsCard] = useState(false);
  const [teamToAddPoints, setTeamToAddPoints] = useState(null);

  const showEndGame = () => {
    const highestPoints = teams.reduce(
      (max, team) => Math.max(max, team.points),
      0
    );
    const winners = teams.filter((team) => team.points === highestPoints);

    if (winners.length > 1) {
      setWinner(winners);
    } else if (winners.length === 1) {
      setWinner(winners[0]);
    } else {
      // No winners, should not happen
      console.error("No winners found");
      setWinner(null);
    }
    setTeamPlaying(null);
    setPlay(false);
    setEndGame(true);
  };
  const startPlay = () => {
    if (teams.length === 0) {
      alert(t("add_team_alert"));
      return;
    }
    setPlay(true);
    const randomIndex = Math.floor(Math.random() * teams.length);
    setTeamPlaying(teams[randomIndex]);
  };

  const setPointsToTeam = (points, isAswerCorrect, teamId) => {
    if (teamId) {
      // If teamId is provided, add points to that team
      setTeams((prevTeams) => {
        const newTeams = prevTeams.map((team) => {
          if (team.id === teamId) {
            return { ...team, points: Number(team.points) + Number(points) };
          }
          return team;
        });
        return newTeams;
      });
      setShowAddPointsCard(false);
      return;
    }
    if (isAswerCorrect) {
      // If answer is correct, add points to the team playing
      setTeams((prevTeams) => {
        const newTeams = prevTeams.map((team) => {
          if (team.id === teamPlaying.id) {
            return { ...team, points: Number(team.points) + Number(points) };
          }
          return team;
        });
        return newTeams;
      });
    }
    setTeamPlaying(teams[teams.indexOf(teamPlaying) + 1]);
    if (teams.indexOf(teamPlaying) === teams.length - 1) {
      setTeamPlaying(teams[0]);
    }
  };
  const showAddPoints = (id) => () => {
    setShowAddPointsCard(true);
    setTeamToAddPoints(teams.find((team) => team.id === id));
  };
  const addTeam = (teamObj) => {
    if (teamObj.name.trim()) {
      if (teams.find((team) => team.name === teamObj.name)) {
        alert(t("team_exists_alert"));
        return;
      }
      setTeams((prevTeams) => [...prevTeams, { ...teamObj, points: 0 }]);
    } else {
      alert(t("team_name_alert"));
    }
  };

  return (
    <>
      <div>
        {/* <h1>{t("game_header")}</h1> */}
        {play ? (
          <TeamsTable
            teams={teams}
            teamPlaying={teamPlaying}
            showAddPoints={showAddPoints}
          />
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {!play ? (
          !endGame ? (
            <TeamSelect
              teams={teams}
              onPlay={() => startPlay()}
              addTeam={addTeam}
            />
          ) : (
            <GameEnd winner={winner} />
          )
        ) : (
          <QuestionsTable
            teams={teams}
            endGame={showEndGame}
            onAnswer={(points, isAnswerCorrect) => {
              setPointsToTeam(points, isAnswerCorrect);
            }}
            onAddPoints={setPointsToTeam}
          />
        )}
        {showAddPointsCard && (
          <AddPointsCard team={teamToAddPoints} onAddPoints={setPointsToTeam} />
        )}
      </div>

      <footer>
        <p className="read-the-docs">
          {t("creator")}
          <a
            href="https://github.com/prmika"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
