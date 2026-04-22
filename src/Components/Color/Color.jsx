import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ id, role, hex, contrastText, onDelete, onUpdate }) {
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const colorData = {
    role: role,
    hex: hex,
    contrastText: contrastText,
  };

  function handleConfirmDelete() {
    onDelete(id);
  }

  function showConfirmDelete() {
    setIsConfirmDeleteVisible(true);
  }

  function hideConfirmDelete() {
    setIsConfirmDeleteVisible(false);
  }

  function handleUpdateForm(formData) {
    setIsEditFormVisible(false);
    onUpdate({ id: id, ...formData });
  }

  function showEditForm() {
    setIsEditFormVisible(true);
  }

  function hideEditForm() {
    setIsEditFormVisible(false);
  }

  return (
    <li className="color-card" style={{ backgroundColor: hex, color: contrastText }}>
      <h2 className="color-card__highlight">{hex}</h2>
      <p className="color-card__role">{role}</p>
      <p className="color-card__contrast">contrast: {contrastText}</p>
      {isEditFormVisible ? (
        <section className="color-card__form">
          <ColorForm onSubmit={handleUpdateForm} initialColorData={colorData} submitLabel="update color"></ColorForm>
        </section>
      ) : null}
      <section className="color-card__buttons">
        {isConfirmDeleteVisible ? (
          <>
            <div className="color-card__confirm">
              <h3 className="color-card__highlight">Really delete?</h3>
            </div>
            <button className="color-card__button" onClick={hideConfirmDelete}>
              Cancel
            </button>
            <button className="color-card__button" onClick={handleConfirmDelete}>
              Delete
            </button>
          </>
        ) : isEditFormVisible ? (
          <button className="color-card__button" onClick={hideEditForm}>
            Cancel
          </button>
        ) : (
          <>
            <button className="color-card__button" onClick={showConfirmDelete}>
              Delete
            </button>
            <button className="color-card__button" onClick={showEditForm}>
              Edit
            </button>
          </>
        )}
      </section>
    </li>
  );
}
