import './App.css';
import Sidebar from "./sidebar/Sidebar";
import Map from "./map/Map";
import LandingPage from "./SearchPlace/LandingPage";
import MapContainer from "./SearchPlace/MapContainer";

function App() {
  return (
    <div className="App">
        <Sidebar/>
        {/*<Map/>*/}
        <LandingPage/>
        {/*<MapContainer/>*/}
    </div>
  );
}

export default App;
