/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withRouter } from 'react-router-dom';
import FilmLogo from '../../../tmdb-logo.png'

function RightMenu(props) {


  return (
    <div className="menu__logo-right">
      <img alt="logo" src={FilmLogo} style={{ height:'auto',width:'65px', top:'1rem'}}></img>
    </div>
  )
}

export default withRouter(RightMenu);

