import React from "react";
import { NavLink } from "react-router-dom";
import BugsSummary from "../BugsSummary/BugsSummary";
import BlueBug from "../../Images/blue_bug.svg";
import RedBug from "../../Images/red_bug.svg";
import GreenBug from "../../Images/green_bug.svg";
import PropTypes from "prop-types";

export default function BugsList(props) {
  const { applications, bugs } = props;

  const bugItems = bugs.map((bug) => (
    <div key={bug.bug_id} className="bugs-list__bug">
      <BugsSummary bugs={bug} applications={applications} />
    </div> 
  ));

  return (
    <section className="section-page">
      <h1>Bugs Summary</h1>
      <div className="bug-directory">
        (
        <span className="bold">
          {"  "}Open:
          <img src={RedBug} alt="Red Open Bug" className="bug__icons-small" />
        </span>
        <span className="bold">
          In-Progress:
          <img src={BlueBug} alt="Blue Open Bug" className="bug__icons-small" />
        </span>
        <span className="bold">
          Closed:
          <img
            src={GreenBug}
            alt="Green Open Bug"
            className="bug__icons-small"
          />
        </span>
        )
      </div>
      <div className="bugs">
        <div className="bugs-list">{bugItems}</div>
        <NavLink to="/addBug">
          <div className="button">Add Bug</div>
        </NavLink>
      </div>
    </section>
  );
}

BugsList.defaultProps = {
  bugs: [],
  applications: [],
};

BugsList.propTypes = {
  bugs: PropTypes.array.isRequired,
  applications: PropTypes.array.isRequired,
};
