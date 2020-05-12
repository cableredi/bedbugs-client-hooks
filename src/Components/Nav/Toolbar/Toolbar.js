import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import BedbugsLogo from '../../Images/bedbugs-logo.svg';
import TokenService from '../../../services/token-service';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

export default class Toolbar extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLogoutLink() {
    return (
      <>
        <li>
          <NavLink to='/applications'>
            Applications
          </NavLink>
        </li>
        <li>
          <NavLink to='/bugs/All'>
            Bugs
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            onClick={this.handleLogoutClick}
          >
            Logout
          </NavLink>
        </li>
      </>
    )
  };

  renderLoginLink() {
    return (
      <>
        <li>
          <NavLink to='/login'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/registration'>
            Register
          </NavLink>
        </li>
      </>
    )
  };

  render() {
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className='toolbar__toggle-button'>
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>

          <div className="toolbar__logo">
            <NavLink to='/'>
              <img src={BedbugsLogo} alt="Bedbugs logo" />
            </NavLink>
          </div>

          <div className="spacer" />

          <div className="toolbar__navigation-items">
            <ul>
              {
                TokenService.hasAuthToken()
                  ? this.renderLogoutLink()
                  : this.renderLoginLink()
              }
            </ul>
          </div>
        </nav>
      </header>
    )
  }
};