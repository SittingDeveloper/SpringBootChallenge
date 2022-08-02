import './App.css';
import Sidebar from "./sidebar/Sidebar";
import Map from "./map/Map";
import LandingPage from "./SearchPlace/LandingPage";
import MapContainer from "./SearchPlace/MapContainer";

function App() {

    let var1;

  return (
    <div className="App">
        <Sidebar/>
        <LandingPage/>
        {/*<Map/>*/}
        {/*<MapContainer/>*/}
    </div>
  );
}

export default App;
