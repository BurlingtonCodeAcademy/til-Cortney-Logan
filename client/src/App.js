import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.js"
import Facts from "./components/Facts.js"
import Entry from "./components/Entry.js"
import NotFound from "./components/NotFound.js"
import Header from "./components/Header.js"


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/facts" component={Facts} />
        <Route path="/facts/:objectId" component={Entry} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
