import "../../App.css";
function TeamsTable({ teams, teamPlaying, showAddPoints }) {
  return (
    <div
      className="teams-list"
      style={{
        padding: "1rem 1rem",
        fontSize: "1rem",
        position: "fixed",
        top: "1rem",
        width: "auto",
        right: "1rem ",
        minWidth: "200px",
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
              <span
                style={{
                  color: team?.id === teamPlaying?.id ? "white" : "grey",
                }}
              >
                {team.name}
              </span>
              <span
                style={{
                  color: team?.id === teamPlaying?.id ? "blue" : "grey",
                }}
              >
                {team.points}
              </span>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}

export default TeamsTable;
