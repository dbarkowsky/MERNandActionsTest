import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   url: "",
 });
 const navigate = useNavigate();
 
 // Update state properties with whole object
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // Handle submission
 async function onSubmit(e) {
   e.preventDefault();
 
   // Collect all fields from form
   const newPerson = { ...form };
 
   // Send to server
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", url: ""});
   navigate("/");
 }
 
 // Create record form
 return (
   <div className="mx-3">
     <h3>Create New Favourite</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group my-2">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group my-2">
         <label htmlFor="url">URL</label>
         <input
           type="text"
           className="form-control"
           id="url"
           value={form.url}
           onChange={(e) => updateForm({ url: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <input
           type="submit"
           value="Create Favourite"
           className="btn btn-primary my-2"
         />
       </div>
     </form>
   </div>
 );
}
