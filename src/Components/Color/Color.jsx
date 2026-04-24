import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import ContrastCheck from "../ContrastCheck/ContrastCheck";

export default function Color({ id, role, hex, contrastText, onColorDelete, onColorUpdate, onColorMove, isFirst, isLast, index }) {
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const colorData = {
    role: role,
    hex: hex,
    contrastText: contrastText,
  };

  function handleConfirmDelete() {
    onColorDelete(id);
  }

  function showConfirmDelete() {
    setIsConfirmDeleteVisible(true);
  }

  function hideConfirmDelete() {
    setIsConfirmDeleteVisible(false);
  }

  function handleUpdateForm(formData) {
    setIsEditFormVisible(false);
    onColorUpdate({ id: id, ...formData });
  }

  function handleColorMove(direction) {
    onColorMove(id, index, index + direction);
  }

  function showEditForm() {
    setIsEditFormVisible(true);
  }

  function hideEditForm() {
    setIsEditFormVisible(false);
  }

  return (
    <li className="color-card" style={{ backgroundColor: hex, color: contrastText }}>
      {!isFirst ? (
        <button className="color-card__move-color color-card__move-color--backwards" onClick={() => handleColorMove(-1)}>
          ▲
        </button>
      ) : null}
      {!isLast ? (
        <button className="color-card__move-color color-card__move-color--forwards" onClick={() => handleColorMove(1)}>
          ▼
        </button>
      ) : null}
      <div className="color-card__flexwrap">
        <h2 className="color-card__highlight">{hex}</h2>
        <CopyToClipboard copyValue={hex} />
      </div>
      <p className="color-card__role">{role}</p>
      <p className="color-card__contrast">contrast: {contrastText}</p>
      <ContrastCheck firstColor={hex} secondColor={contrastText} />
      {isEditFormVisible ? (
        <section className="color-card__form">
          <ColorForm onColorCreate={handleUpdateForm} initialColorData={colorData} submitLabel="update color" />
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
