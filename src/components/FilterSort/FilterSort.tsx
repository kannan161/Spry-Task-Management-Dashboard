interface Props {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

const FilterSort = ({
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}: Props) => {
  return (
    <div className="filter-sort">
      <div className="select-wrap">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="select-wrap">
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="asc">Due Date Asc</option>
          <option value="desc">Due Date Desc</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
