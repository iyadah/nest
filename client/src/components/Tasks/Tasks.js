import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTasks } from "../../actions/task";

const Tasks = ({ getTasks, task: { tasks, loading } }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);
  console.log(tasks);
  return (
    <div>
      Tasks Component here:
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => <h1 key={task.id}>{task.title}</h1>)
        ) : (
          <h2>no tasks</h2>
        )}
      </div>
    </div>
  );
};

Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, { getTasks })(Tasks);
