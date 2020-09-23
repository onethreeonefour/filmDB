import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
// pages for this product
import LandingPage from "./components/views/LandingPage/LandingPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import MovieDetailPage from "./components/views/MovieDetailPage/MovieDetailPage";
import PersonDetailPage from "./components/views/PersonDetailPage/PersonDetailPage";


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/movie/:movieId" component={MovieDetailPage} />
          <Route exact path="/person/:personId" component={PersonDetailPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
