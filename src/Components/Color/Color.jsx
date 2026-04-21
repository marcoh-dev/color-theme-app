import "./Color.css";

export default function Color({ role, hex, contrastText }) {
  return (
    <section className="color-card" style={{ backgroundColor: hex, color: contrastText }}>
      <h2 className="color-card__headline">{hex}</h2>
      <p className="color-card__role">{role}</p>
      <p className="color-card__contrast">contrast: {contrastText}</p>
    </section>
  );
}
