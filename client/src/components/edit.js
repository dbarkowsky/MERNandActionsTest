import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   url: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 // Retrieve existing data for record
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // Update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // Submit changes to server
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     name: form.name,
     url: form.url,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       "Content-Type": "application/json"
     },
   })
    .catch((err) => {
        console.log(err);
    });
 
   navigate("/");
 }
 
 // Edit record form
 return (
   <div className="mx-3">
     <h3>Update Favourite</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="url">URL: </label>
         <input
           type="text"
           className="form-control"
           id="url"
           value={form.url}
           onChange={(e) => updateForm({ url: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Favourite"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
