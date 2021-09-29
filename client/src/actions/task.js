import { TASK_ERROR, GET_TASK, GET_TASKS, ADD_TASK } from "./types";
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

export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3000/tasks/");

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

export const createUpdateTask = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:3000/tasks/", formData);
    console.log(res);
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
