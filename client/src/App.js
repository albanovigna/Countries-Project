import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Countries from "./components/Countries/Countries";
import Activity from "./components/Activity/Activity";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/countries" element={<Countries />} />
        <Route exact path="/countries/:idCountry" element={<Detail />} />
        <Route exact path="/activity" element={<Activity />} />
      </Routes>
    </div>
  );
}

export default App;
