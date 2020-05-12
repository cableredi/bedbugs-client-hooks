import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import BedbugsContext from "../BedbugsContext";
import ApplicationsSummary from "../Components/Applications/ApplicationsSummary/ApplicationsSummary";

export default function ApplicationsListPage() {
  const { applications, bugs, error } = useContext(BedbugsContext);

  const applicationItems = applications.map((appl) => (
    <div className="applications-list" key={appl.application_id}>
      <ApplicationsSummary applications={appl} bugs={bugs} />
    </div>
  ));

  return (
    <section className="section-page">
      {!error ? (
        <>
          <h1>Applications Summary</h1>
          <div className="applications">
            <div>{applicationItems}</div>
            <NavLink to="/addApplication">
              <div className="button">Add Application</div>
            </NavLink>
          </div>
        </>
      ) : (
        <div>There was an error: {error}</div>
      )}
    </section>
  );
}
