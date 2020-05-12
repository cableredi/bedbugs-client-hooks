import React from "react";
import { useHistory } from "react-router-dom";
import RegistrationForm from "../Components/RegistrationForm/RegistrationForm";

export default function RegistrationPage() {
  const history = useHistory();

  const handleRegistrationSuccess = () => {
    history.push("/login");
  };

  return (
    <section className="section-page">
      <h2>Register</h2>
      <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
    </section>
  );
}
