import React, { useContext } from "react";
import AddBug from "../Components/Bugs/BugForms/AddBug";
import BedbugsContext from "../BedbugsContext";

export default function AddBugPage() {
  const { applications } = useContext(BedbugsContext);

  const applicationItems = applications.map((appl) => ({
    application_id: appl.application_id,
    application_name: appl.application_name,
  }));

  return (
    <section className="section-page">
      <AddBug applications={applicationItems} />
    </section>
  );
}
