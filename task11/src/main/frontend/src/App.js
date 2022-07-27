import './App.css';
import Sidebar from "./sidebar/Sidebar";
import Map from "./map/Map";
import LandingPage from "./SearchPlace/LandingPage";

function App() {
  return (
    <div className="App">
        <Sidebar/>
        {/*<Map/>*/}
        <LandingPage/>
    </div>
  );
}

export default App;
