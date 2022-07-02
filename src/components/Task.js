import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskItem,
  changeTaskItem,
  removeTask,
  renameTask,
} from "../store/tasksSlice";
import CommonForm from "./CommonForm";
import TaskItem from "./TaskItem";

export default function Task({ id, cardId }) {
  const tasks = useSelector((state) => state.tasks.items);
  const task = tasks.find((i) => i.id === id);

  const dispatch = useDispatch();

  const onDeleteTask = (id) => {
    dispatch(removeTask(id));
  };
  const renameTaskTitle = (title) => {
    dispatch(renameTask({ cardId: cardId, id: task.id, title: title }));
  };

  const onAddItem = (title) => {
    if (title === "") return;
    dispatch(addTaskItem({ id: task.id, title: title }));
  };

  const changeItems = (taskItems) => {
    dispatch(changeTaskItem({ id: task.id, taskItems: taskItems }));
  };

  return (
    <CommonForm
      title={task.title}
      onDelete={() => onDeleteTask(task.id)}
      onAdd={onAddItem}
      onChangeTitle={renameTaskTitle}
    >
      <TaskItem taskId={task.id} changeItems={changeItems} />
    </CommonForm>
  );
}
