export const extractRepositoryNameFromProps = props => {
  return typeof props !== typeof undefined &&
    typeof props.match !== typeof undefined &&
    typeof props.match.params !== typeof undefined &&
    typeof props.match.params.repository !== typeof undefined
    ? props.match.params.repository
    : null;
};
