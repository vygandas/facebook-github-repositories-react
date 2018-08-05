import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadContributors,
  loadActiveRepository
} from '../../actions/repos.actions';
import { ContributorListItem } from '../../components/ContributorListItem';
import { extractRepositoryNameFromProps } from '../../helpers/repositoryName';

class ContributorsListPage extends Component {
  currentRepository = null;
  componentWillMount() {
    this.props.loadActiveRepository(extractRepositoryNameFromProps(this.props));
  }
  componentDidMount() {
    this.props.loadContributors(extractRepositoryNameFromProps(this.props));
    this.currentRepository = extractRepositoryNameFromProps(this.props);
  }
  componentDidUpdate() {
    if (this.isActiveRepoNotSameAsInUrl()) {
      this.props.loadActiveRepository(
        extractRepositoryNameFromProps(this.props)
      );
      this.props.loadContributors(extractRepositoryNameFromProps(this.props));
      this.currentRepository = extractRepositoryNameFromProps(this.props);
    }
  }
  isActiveRepoNotSameAsInUrl = () =>
    this.props.repository &&
    this.props.repository.name !== extractRepositoryNameFromProps(this.props) &&
    this.currentRepository !== extractRepositoryNameFromProps(this.props);
  render() {
    return this.props.repository ? (
      <div>
        <h1 className="mb-3">
          Repository{' '}
          <strong>{this.props.repository && this.props.repository.name}</strong>
        </h1>

        <article className="mb-3">{this.props.repository.description}</article>

        <div className="mb-3">
          URL:{' '}
          <a href={this.props.repository.url} target="_blank">
            {this.props.repository.url}
          </a>
        </div>

        <h4>Contributors</h4>

        {this.props.contributors &&
          this.props.contributors.map(contributor => (
            <ContributorListItem
              author={contributor.author}
              key={contributor.author.login}
            />
          ))}
      </div>
    ) : null;
  }
}

export default connect(
  state => ({
    contributors: state.repos.contributors,
    repository: state.repos.repository
  }),
  { loadContributors, loadActiveRepository }
)(ContributorsListPage);
