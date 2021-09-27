import Task from "./components/Tasks/Tasks";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      hey you
      <Task />
    </Provider>
  );
}

export default App;
