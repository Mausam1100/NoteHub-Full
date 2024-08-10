import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faXmark  } from '@fortawesome/free-solid-svg-icons'
import NoteAlert from "../context/notes/NoteAlert";

const Navbar = () => {
  const location = useLocation(); // gives the path of current url
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem('token')
    navigate('/login')
    setMenuShow("hidden")
  }

  const [menuShow, setMenuShow] = useState("hidden")

  const openMenu = () => {
    setMenuShow("inline-block")
  }

  const closeMenu = () => {
    setMenuShow("hidden")
  }

  const context = useContext(NoteAlert)
  const {alertTime} = context

  const homeOpen = () => {
    setMenuShow("hidden")
    if (!localStorage.getItem('token')) {
      alertTime(true, "Fail", "Login or Sign In First", "bg-red-300")
    }
  }

  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location])

  return (
    <div className="w-full bg-slate-800 py-3.5">
      <div className="setWidth flex items-cente space-x-9 justify-between">
        <div className="flex items-center gap-x-6">
          <div className="w-100%">
            <h1 className="font-semibold text-2xl text-white w-100% flex items-center">
              <Link to="/"><code>{"<NoteHub/>"}</code></Link>
            </h1>
            <ul className="flex items-center flex-col gap-y-4 mt-3 md:hidden">
              <li className={`font-medium text-base text-white ${menuShow}`}>
                <Link to="/" onClick={homeOpen}>Home</Link>
              </li>
              <li className={`font-medium text-base text-white ${menuShow}`}>
                <Link to="/about" onClick={closeMenu}>About</Link>
              </li>
              {!localStorage.getItem('token')? <div className={`flex items-center flex-col gap-y-4 ${menuShow}`}>
              <Link to="/login" className='bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 font-medium' onClick={closeMenu}>Login</Link>
              <Link to="/signup" className='bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-slate-200 font-medium' onClick={closeMenu}>Sign up</Link>
              </div>: <button className={`bg-white text-blue-600 px-3 py-1 rounded-xl hover:bg-slate-200 font-medium ${menuShow}`} onClick={handleClick}>Logout</button>}
            </ul>
          </div>

          <ul className="flex items-center space-x-6">
            <li className={`font-medium text-base ${location.pathname === "/" ? "active" : "text-gray-300"} hover:text-white hidden md:inline-block`}>
              <Link to="/" onClick={homeOpen}>Home</Link>
            </li>
            <li className={`font-medium text-base ${location.pathname === "/about" ? "active" : "text-gray-300"} hover:text-white hidden md:inline-block`}>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        
        <div>
          {menuShow==="hidden" ? <FontAwesomeIcon icon={faBars} color="white" className="md:hidden cursor-pointer" onClick={openMenu}/>:
          <FontAwesomeIcon icon={faXmark} color="white" className="md:hidden" onClick={closeMenu} />}
          {!localStorage.getItem('token')? <div className="flex items-center gap-x-4">
            <Link to="/login" className='bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 font-medium hidden md:inline-block'>Login</Link>
            <Link to="/signup" className='bg-white text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 font-medium hidden md:inline-block'>Sign up</Link>
          </div>: <button className='bg-white text-blue-600 px-3 py-1.5 rounded-xl hover:bg-slate-200 font-medium hidden md:inline-block' onClick={handleClick}>Logout</button>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
