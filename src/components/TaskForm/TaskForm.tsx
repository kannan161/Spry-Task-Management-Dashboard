import { useState } from 'react';
import type { Task } from '../../store/types';

interface Props {
  task?: Task;
  onSubmit: (task: Task) => void;
  onClose: () => void;
}

const TaskForm = ({ task, onSubmit, onClose }: Props) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'Pending');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});
  const [selected, setSelected] = useState<{ title?: boolean; dueDate?: boolean }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title should be at least 5 characters';
    } else if (title.trim().length > 20) {
      newErrors.title = 'Title should be less than 20 characters';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setSelected({ title: true, dueDate: true });

    if (!validate()) return;

    onSubmit({
      id: task?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status,
      dueDate,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close task form"
          >
            X
          </button>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onBlur={() => setSelected(prev => ({ ...prev, title: true }))}
            onChange={e => setTitle(e.target.value)}
          />
          {selected.title && errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <textarea
            className="textarea"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div className="select-wrap">
            <select value={status} onChange={e => setStatus(e.target.value as Task['status'])}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <input
            type="date"
            value={dueDate}
            onBlur={() => setSelected(prev => ({ ...prev, dueDate: true }))}
            onChange={e => setDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          {selected.dueDate && errors.dueDate && <p className="error">{errors.dueDate}</p>}
        </div>

        <div className="modal-actions">
          <button type="button" className="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="button button-add" onClick={handleSubmit}>
            {task ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
