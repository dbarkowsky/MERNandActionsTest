import React from "react";
import { NavLink } from "react-router-dom";
// Bootstrap import
import "bootstrap/dist/css/bootstrap.css";
 
// Navbar component
export default function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-sm navbar-light bg-light mx-3">
       <NavLink className="navbar-brand" to="/">
        <h1>My Favourites</h1>
       </NavLink>
       <NavLink className="nav-link" to="/create">
          Add Favourite
       </NavLink>
     </nav>
   </div>
 );
}
