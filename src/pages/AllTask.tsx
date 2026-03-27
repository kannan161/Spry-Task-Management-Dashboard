import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../store/taskSlice';
import type { RootState } from '../store';
import type { Task } from '../store/types';
import TaskSummary from '../components/TaskSummary/TaskSummary';
import FilterSort from '../components/FilterSort/FilterSort';
import TaskForm from '../components/TaskForm/TaskForm';

const AllTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = tasks
    .filter(t => !statusFilter || t.status === statusFilter)
    .sort((a, b) => sortOrder === 'asc'
      ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortOrder, rowsPerPage]);

  useEffect(() => {
    setCurrentPage(page => Math.min(page, totalPages));
  }, [totalPages]);

  const handleSubmit = (task: Task) => {
    editTask ? dispatch(updateTask(task)) : dispatch(addTask(task));
    setEditTask(null);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>All Tasks</h1>

        <div className="summary-row">
          <TaskSummary tasks={tasks} />
        </div>

        <div className="controls">
          <div className="controls-left">
            <FilterSort
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          <button
            className="button button-add"
            onClick={() => setShowForm(true)}
          >
            Add Task
          </button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="table-scroll">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description || '-'}</td>
                    <td>
                      <span className={`status ${task.status.toLowerCase().replace(' ', '')}`}>
                        {task.status}
                      </span>
                    </td>
                    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="button button-edit"
                        onClick={() => { setEditTask(task); setShowForm(true); }}
                        aria-label={`Edit ${task.title}`}
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="button button-delete"
                        onClick={() => dispatch(deleteTask(task.id))}
                        aria-label={`Delete ${task.title}`}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-footer">
            <div className="pagination-footer-left">
              <div className="rows-per-page">
                <span>Rows per page</span>
                <div className="select-wrap select-wrap-small">
                  <select
                    value={rowsPerPage}
                    onChange={e => setRowsPerPage(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pagination-footer-center pagination-info">
              {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filtered.length)} of {filtered.length}
            </div>

            <div className="pagination-footer-right">
              <button
                type="button"
                className="button pagination-button"
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="pagination-page">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="button pagination-button"
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Try adding a new task or changing filters.</p>
        </div>
      )}

      {showForm && (
        <TaskForm
          task={editTask || undefined}
          onSubmit={handleSubmit}
          onClose={() => { setShowForm(false); setEditTask(null); }}
        />
      )}
    </div>
  );
};

export default AllTasks;
