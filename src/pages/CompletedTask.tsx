import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import EmptyState from '../components/EmptyState/EmptyState';

const CompletedTasks= () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks.filter(t => t.status === 'Completed'));

  return (
    <div className="container">
      <div className="page-header completed-page-header">
        <h1>Completed Tasks</h1>
      </div>
      {tasks.length > 0 ? (
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description || '-'}</td>
                <td>{task.status}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState message="No completed tasks yet" />
      )}
    </div>
  );
};

export default CompletedTasks;
