import React, { useContext } from "react";
import UpdateBug from "../Components/Bugs/BugForms/UpdateBug";
import BedbugsContext from "../BedbugsContext";

export default function UpdateBugPage(props) {
  const { applications, bugs } = useContext(BedbugsContext);

  const applicationItems = applications.map((appl) => ({
    application_id: appl.application_id,
    application_name: appl.application_name,
  }));

  const bug = bugs.find(
    (bug) => bug.bug_id === Number(props.match.params.bug_id)
  );

  return (
    <section className="section-page">
      <UpdateBug applications={applicationItems} bug={bug} />
    </section>
  );
}
