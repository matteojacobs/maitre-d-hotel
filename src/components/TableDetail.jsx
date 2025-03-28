
const TableStatus = () => {
    return (
        <button>{tablestatus}</button>
    );
}







const TableDetail = ({ number }) => (
  <div className="table-details">
    <h4>Table {number}</h4>
    <TableStatus />
    {/* Add more details here as needed */}
  </div>
);

export default TableDetail;
