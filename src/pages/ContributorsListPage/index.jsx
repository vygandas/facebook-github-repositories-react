import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadContributors,
  loadActiveRepository
} from '../../actions/repos.actions';
import { ContributorListItem } from '../../components/ContributorListItem';

class ContributorsListPage extends Component {
  currentRepository = null;

  getRepositoryName = () => {
    const p = this.props;
    return typeof p !== typeof undefined &&
      typeof p.match !== typeof undefined &&
      typeof p.match.params !== typeof undefined &&
      typeof p.match.params.repository !== typeof undefined
      ? this.props.match.params.repository
      : null;
  };
  componentWillMount() {
    this.props.loadActiveRepository(this.getRepositoryName());
  }
  componentDidMount() {
    this.props.loadContributors(this.getRepositoryName());
    this.currentRepository = this.getRepositoryName();
  }
  componentDidUpdate() {
    const check =
      this.props.user !== null &&
      this.props.repository &&
      this.props.repository.name !== this.getRepositoryName() &&
      this.currentRepository !== this.getRepositoryName();
    if (check) {
      this.props.loadActiveRepository(this.getRepositoryName());
      this.props.loadContributors(this.getRepositoryName());
      this.currentRepository = this.getRepositoryName();
    }
  }
  render() {
    return (
      <div>
        <h1>
          Repository{' '}
          <strong>{this.props.repository && this.props.repository.name}</strong>
        </h1>
        {this.props.contributors &&
          this.props.contributors.map(contributor => (
            <ContributorListItem
              author={contributor.author}
              key={contributor.author.login}
            />
          ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    contributors: state.repos.contributors,
    repository: state.repos.repository
  }),
  { loadContributors, loadActiveRepository }
)(ContributorsListPage);
