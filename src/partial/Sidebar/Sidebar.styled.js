import styled from 'styled-components';

export const SidebarStyled = styled.div`
  opacity: ${props => (props.isLoading ? 0.4 : 1)};
`;
