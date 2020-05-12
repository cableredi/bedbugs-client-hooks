import React from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import BlueBug from '../../Images/blue_bug.svg';
import RedBug from '../../Images/red_bug.svg';
import GreenBug from '../../Images/green_bug.svg';

function getBugIcon(status) {
  switch(status) {
    case 'Open':
      return <img src={RedBug} alt='Red Open Bug' className='bug__icons' />;
    case 'In-Progress':
      return <img src={BlueBug} alt='Blue Open Bug' className='bug__icons' />;
    case 'Closed':
      return <img src={GreenBug} alt='Green Open Bug' className='bug__icons' />;
    default:
      return <img src={RedBug} alt='Red Open Bug' className='bug__icons' />;
  }
}

export default function BugsSummary(props) {
  const isActive = (path, match, location) => !!(match || path === location.pathname);
  const { bugs, applications } = props;

  return (
    <>
      <div className="bugs-list__applicationName">
        <NavLink
          className={'bugs-list__bug-name'}
          to={`/updatebug/${bugs.bug_id}`}
          isActive={isActive.bind(this, `bug/${bugs.bug_id}`)}
        >
          {bugs.bug_name}
          {getBugIcon(bugs.status)}
        </NavLink>
      </div>
      <div className="bugs-list__ticket-number">
        <div className="bold">Ticket # </div>
        {bugs.ticket_number}
      </div>
      <div className="bugs-list__application">
        <div className="bold">Application: </div>
        {applications.find(appl => appl.application_id === bugs.application_id).application_name}
      </div>
      <div className="bugs-list__priority">
        <div className="bold">Priority: </div>
        {bugs.priority}
      </div>
      <div className="bugs-list__status">
        <div className="bold">Status: </div>
        {bugs.status}
      </div>
      <div className="bugs-list__reported-date">
        <div className="bold">Reported On: </div>
        <Moment format="MM/DD/YYYY">{bugs.reported_on}</Moment>
      </div>
    </>
  )
}