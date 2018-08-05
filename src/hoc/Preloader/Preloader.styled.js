import styled from 'styled-components';

export const PreloaderComponent = styled.div`
  min-height: ${props => (props.isLoading ? '150px' : '')};
`;

export const LoaderImage = styled.img`
  margin: auto;
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 160px;
`;

export const ContentContainer = styled.div`
  opacity: ${props => (props.isLoading ? 0.4 : 1)};
`;
