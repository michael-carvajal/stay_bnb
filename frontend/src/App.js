import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ShowSpots from "./components/ShowSpots";
import SpotDetail from "./components/SpotDetail";
import CreateSpot from "./components/CreateSpot";
import CurrentUserSpots from "./components/CurrentUserSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path='/'>
      <ShowSpots />
        </Route>
        <Route path={['/spots/new', '/spots/:spotId/edit']}>
        <CreateSpot />
        </Route>
        <Route path = "/spots/current"><CurrentUserSpots /></Route>



        <Route exact path='/spots/:spotId'>   //keep generic paths last
      <SpotDetail />
        </Route>

      </Switch>}
    </>
  );
}

export default App;
