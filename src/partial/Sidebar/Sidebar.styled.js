import styled from 'styled-components';

export const SidebarStyled = styled.div`
  opacity: ${props => (props.isLoading ? 0.4 : 1)};
`;

export const LinksList = styled.ul`
  display: block;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const LinksListItem = styled.li`
  margin: 10px 0;
`;
