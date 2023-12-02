export const addTask = (task) => ({
  type: "ADD_TASK",
  payload: task,
});

export const toggleTask = (index) => ({
  type: "TOGGLE_TASK",
  payload: index,
});

export const deleteTask = (index) => ({
  type: "DELETE_TASK",
  payload: index,
});

export const UpdateSettings = (settings) => ({
  type: "updateSettings",
  payload: settings,
});

export const login = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const logout = () => ({
  type: "LOGOUT",
});
