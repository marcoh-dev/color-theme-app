import "./Color.css";
import { useState } from "react";

export default function Color({ id, role, hex, contrastText, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleConfirmDelete() {
    onDelete(id);
  }

  function showConfirm() {
    setShowDeleteConfirm(true);
  }

  function hideConfirm() {
    setShowDeleteConfirm(false);
  }

  return (
    <li className="color-card" style={{ backgroundColor: hex, color: contrastText }}>
      <h2 className="color-card__highlight">{hex}</h2>
      <p className="color-card__role">{role}</p>
      <p className="color-card__contrast">contrast: {contrastText}</p>
      <section className="color-card__buttons">
        {showDeleteConfirm ? (
          <>
            <div className="color-card__confirm">
              <h3 className="color-card__highlight">Really delete?</h3>
            </div>
            <button className="color-card__button" onClick={hideConfirm}>
              Cancel
            </button>
            <button className="color-card__button" onClick={handleConfirmDelete}>
              Delete
            </button>
          </>
        ) : (
          <button className="color-card__button" onClick={showConfirm}>
            Delete
          </button>
        )}
      </section>
    </li>
  );
}
