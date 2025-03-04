import { useState } from "react";
import "../../../styles/App.css";
import SideBar from "../../component/SideBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="flex w-full">
          HOLA MUNDO CON TAILWIND!
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
