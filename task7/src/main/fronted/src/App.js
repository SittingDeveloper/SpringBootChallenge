import './App.css';
import Sidebar from "./components/Sidebar";
import Map from "./map/Map";

function App() {
    return (
        <div className="App">
            <div>
                <Sidebar/>
            </div>
            <div>
                <Map/>
            </div>
        </div>
    );
}

export default App;
