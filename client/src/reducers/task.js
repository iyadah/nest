import { TASK_ERROR, GET_TASK, GET_TASKS } from "../actions/types";

const initialState = {
  task: null,
  tasks: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TASK:
      return {
        ...state,
        task: payload,
        loading: false,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };

    case TASK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
