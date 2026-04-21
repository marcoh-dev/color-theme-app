import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      <ul class="color-theme">
        {initialColors.map((color) => (
          <Color key={color.id} color={color} />
        ))}
      </ul>
    </>
  );
}

export default App;
