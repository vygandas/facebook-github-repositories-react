import React, { Component } from 'react';
import { connect } from 'react-redux';
import { numberWithCommas } from '../../formatters/numbers';
import { getRepositories } from '../../actions/repos.actions';
import { Link } from 'react-router-dom';
import { SidebarStyled, LinksList, LinksListItem } from './Sidebar.styled';

class Sidebar extends Component {
  componentDidMount() {
    this.props.getRepositories();
  }
  render() {
    return (
      <SidebarStyled>
        <h2>Facebook repositories</h2>
        <LinksList>
          {this.props.repositories &&
            this.props.repositories.map(repo => (
              <LinksListItem key={repo.id}>
                <Link to={{ pathname: repo.name }}>{repo.name}</Link>
                <small className="ml-2">
                  ({numberWithCommas(repo.watchers_count)})
                </small>
              </LinksListItem>
            ))}
        </LinksList>
      </SidebarStyled>
    );
  }
}

export default connect(
  state => ({ repositories: state.repos.repositories }),
  { getRepositories }
)(Sidebar);
