import "../../App.css";
function TeamsTable({ teams, teamPlaying, showAddPoints }) {
  return (
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
          <button
            onClick={showAddPoints(team.id)}
            style={{
              border: team?.id === teamPlaying?.id ? "2px solid green" : "none",
              padding: "5px",
              margin: "5px",
            }}
            key={team.id}
          >
            <li>
              <span>{team.name}</span>
              <span>{team.points}</span>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}

export default TeamsTable;
