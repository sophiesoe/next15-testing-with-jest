import { useFormik } from "formik";
import { addTodo } from "../../features/TodoSlice";
import { useDispatch } from "react-redux";
import store from "../../store";

type AppDispatch = typeof store.dispatch;

function AddTodo() {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: { text: "" },
    onSubmit: (values, { resetForm }) => {
      if (values.text.trim() !== "") {
        dispatch(addTodo(values.text));
        resetForm();
      } else {
        alert("Please enter a task.");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        name="text"
        value={formik.values.text}
        onChange={formik.handleChange}
        placeholder="Enter a task"
        className="border p-2 flex-1 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add
      </button>
    </form>
  );
}

export default AddTodo;
