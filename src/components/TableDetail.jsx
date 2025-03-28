
const TableStatus = ({onStatusChange}) => {
    return (
        <button onClick={onStatusChange}>Change status</button>
    );
}







const TableDetail = ({ number, onStatusChange }) => (
  <div className="table-details">
    <h4>Table {number}</h4>
    <TableStatus onStatusChange={onStatusChange}/>
    {/* Add more details here as needed */}
  </div>
);

export default TableDetail;
