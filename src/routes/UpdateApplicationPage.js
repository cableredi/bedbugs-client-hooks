import React, { useContext } from "react";
import UpdateApplication from "../Components/Applications/ApplicationForms/UpdateApplication";
import BedbugsContext from "../BedbugsContext";

export default function AddApplicationPage(props) {
  const { applications, bugs } = useContext(BedbugsContext);

  const applicationItem = applications.find(
    (application) =>
      application.application_id === Number(props.match.params.application_id)
  );

  const bugItems = bugs.filter(
    (bug) => bug.application_id === Number(props.match.params.application_id)
  );

  return (
    <section className="section-page">
      <UpdateApplication application={applicationItem} bugs={bugItems} />
    </section>
  );
}
