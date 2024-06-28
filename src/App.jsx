import React, { useEffect, useState } from "react";
import "./App.css";
import QuestionsTable from "./QuestionsTable.jsx";
import TeamSelect from "./TeamSelect.jsx";

function App() {
  const [teams, setTeams] = useState([]);
  const [play, setPlay] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [winner, setWinner] = useState(null);
  const [teamPlaying, setTeamPlaying] = useState(null);

  const showEndGame = () => {
    const winner = teams.reduce((prev, current) =>
      prev.points > current.points ? prev : current
    );
    setWinner(winner);
    setTeamPlaying(null);
    setPlay(false);
    setEndGame(true);
  };
  const startPlay = () => {
    if (teams.length === 0) {
      alert("Lisää vähintään yksi joukkue pelataksesi!");
      return;
    }
    setPlay(true);
    const randomIndex = Math.floor(Math.random() * teams.length);
    setTeamPlaying(teams[randomIndex]);
  };

  const setPointsToTeam = (points, isAswerCorrect) => {
    if (isAswerCorrect) {
      setTeams((prevTeams) => {
        const newTeams = prevTeams.map((team) => {
          if (team.id === teamPlaying.id) {
            return { ...team, points: team.points + points };
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
  const addTeam = (teamObj) => {
    if (teamObj.name.trim()) {
      if (teams.find((team) => team.name === teamObj.name)) {
        alert("Joukkue on jo lisätty! Valitse toinen nimi.");
        return;
      }
      setTeams((prevTeams) => [...prevTeams, { ...teamObj, points: 0 }]);
    } else {
      alert("Joukkueen nimi ei voi olla tyhjä!");
    }
  };

  return (
    <>
      <div>
        <h1>Cool questions game</h1>
        <div
          className="teams-list"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            position: "fixed",
            top: "10px",
            width: "auto",
            right: "10px",
          }}
        >
          <ul>
            {teams.map((team) => (
              <li
                key={team.id}
                style={{
                  border:
                    team?.id === teamPlaying?.id ? "2px solid green" : "none", // Conditional styling
                  padding: "5px", // Add padding for visual enhancement
                  margin: "5px", // Add margin for spacing between items
                }}
              >
                <span>{team.name}</span>
                <span>{team.points}</span>
              </li>
            ))}
          </ul>
        </div>
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
            <div>
              <h1>Peli päättyi!</h1>
              <h2>Voittaja on {winner.name}!</h2>
              <h3>Pisteet: {winner.points}</h3>
            </div>
          )
        ) : (
          <QuestionsTable
            endGame={showEndGame}
            onAnswer={(points, isAnswerCorrect) => {
              setPointsToTeam(points, isAnswerCorrect);
            }}
          />
        )}
      </div>

      <footer>
        <p className="read-the-docs">
          This game is created by Miika Kauppinen{" "}
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
