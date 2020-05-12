import React, { useContext } from "react";
import BedbugsContext from "../BedbugsContext";
import BugsList from "../Components/Bugs/BugsList/BugsList";

export default function BugsListPage(props) {
  const { applications, bugs } = useContext(BedbugsContext);
  const { status, application_id } = props.match.params;

  console.log("applications", applications);
  console.log("bugs", bugs);

  let getBugs = [];
  let getApplications = [];

  if (status === "Open" || status === "In-Progress" || status === "Closed") {
    getBugs = bugs.filter(
      (bug) =>
        bug.status === status && bug.application_id === Number(application_id)
    );
    getApplications = applications.filter(
      (application) => application.application_id === Number(application_id)
    );
  } else {
    getBugs = bugs;
    getApplications = applications;
  }

  //return <BugsList applications={applications} bugs={bugs} />;
  return <BugsList applications={getApplications} bugs={getBugs} />;
}
