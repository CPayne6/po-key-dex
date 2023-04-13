import "./App.css";
import { PokeDex } from "./components/PokeDex";

function App() {
  return (
    <div className="App">
      <h1>Po-Key Dex</h1>
      <PokeDex api="https://pokeapi.co/api/v2" />
    </div>
  );
}

export default App;
