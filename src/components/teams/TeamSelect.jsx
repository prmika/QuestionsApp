import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function TeamSelect(params) {
  const [teamName, setTeamName] = useState("");
  const [i, setI] = useState(1);
  const { t } = useTranslation();

  const handleInputChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleAddTeam = () => {
    params.addTeam({ name: teamName, id: i });
    setTeamName("");
    setI(i + 1);
  };

  return (
    <div>
      <h1>{t("create_teams")}</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddTeam();
        }}
      >
        <input
          type="text"
          placeholder={t("team_name")}
          value={teamName}
          onChange={handleInputChange}
          maxLength={15}
          className="input"
        />
        <button type="submit" className="input-button">
          {t("add")}
        </button>
      </form>

      <div
        style={{
          padding: "1rem 1rem",
          cursor: "pointer",
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <button
          onClick={params.onPlay}
          className="input-button"
          style={{ backgroundColor: "#26f326", color: "black" }}
        >
          {t("start_game")}
        </button>
      </div>
    </div>
  );
}

export default TeamSelect;
