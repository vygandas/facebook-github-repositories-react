import React, { Component } from 'react';
import { connect } from 'react-redux';
import loaderImage from './loader.gif';
import {
  PreloaderComponent,
  LoaderImage,
  ContentContainer
} from './Preloader.styled';

/**
 * Preloader component is watching isLoading state property and displaying
 * loader animation or content components.
 * */
class Preloader extends Component {
  render() {
    console.log('this.props.loading', this.props.loading);
    return (
      <PreloaderComponent isLoading={this.props.loading}>
        {this.props.loading && (
          <LoaderImage src={loaderImage} alt="Loading..." />
        )}
        <ContentContainer isLoading={this.props.loading}>
          {this.props.children}
        </ContentContainer>
      </PreloaderComponent>
    );
  }
}

export default connect(state => ({ loading: state.repos.isLoading }))(
  Preloader
);
