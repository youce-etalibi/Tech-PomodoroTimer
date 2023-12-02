import { combineReducers } from "redux";

const initStateTasks = {
  TaskList: [],
};
const initStateSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStartPomodoro: false,
  autoStartShortBreak: false,
};
const initStateUser = {
  isAuthenticated: false,
  user: null,
};
function TasksReducer(state = initStateTasks, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, TaskList: [...state.TaskList, action.payload] };
    case "TOGGLE_TASK":
      return {
        ...state,
        TaskList: state.TaskList.map((task, index) =>
          index === action.payload ? { ...task, checked: !task.checked } : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        TaskList: state.TaskList.filter(
          (task, index) => index !== action.payload
        ),
      };
    default:
      return state;
  }
}

function SettingsReducer(state = initStateSettings, action) {
  switch (action.type) {
    case "updateSettings":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function UserReducer(state = initStateUser, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

const RootReducers = combineReducers({
  tasks: TasksReducer,
  settings: SettingsReducer,
  user: UserReducer,
});

export default RootReducers;
