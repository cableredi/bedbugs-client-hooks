import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import TokenService from '../../../services/token-service';
import IdleService from '../../../services/idle-service';
import BedbugsContext from '../../../BedbugsContext';

export default class SideDrawer extends Component {
  static contextType = BedbugsContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();

    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  }

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
    let drawerClasses = 'side-drawer';

    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    };

    return (
      <nav className={drawerClasses}>
        <ul>
          {
            TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()
          }
        </ul>
      </nav>
    );
  }
};