import React from 'react';
import type { Task } from '../../store/types';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: Props) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <p>Status: {task.status}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <button className="button button-edit" onClick={() => onEdit(task)}>Edit</button>
        <button className="button button-delete" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;