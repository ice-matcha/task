export default store => next => action => {
  console.log("test success");
  next(action);
}