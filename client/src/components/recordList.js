import React, { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
 
// A single record entry
const Record = ({record, deleteRecord}) => (
 <tr>
   <td>{record.name}</td>
   <td><a href={record.url}>{record.url}</a></td>
   <td>
     <Link className="btn btn-link" to={`/edit/${record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         deleteRecord(record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
// The whole record table
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const quantity = useRef(0);
 
 // Get data from server, assign state
 useMemo(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
    //  setQuantity(records.length)
     quantity.current = records.length;
     console.log(quantity);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // Delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
   quantity.current = records.length;
 }
 
 // A list of records to put in the table.
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // The table where records are displayed.
 return (
   <div>
     <table className="table table-striped mx-3" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>URL</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}
