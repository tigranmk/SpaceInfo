 import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import "../styles/navmob.css"
import {
  Link
} from "react-router-dom";

 const NavMobile = () => {

const openNav = () =>  document.getElementById("myNav").style.height = "100%";
const closeNav = () => document.getElementById("myNav").style.height = "0%";

			return (
			<>
      <div className="open_button">
      <MenuIcon onClick={openNav} />
      </div>
			<div id="myNav" className="overlay">
  <CloseIcon className="closebtn" onClick={closeNav} />
  <div className="overlay-content" onClick={closeNav}>
    <Link to="/rockets">Rockets</Link>
      <Link to="/launches">Launches</Link>
      <Link to="/dragons">Dragons</Link>
          
  </div>
</div>
</>
			 )
}

export default NavMobile;

