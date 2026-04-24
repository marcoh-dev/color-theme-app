import "./ThemeForm.css";

export default function ThemeForm({ theme, formMode, onThemeCreate, onThemeUpdate, onThemeDelete, onThemeCancel }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));

    switch (formMode) {
      case "edit":
        onThemeUpdate(formData);
        break;
      case "create":
        onThemeCreate(formData);
        break;
      case "delete":
        onThemeDelete();
        break;
      default:
        onThemeCancel();
        break;
    }
  }
  function cancelForm(event) {
    event.preventDefault();
    onThemeCancel();
  }

  if (formMode == "") {
    return null;
  }

  return (
    <form className="theme-form" autoComplete="off" onSubmit={handleSubmit}>
      <section className="theme-form__section">
        {formMode === "edit" ? (
          <>
            <label className="theme-form__label" htmlFor="name">
              Theme Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={theme.name}
              className="color-form__input  color-form__input--text"
              required
            />
            <button className="theme-form__button">update</button>
            <button className="theme-form__button" onClick={cancelForm}>
              cancel
            </button>
          </>
        ) : null}
        {formMode === "create" ? (
          <>
            <label className="theme-form__label" htmlFor="name">
              Theme Name:
            </label>
            <input type="text" id="name" name="name" className="color-form__input  color-form__input--text" required />
            <button className="theme-form__button">create</button>
            <button className="theme-form__button" onClick={cancelForm}>
              cancel
            </button>
          </>
        ) : null}
        {formMode === "delete" ? (
          <>
            <button className="theme-form__button">yes delete</button>
            <button className="theme-form__button" onClick={cancelForm}>
              cancel
            </button>
          </>
        ) : null}
      </section>
    </form>
  );
}
