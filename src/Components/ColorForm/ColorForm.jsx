import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({ onSubmit, submitLabel, initialColorData }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    onSubmit(formData);
  }
  console.log(initialColorData);

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <section className="color-form__section">
        <label className="color-form__label" htmlFor="role">
          Role
        </label>
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={initialColorData.role}
          className="color-form__input  color-form__input--text"
          required
        />
      </section>
      <section className="color-form__section">
        <label className="color-form__label" htmlFor="hex">
          Hex
        </label>
        <ColorInput id="hex" defaultValue={initialColorData.hex} />
      </section>
      <section className="color-form__section">
        <label className="color-form__label" htmlFor="contrastText">
          Contrast Text
        </label>
        <ColorInput id="contrastText" defaultValue={initialColorData.contrastText} />
      </section>
      <section className="color-form__section">
        <button className="color-form__button">{submitLabel}</button>
      </section>
    </form>
  );
}
