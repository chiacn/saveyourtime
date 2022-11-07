function PrivateRoute({ children }) {
  console.log("children 받음 =======", children);
  console.log(children.props);
  let { ...rest } = children[0].props;
  console.log(rest);
  return children;
}

export default PrivateRoute;
