import { useState } from "react";
import "./App.css";
import Examples from "./components/examples/Examples";
import Marvin from "./components/marvin/Marvin";
import { Marvin as MarvinRef } from "@chemaxon/marvin";

function App() {
  const [marvinRef, setMarvinRef] = useState<MarvinRef>();
  return (
    <section id="app">
      <Marvin settings={{}} setMarvinRef={setMarvinRef} />
      <Examples marvinRef={marvinRef} />
    </section>
  );
}

export default App;
