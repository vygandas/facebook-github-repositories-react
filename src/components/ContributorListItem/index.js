import React from 'react';
import { ContributorsListItem } from './ContributorListItem.styles';

export const ContributorListItem = ({ author }) => (
  <ContributorsListItem>
    <h2>{author.login}</h2>
  </ContributorsListItem>
);
