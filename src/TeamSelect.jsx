import React, { useState } from "react";

function TeamSelect(params) {
  // Step 2: Initialize state variable for the team name
  const [teamName, setTeamName] = useState("");
  const [i, setI] = useState(1);

  // Step 3: Create an onChange handler
  const handleInputChange = (event) => {
    setTeamName(event.target.value);
  };

  // Modified onClick handler to use an arrow function to prevent immediate invocation
  const handleAddTeam = () => {
    params.addTeam({ name: teamName, id: i });
    setTeamName("");
    setI(i + 1);
  };

  return (
    <div>
      <h1>Create teams</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddTeam();
        }}
      >
        <input
          type="text"
          placeholder="Team name"
          value={teamName}
          onChange={handleInputChange}
          style={{
            padding: "20px", // Increased padding
            borderRadius: "10px", // Adjusted border radius for a more rounded look
            border: "2px solid #007BFF",
            outline: "none",
            fontSize: "24px", // Increased font size for bigger text
            boxShadow: "0 2px 5px rgba(0, 123, 255, 0.2)",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "20px 40px", // Increased padding for a larger button
            borderRadius: "10px", // Adjusted border radius to match the input
            fontSize: "24px", // Increased font size for bigger text
            cursor: "pointer", // Added cursor pointer for better UX
            border: "none", // Optional: remove border for a cleaner look
            backgroundColor: "#007BFF", // Optional: add background color
            color: "white", // Optional: change text color for better contrast
          }}
        >
          Add
        </button>
      </form>

      <div
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          position: "fixed",
          bottom: "20px",
          width: "calc(100% - 40px)",
          marginLeft: "20px",
        }}
      >
        <button onClick={params.onPlay} style={{backgroundColor: "#26f326", color: "black"}}>Start game</button>
      </div>
    </div>
  );
}

export default TeamSelect;
