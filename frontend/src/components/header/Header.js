import React from 'react';
import './Header.css';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

function Header() {
  return (
    <div className="header">
      <CompareArrowsIcon className="header_icon" fontSize="large" />
      <h2>REDIRECT.IO</h2>
      <CompareArrowsIcon className="header_icon" fontSize="large" />
    </div>
  );
}

export default Header;
