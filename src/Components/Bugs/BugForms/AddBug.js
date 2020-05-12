import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../Helpers/useForm";
import BedbugsContext from "../../../BedbugsContext";
import BugsApiService from "../../../services/bugs-api-service";
import ValidateError from "../../ValidateError/ValidateError";
import PropTypes from "prop-types";

const Required = () => <span className="form__required">*</span>;

export default function AddBug(props) {
  const { addBug, setError, bugs } = useContext(BedbugsContext);

  const stateSchema = {
    bug_name: { value: "", error: "" },
    application_id: { value: "", error: "" },
    ticket_number: { value: "", error: "" },
    priority: { value: "", error: "" },
    status: { value: "", error: "" },
    environment: { value: "", error: "" },
    notes: { value: "", error: "" },
    reported_by: { value: "", error: "" },
    reported_on: { value: new Date(), error: "" },
    expected_result: { value: "", error: "" },
    actual_result: { value: "", error: "" },
    steps: { value: "", error: "" },
    developer: { value: "", error: "" },
  };

  let history = useHistory();

  /*************************************************************/
  /* Add Bug to Database, update state, return to list of bugs */
  /*************************************************************/
  const onSubmitForm = (state) => {
    const bug = state;

    BugsApiService.postBug(bug)
      .then((data) => {
        addBug(data);
        history.push("/bugs");
      })
      .catch((error) => setError(error));
  };

  /************************/
  /* Handle Cancel Button */
  /************************/
  const handleClickCancel = () => {
    history.goBack();
  };

  /****************************/
  /* Validate Required Fields */
  /****************************/
  const findBugName = (value) => {
    bugs.find((bug) => bug.bug_name.toLowerCase() === value.toLowerCase());
  };

  const findTicketNumber = (value) => {
    bugs.find((bug) => bug.ticket_number.toLowerCase() === value.toLowerCase());
  };

  const stateValidatorSchema = {
    bug_name: {
      required: true,
      validator: {
        func: (value) =>
          value.length >= 3 && value.length <= 40 && !findBugName(value),
        error:
          "Application Name must be between 3 and 40 characters and not already taken",
      },
    },
    application_id: {
      required: true,
      validator: {
        func: (value) => value.length > 0,
        error: "Application ID is required",
      },
    },
    ticket_number: {
      required: true,
      validator: {
        func: (value) =>
          value.length >= 3 && value.length <= 20 && !findTicketNumber(value),
        error:
          "Ticket Number must be between 3 and 20 characters and not already taken",
      },
    },
    priority: {
      required: true,
      validator: {
        func: (value) => value.length > 0,
        error: "Priority is required",
      },
    },
    status: {
      required: true,
      validator: {
        func: (value) => value.length > 0,
        error: "Status is required",
      },
    },
    environment: {
      required: true,
      validator: {
        func: (value) => value.length > 0,
        error: "Environment is required",
      },
    },
    notes: {
      required: false,
    },
    reported_by: {
      required: false,
    },
    reported_on: {
      required: false,
    },
    expected_result: {
      required: false,
    },
    actual_result: {
      required: false,
    },
    steps: {
      required: false,
    },
    developer: {
      required: false,
    },
    developer_notes: {
      required: false,
    }
  };

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  const {
    bug_name,
    application_id,
    ticket_number,
    priority,
    status,
    environment,
    notes,
    reported_by,
    expected_result,
    actual_result,
    steps,
    developer,
  } = values;

  const applicationOptions = props.applications.map((application, i) => (
    <option value={application.application_id} key={i}>
      {application.application_name}
    </option>
  ));
  applicationOptions.sort();

  return (
    <section className="section-page">
      <h1>Add Bug</h1>

      <form className="Bug__form" onSubmit={handleOnSubmit}>
        <div className="required">* Required Fields</div>

        <ul className="flex-outer">
          <li>
            <label htmlFor="bug_name">
              Bug Name:
              <Required />
            </label>
            <input
              type="text"
              name="bug_name"
              id="bug_name"
              placeholder="Bug Name"
              maxLength="40"
              value={bug_name}
              onChange={handleOnChange}
            />
          </li>
          <li>
            {errors.bug_name && dirty.bug_name && (
              <ValidateError message={errors.bug_name} />
            )}
          </li>

          <li>
            <label htmlFor="application_id">
              Application:
              <Required />
            </label>
            <select
              id="application_id"
              name="application_id"
              className="formSelect"
              aria-label="Select an Application"
              aria-required="true"
              value={application_id}
              onChange={handleOnChange}
            >
              <option value="">Application... </option>
              {applicationOptions}
            </select>
          </li>
          <li>
            {errors.application_id && dirty.application_id && (
              <ValidateError message={errors.application_id} />
            )}
          </li>

          <li>
            <label htmlFor="ticket_number">
              Ticket Number:
              <Required />
            </label>
            <input
              type="text"
              name="ticket_number"
              id="ticket_number"
              placeholder="Ticket Number"
              maxLength="20"
              value={ticket_number}
              onChange={handleOnChange}
            />
          </li>
          <li>
            {errors.ticket_number && dirty.ticket_number && (
              <ValidateError message={errors.ticket_number} />
            )}
          </li>

          <li>
            <label htmlFor="priority">
              Priority:
              <Required />
            </label>
            <select
              id="priority"
              name="priority"
              className="formSelect"
              aria-label="Select a Priority"
              aria-required="true"
              onChange={handleOnChange}
              value={priority}
            >
              <option value="">Priority... </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </li>
          <li>
            {errors.priority && dirty.priority && (
              <ValidateError message={errors.priority} />
            )}
          </li>

          <li>
            <label htmlFor="status">
              Status:
              <Required />
            </label>
            <select
              id="status"
              name="status"
              className="formSelect"
              aria-label="Select a Status"
              aria-required="true"
              onChange={handleOnChange}
              value={status}
            >
              <option value="">Status... </option>
              <option value="Open">Open</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </li>
          <li>
            {errors.status && dirty.status && (
              <ValidateError message={errors.status} />
            )}
          </li>

          <li>
            <label htmlFor="environment">
              Environment:
              <Required />
            </label>
            <select
              id="environment"
              name="environment"
              className="formSelect"
              aria-label="Select a Environment"
              aria-required="true"
              value={environment}
              onChange={handleOnChange}
            >
              <option value="">Environment... </option>
              <option value="Test">Test</option>
              <option value="QA">QA</option>
              <option value="Pre-Production">Pre-Production</option>
              <option value="Production">Production</option>
            </select>
          </li>
          <li>
            {errors.environment && dirty.environment && (
              <ValidateError message={errors.environment} />
            )}
          </li>

          <li className="AddBug__form-textarea">
            <label htmlFor="notes">Notes:</label>
            <textarea
              name="notes"
              id="notes"
              value={notes}
              onChange={handleOnChange}
            />
          </li>

          <li>
            <label htmlFor="reported_by">Reported By:</label>
            <input
              type="text"
              name="reported_by"
              id="reported_by"
              placeholder="Reported By"
              value={reported_by}
              onChange={handleOnChange}
            />
          </li>

          <li>
            <label htmlFor="reported_on">Reported On:</label>
            <input
              type="text"
              name="reported_on"
              id="reported_on"
              value={new Date().toLocaleDateString()}
              readOnly
            />
          </li>

          <li className="AddBug__form-textarea">
            <label htmlFor="expected_result">Expected Result:</label>
            <textarea
              name="expected_result"
              id="expected_result"
              value={expected_result}
              onChange={handleOnChange}
            />
          </li>

          <li className="AddBug__form-textarea">
            <label htmlFor="actual_result">Actual Result:</label>
            <textarea
              name="actual_result"
              id="actual_result"
              value={actual_result}
              onChange={handleOnChange}
            />
          </li>

          <li className="UpdateBug__form-textarea">
            <label htmlFor="steps">Steps to Reproduce:</label>
            <textarea
              name="steps"
              id="steps"
              value={steps}
              onChange={handleOnChange}
            />
          </li>

          <li>
            <label htmlFor="developer">Developer Assigned To:</label>
            <input
              type="text"
              name="developer"
              id="developer"
              placeholder="Developer"
              value={developer}
              onChange={handleOnChange}
            />
          </li>

          <li className="form__button-group">
            <button type="button" onClick={() => handleClickCancel()}>
              Cancel
            </button>
            <button type="submit" disabled={disable}>
              Save
            </button>
          </li>
        </ul>
      </form>
    </section>
  );
}

AddBug.defaultProps = {
  applications: [],
};

AddBug.propTypes = {
  applications: PropTypes.array.isRequired,
};
