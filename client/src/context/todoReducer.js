const reducer = (state, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "AUTH":
      return { ...state, isAuthenticated: action.payload };
    case "AUTH-FALSE":
      return { ...state, name: '', isAuthenticated: false}
    case "GET-INFO":
      const data = action.payload;
      return { ...state, name: data[0].user_name, todoList: data};
    case "TODOLIST":
      return { ...state, todoList: action.payload};
    case "WATCH":
      return { ...state, watchTodos: action.payload};
    default:
      throw new Error();
  }
}

export default reducer;