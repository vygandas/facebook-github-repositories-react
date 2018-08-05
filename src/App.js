import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { AppStyled } from './App.styled';

import Preloader from './hoc/Preloader';
import Sidebar from './partial/Sidebar';
import RepositoriesListPage from './pages/RepositoriesListPage';
import ContributorsListPage from './pages/ContributorsListPage';

class App extends Component {
  render() {
    return (
      <AppStyled>
        <Provider store={store}>
          <Preloader>
            <div className="container">
              <HashRouter>
                <div className="row">
                  <div className="col-3">
                    <Sidebar />
                  </div>
                  <div className="col-9">
                    <Switch>
                      <Route exact path="/" component={RepositoriesListPage} />
                      <Route
                        path="/:repository"
                        component={ContributorsListPage}
                      />
                    </Switch>
                  </div>
                </div>
              </HashRouter>
            </div>
          </Preloader>
        </Provider>
      </AppStyled>
    );
  }
}

export default App;
