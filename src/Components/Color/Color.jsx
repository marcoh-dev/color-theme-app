import "./Color.css";

export default function Color({ color }) {
  console.log(color);
  return (
    <li id={color.id} className="color-card" style={{ backgroundColor: color.hex }}>
      <h2 className="color-card__headline">{color.hex}</h2>
      <p className="color-card__role" style={{ color: color.contrastText }}>
        {color.role}
      </p>
      <p className="color-card__contrast" style={{ color: color.contrastText }}>
        contrast: {color.contrastText}
      </p>
    </li>
  );
}
