import React from 'react';
import { NavLink } from 'react-router-dom';
import BlueBug from '../../Images/blue_bug.svg';
import RedBug from '../../Images/red_bug.svg';
import GreenBug from '../../Images/green_bug.svg';

export default function ApplicationsSummary(props) {
  const { applications, bugs } = props;
  const isActive = (path, match, location) => !!(match || path === location.pathname);
  const getBugs = bugs.filter( (bug) => bug.application_id === applications.application_id);

  return (
    <>
      <NavLink
        className={'applications-list__name'}
        to={`/updateapplication/${applications.application_id}`}
        isActive={isActive.bind(this, `application/${applications.application_id}`)}
      >
        {applications.application_name}
      </NavLink>

      <div className="applications-list__counts">

        <span className="bold">
          <img src={RedBug} alt='Red Open Bug' className="bug__icons" />
          Open bugs: 
        </span> 
        <span className="applications-list__counts-number">
        {
          getBugs
            .reduce((sum, { status }) => status === 'Open' ? sum + 1 : sum, 0)
        }
        </span>
      </div>

      <div className="applications-list__counts">
        <span className="bold">
          <img src={BlueBug} alt='Blue In-Progress Bug' className="bug__icons" />
          In-Progress bugs: 
        </span>
        <span className="applications-list__counts-number">
        {
          getBugs
            .reduce((sum, { status }) => status === 'In-Progress' ? sum + 1 : sum, 0)
        }
        </span>
      </div>
      
      <div className="applications-list__counts">
        <span className="bold">
          <img src={GreenBug} alt='Green In-Progress Bug' className="bug__icons" />
          Closed bugs: 
        </span>
        <span className="applications-list__counts-number">
        {
          getBugs
            .reduce((sum, { status }) => status === 'Closed' ? sum + 1 : sum, 0)
        }
        </span>
      </div>
    </>
  )
}