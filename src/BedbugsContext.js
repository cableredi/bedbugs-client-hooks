import React, { Component } from "react";

const BedbugsContext = React.createContext({
  applications: [],
  setApplications: () => {},
  addApplication: () => {},
  updateApplication: () => {},
  bugs: [],
  setBugs: () => {},
  addBug: () => {},
  updateBug: () => {},
  addSteps: () => {},
  updateSteps: () => {},
});

export default BedbugsContext;

export class BedbugsProvider extends Component {
  state = {
    error: null,
    applications: [],
    bugs: [],
  };

  resetState = () => {
    this.setState({})
  };

  setError = (error) => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setApplications = (applications) => {
    this.setState({
      applications,
    });
  };

  setBugs = (bugs) => {
    this.setState({
      bugs,
    });
  };

  addApplication = (application) => {
    this.setState({
      applications: [...this.state.applications, application],
    });
  };

  addBug = (bug) => {
    this.setState({
      bugs: [...this.state.bugs, bug],
    });
  };

  updateApplication = (updatedApplication) => {
    this.setState({
      applications: this.state.applications.map((appl) =>
        appl.application_id !== updatedApplication.application_id
          ? appl
          : updatedApplication
      ),
    });
  };

  updateBug = (updatedBug) => {
    this.setState({
      bugs: this.state.bugs.map((bug) =>
        bug.bug_id !== updatedBug.bug_id ? bug : updatedBug
      ),
    });
  };

  deleteApplication = (application_id) => {
    const newApplications = this.state.applications.filter(
      (application) => application.application_id !== Number(application_id)
    );
    this.setState({
      applications: newApplications,
    });
  };

  deleteBug = (bug_id) => {
    const newBugs = this.state.bugs.filter(
      (bug) => bug.bug_id !== Number(bug_id)
    );
    this.setState({
      bugs: newBugs,
    });
  };

  render() {
    const value = {
      resetState: this.resetState,
      applications: this.state.applications,
      setApplications: this.setApplications,
      addApplication: this.addApplication,
      updateApplication: this.updateApplication,
      deleteApplication: this.deleteApplication,
      bugs: this.state.bugs,
      setBugs: this.setBugs,
      addBug: this.addBug,
      updateBug: this.updateBug,
      deleteBug: this.deleteBug,
      error: this.state.error,
      setError: this.setError,
    };

    return (
      <BedbugsContext.Provider value={value}>
        {this.props.children}
      </BedbugsContext.Provider>
    );
  }
}
