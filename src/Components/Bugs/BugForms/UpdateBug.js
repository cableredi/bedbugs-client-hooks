import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../Helpers/useForm";
import BedbugsContext from "../../../BedbugsContext";
import ValidateError from "../../ValidateError/ValidateError";
import BugsApiService from "../../../services/bugs-api-service";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Required = () => <span className="form__required">*</span>;

export default function UpdateBug(props) {
  const { updateBug, deleteBug, setError, bugs } = useContext(BedbugsContext);

  const stateSchema = {
    bug_id: { value: props.bug.bug_id || "", error: "" },
    bug_name: { value: props.bug.bug_name || "", error: "" },
    application_id: { value: props.bug.application_id || "", error: "" },
    ticket_number: { value: props.bug.ticket_number || "", error: "" },
    priority: { value: props.bug.priority || "", error: "" },
    status: { value: props.bug.status || "", error: "" },
    environment: { value: props.bug.environment || "", error: "" },
    notes: { value: props.bug.notes || "", error: "" },
    reported_by: { value: props.bug.reported_by || "", error: "" },
    reported_on: { value: props.bug.reported_on || "", error: "" },
    expected_result: { value: props.bug.expected_result || "", error: "" },
    actual_result: { value: props.bug.actual_result || "", error: "" },
    steps: { value: props.bug.steps || "", error: "" },
    developer: { value: props.bug.developer || "", error: "" },
    last_updated: {value: props.last_updated || new Date(), error: ''}
  };

  let history = useHistory();

  const [deleteError, setDeleteError] = useState({
    value: false,
    message: "",
  });

  /************************/
  /* Handle Delete Button */
  /************************/
  const handleDelete = () => {
    BugsApiService.deleteBug(props.bug.bug_id)
      .then((data) => {
        deleteBug(props.bug.bug_id);
        history.push("/bugs");
      })
      .catch((error) => setDeleteError({ value: true, message: error }));
  };

  /******************/
  /* Confirm Delete */
  /******************/
  const confirmDelete = (e) => {
    confirmAlert({
      title: "Are you sure...",
      message: "...You wish to delete this bug?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(),
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
    });
  };

  /****************************************************************/
  /* Update Bug to Database, update state, return to list of bugs */
  /****************************************************************/
  const onSubmitForm = (state) => {
    const bug = state;
    setError(null);

    BugsApiService.patchApplication(bug)
      .then((data) => {
        updateBug(bug);
        history.push("/bugs");
      })
      .catch((error) => setError(error));
  };

  /************************/
  /* Handle Cancel button */
  /************************/
  const handleClickCancel = () => {
    history.push("/bugs");
  };

  /************************/
  /* Validate Form Fields */
  /************************/
  const findBugName = (value) => {
    bugs.find((bug) => bug.bug_name.toLowerCase() === value.toLowerCase());
  };

  const findTicketNumber = (value) => {
    bugs.find((bug) => bug.ticket_number.toLowerCase() === value.toLowerCase());
  };

  const stateValidatorSchema = {
    bug_id: {
      required: true,
    },
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
    },
    last_updated: {
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
    bug_id,
    bug_name,
    application_id,
    ticket_number,
    priority,
    status,
    environment,
    notes,
    reported_by,
    reported_on,
    expected_result,
    actual_result,
    steps,
    developer,
    developer_notes,
    last_updated,
  } = values;

  const applicationOptions = props.applications.map((application, i) => (
    <option value={application.application_id} key={i}>
      {application.application_name}
    </option>
  ));

  return (
    <section className="section-page">
      <h1>Update Bug</h1>
      <form className="Bug__form" onSubmit={handleOnSubmit}>
        <div className="required">* Required Fields</div>

        <ul className="flex-outer">
          <li>
            <input type="hidden" name="bug_id" value={bug_id} />
            {deleteError.value && (
              <ValidateError
                message={deleteError.message}
                class="form__input-error-large"
              />
            )}
          </li>

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
              required
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
              required
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
              value={priority}
              onChange={handleOnChange}
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
              value={status}
              onChange={handleOnChange}
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

          <li className="UpdateBug__form-textarea">
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
              value={new Date(reported_on).toLocaleDateString() || ""}
              readOnly
            />
          </li>

          <li className="UpdateBug__form-textarea">
            <label htmlFor="expected_result">Expected Result:</label>
            <textarea
              name="expected_result"
              id="expected_result"
              value={expected_result}
              onChange={handleOnChange}
            />
          </li>

          <li className="UpdateBug__form-textarea">
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
            <label htmlFor="developer">Developer:</label>
            <input
              type="text"
              name="developer"
              id="developer"
              placeholder="Developer"
              value={developer}
              onChange={handleOnChange}
            />
          </li>

          <li className="UpdateBug__form-textarea">
            <label htmlFor="developer_notes">Developer Notes:</label>
            <textarea
              name="developer_notes"
              id="developer_notes"
              value={developer_notes}
              onChange={handleOnChange}
            />
          </li>

          <li>
            <label htmlFor="last_updated">Last Updated:</label>
            <input
              type="text"
              name="last_updated"
              id="last_updated"
              placeholder="Last Updated"
              value={new Date(last_updated).toLocaleDateString()}
              onChange={handleOnChange}
              readOnly
            />
          </li>

          <li className="form__button-group">
            <button type="button" onClick={() => handleClickCancel()}>
              Cancel
            </button>{" "}
            <button type="submit" disabled={disable}>
              Save
            </button>{" "}
            <button onClick={(e) => confirmDelete(e)}>Delete</button>
          </li>
        </ul>
      </form>
    </section>
  );
}

UpdateBug.defaultProps = {
  bug: {},
  applications: [],
  steps: [],
};

UpdateBug.propTypes = {
  bug: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
};
