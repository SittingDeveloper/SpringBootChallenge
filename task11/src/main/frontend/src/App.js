import './App.css';
import GIS from "./sidebar/GIS";
import Main from "./dashBoard/Main";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <div className="App">

                    <Route exact path="/">
                        <Main/>
                    </Route>

                    <Route path="/gis">
                        <GIS/>
                    </Route>

                </div>
            </Switch>

        </BrowserRouter>
    );
}

export default App;
