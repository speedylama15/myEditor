import { Editor } from "./editor";

import { DragVisual } from "./components";

import "./App.css";

function App() {
  return (
    <div className="app-page">
      <Editor />

      <DragVisual />
    </div>
  );
}

export default App;
