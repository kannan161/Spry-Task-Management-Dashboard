import type { Task } from '../../store/types';

interface Props {
  tasks: Task[];
}

const TaskSummary = ({ tasks }: Props) => {
  const count = (status: Task['status']) => tasks.filter(t => t.status === status).length;

  const stats = [
    { label: 'Pending', value: count('Pending'), className: 'pending' },
    { label: 'In Progress', value: count('In Progress'), className: 'inprogress' },
    { label: 'Completed', value: count('Completed'), className: 'completed' },
  ];

  return (
    <div className="stats-grid">
      {stats.map(stat => (
        <div key={stat.label} className={`stat-card ${stat.className}`}>
          <div className="stat-meta">
            <span className="stat-label">{stat.label}</span>
            <strong className="stat-value">{stat.value}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSummary;
