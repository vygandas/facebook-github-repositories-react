import React from 'react';
import {
  ContributorsListItem,
  ContributorImage,
  ContributorLink
} from './ContributorListItem.styles';

export const ContributorListItem = ({ author }) => (
  <ContributorsListItem>
    <ContributorImage
      src={author.avatar_url}
      alt={author.login}
      width={30}
      height={30}
    />
    <ContributorLink href={author.html_url} target="_blank">
      <h2 className="h5">{author.login}</h2>
    </ContributorLink>
  </ContributorsListItem>
);
