import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRepositories } from '../../actions/repos.actions';

import { SidebarStyled } from './Sidebar.styled';

class Sidebar extends Component {
  componentDidMount() {
    this.props.getRepositories();
  }
  render() {
    return (
      <SidebarStyled>
        <h2>Facebook repositories</h2>
        {this.props.repositories &&
          this.props.repositories.map(repo => (
            <div key={repo.id}>{repo.name}</div>
          ))}
      </SidebarStyled>
    );
  }
}

export default connect(
  state => ({ repositories: state.repos.repositories }),
  { getRepositories }
)(Sidebar);
