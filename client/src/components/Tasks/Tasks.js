import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUpdateTask, getTasks } from "../../actions/task";

const Tasks = ({ getTasks, createUpdateTask, task: { tasks, loading } }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const { title = "", description = "", status = "" } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    //e.preventDefault();
    createUpdateTask(formData);
    getTasks();
  };
  return (
    <div>
      Tasks Component here:
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div>
              <h3 key={task.id}>{task.title}</h3>
              {task.description}
            </div>
          ))
        ) : (
          <h2>no tasks</h2>
        )}
      </div>
      <hr />
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => onChange(e)}
        />{" "}
        title
        <br />
        <br />
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => onChange(e)}
        />{" "}
        description
        <br />
        <br />
        <select name="status" value={status} onChange={(e) => onChange(e)}>
          <option value="OPEN" key="OPEN">
            OPEN
          </option>
          <option value="IN_PROGRESS" key="IN_PROGRESS">
            IN_PROGRESS
          </option>
          <option value="DONE" key="DONE">
            DONE
          </option>
        </select>{" "}
        status <br /> <br />
        <span> </span>
        <input type="submit" />
      </form>
    </div>
  );
};

Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  createUpdateTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, { createUpdateTask, getTasks })(Tasks);
