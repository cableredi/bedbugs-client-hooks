import React, { useContext } from "react";
import BedbugsContext from "../BedbugsContext";
import BugsList from "../Components/Bugs/BugsList/BugsList";

export default function BugsListPage() {
  const { applications, bugs } = useContext(BedbugsContext);

  return <BugsList applications={applications} bugs={bugs} />;
}
