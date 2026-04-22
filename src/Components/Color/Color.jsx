import "./Color.css";
import { useState } from "react";

export default function Color({ id, role, hex, contrastText, onDelete }) {
  const [hasClickedDelete, setHasClickedDelete] = useState(false);

  function handleClickDelete() {
    setHasClickedDelete(!hasClickedDelete);
  }

  function handleConfirmDelete() {
    onDelete(id);
  }

  return (
    <section className="color-card" style={{ backgroundColor: hex, color: contrastText }}>
      <h2 className="color-card__highlight">{hex}</h2>
      <p className="color-card__role">{role}</p>
      <p className="color-card__contrast">contrast: {contrastText}</p>
      <section className="color-card__buttons">
        {hasClickedDelete ? (
          <>
            <div className="color-card__confirm">
              <h3 className="color-card__highlight">Really delete?</h3>
            </div>
            <button className="color-card__button" onClick={handleClickDelete}>
              Cancel
            </button>
            <button className="color-card__button" onClick={handleConfirmDelete}>
              Delete
            </button>
          </>
        ) : (
          <button className="color-card__button" onClick={handleClickDelete}>
            Delete
          </button>
        )}
      </section>
    </section>
  );
}
