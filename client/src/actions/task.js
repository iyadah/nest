import { TASK_ERROR, GET_TASK, GET_TASKS } from "./types";
import axios from "axios";

// Get TASK by ID
export const getTaskById = (taskId) => async (dispatch) => {
  try {
    const res = await axios.get(`/tasks/1`);

    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const getTasks = (taskId) => async (dispatch) => {
  try {
    const res = await axios.get(`/tasks/`);

    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
