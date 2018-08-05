import React, { Component } from 'react';
import { connect } from 'react-redux';
import { numberWithCommas } from '../../formatters/numbers';
import {
  loadRepositories,
  loadActiveRepository,
  loadContributors
} from '../../actions/repos.actions';
import { Link } from 'react-router-dom';
import { SidebarStyled, LinksList, LinksListItem } from './Sidebar.styled';

class Sidebar extends Component {
  componentDidMount() {
    this.props.loadRepositories();
  }
  onRepositoryLinkClickHandler = repository => {
    this.props.loadContributors(repository.name);
    this.props.loadActiveRepository(repository);
  };
  renderRepositoriesList = () => {
    if (this.props.repositories && this.props.repositories.length > 0) {
      return this.props.repositories.map(repo => (
        <LinksListItem key={repo.id}>
          <Link
            to={{ pathname: repo.name }}
            onClick={() => this.onRepositoryLinkClickHandler(repo)}
          >
            {repo.name}
          </Link>
          <small className="ml-2">
            ({numberWithCommas(repo.watchers_count)})
          </small>
        </LinksListItem>
      ));
    }
    return null;
  };
  render() {
    return (
      <SidebarStyled>
        <Link to="/">
          <h2>Facebook repositories</h2>
        </Link>
        <LinksList>{this.renderRepositoriesList()}</LinksList>
      </SidebarStyled>
    );
  }
}

export default connect(
  state => ({ repositories: state.repos.repositories }),
  { loadRepositories, loadActiveRepository, loadContributors }
)(Sidebar);
