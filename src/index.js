import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ObserverPokedex from './components/pokedex/pokedex';
import NavBar from './components/nav-bar/nav-bar';
import {pokedexStore} from './store';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ObserverPokemonDetails from './components/pokemon-details/pokemon-details';
import ScrollToTop from './components/scroll-to-top';


ReactDOM.render(
  <React.StrictMode>
      
      <Router>
      <ScrollToTop />
        <Switch>
          <Route path='/' exact render={(props) => <div>
            <header>
              <NavBar store={pokedexStore}/>
            </header>
            <ObserverPokedex {...props} store={pokedexStore}/></div> }
          />
          <Route path='/:id' component={ObserverPokemonDetails}/>
        </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
