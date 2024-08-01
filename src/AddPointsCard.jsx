import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function AddPointsCard(props) {
  const [points, setPoints] = useState(0);
  const team = props.team;
  const { t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAddPoints = () => {
    props.onAddPoints(points, null, team.id);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleAddPoints();
      }}
    >
      <div className="cardOverlay">
        <h1>
          {t("add_points_to_team")}: {team.name}
        </h1>
        <div style={{ marginTop: "120px" }}>
          <input
            ref={inputRef}
            className="input"
            type="number"
            onChange={(e) => setPoints(e.target.value)}
          />
          <button className="input-button" onClick={handleAddPoints}>
            {t("add")}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddPointsCard;
