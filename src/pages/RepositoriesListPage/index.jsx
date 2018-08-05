import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HeaderCentered } from './RepositoriesListPage.styled';

class RepositoriesListPage extends Component {
  render() {
    return (
      <div>
        <HeaderCentered>
          There're{' '}
          {this.props.repositories ? this.props.repositories.length : '#'}{' '}
          Facebook repositories on GitHub.
          <br />
          <small>Select one to see more information.</small>
        </HeaderCentered>
      </div>
    );
  }
}

export default connect(state => ({ repositories: state.repos.repositories }))(
  RepositoriesListPage
);
