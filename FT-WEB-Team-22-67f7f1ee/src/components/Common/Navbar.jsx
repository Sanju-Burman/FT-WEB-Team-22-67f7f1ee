// src/components/Common/Navbar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../Common/navbar.css"

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Gram Panchayat Voting
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/elections" className={`nav-link ${location.pathname === '/elections' ? 'active' : ''}`}>
              Elections
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/results" className={`nav-link ${location.pathname === '/results' ? 'active' : ''}`}>
              Results
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}>
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


















// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const location = useLocation();
  
//   return (
//     <nav className="navbar">
//       <div className="navbar-container container">
//         <Link to="/" className="navbar-brand">
//           Logistics
//         </Link>
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/elections" className={`nav-link ${location.pathname === '/elections' ? 'active' : ''}`}>
//               Elections
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/results" className={`nav-link ${location.pathname === '/results' ? 'active' : ''}`}>
//               Results
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/admin" className={`nav-link ${location.pathname.includes('/admin') ? 'active' : ''}`}>
//               Admin
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;