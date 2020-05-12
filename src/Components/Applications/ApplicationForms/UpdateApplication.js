import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../Helpers/useForm";
import BedbugsContext from "../../../BedbugsContext";
import ValidateError from "../../ValidateError/ValidateError";
import ApplicationsApiService from "../../../services/applications-api-service";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const { isWebUri } = require("valid-url");

const Required = () => <span className="form__required">*</span>;

export default function UpdateApplication(props) {
  const { updateApplication, deleteApplication, setError } = useContext(
    BedbugsContext
  );

  const stateSchema = {
    application_id: {
      value: props.application.application_id || "",
      error: "",
    },
    application_name: {
      value: props.application.application_name || "",
      error: "",
    },
    application_url: {
      value: props.application.application_url || "",
      error: "",
    },
    repository_prod: {
      value: props.application.repository_prod || "",
      error: "",
    },
    repository_test: {
      value: props.application.repository_test || "",
      error: "",
    },
    database_prod: { value: props.application.database_prod || "", error: "" },
    database_test: { value: props.application.database_test || "", error: "" },
  };

  let history = useHistory();

  const [ deleteError, setDeleteError ] = useState({
    value: false,
    message: "",
  });

  /************************************************************************************/
  /*   Update Application to Database, update state, return to list of applications   */
  /************************************************************************************/
  const onSubmitForm = (state) => {
    const application = state;
    setError(null);

    ApplicationsApiService.patchApplication(application)
      .then((data) => {
        updateApplication(application);
        history.push("/applications");
      })
      .catch((error) => setError(error));
  };

  /*****************************/
  /* Handle form Cancel button */
  /*****************************/
  const handleClickCancel = () => {
    history.push("/applications");
  };

  /*****************************/
  /* Handle form Delete Button */
  /*****************************/
  const handleDelete = () => {
    const openBugs = props.bugs.find(
      (bug) => bug.status === "Open" || bug.status === "In-Progress"
    );
    if (openBugs) {
      confirmAlert({
        title: "Unable to Delete",
        message: "There are active bugs associated with this application.",
        buttons: [
          {
            label: "OK",
            onClick: () => "",
          },
        ],
      });
      return;
    }

    ApplicationsApiService.deleteApplication(application_id)
      .then((data) => {
        deleteApplication(application_id);
        history.push("/applications");
      })
      .catch((error) => setDeleteError({ value: true, message: error }));
  };

  /*********************************/
  /* Validate form required fields */
  /*********************************/
  const stateValidatorSchema = {
    application_name: {
      required: true,
      validator: {
        func: (value) => value.length >= 3 && value.length <= 40,
        error: "Application Name must be between 3 and 40 characters",
      },
    },
    application_url: {
      required: true,
      validator: {
        func: (value) => value.length > 0 && isWebUri(value),
        error: "Application URL is required and must be a valid URL",
      },
    },
    repository_prod: {
      required: false,
    },
    repository_test: {
      required: false,
    },
    database_prod: {
      required: false,
    },
    database_test: {
      required: false,
    },
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
    application_id,
    application_name,
    application_url,
    repository_prod,
    repository_test,
    database_test,
    database_prod,
  } = values;

  return (
    <section className="section-page">
      <h1>Update Application</h1>

      <form className="Application__form" onSubmit={handleOnSubmit}>
        <div className="required">* Required Fields</div>

        <ul className="flex-outer">
          <li>
            <input type="hidden" name="application_id" value={application_id} />
            {deleteError.value && (
              <ValidateError
                message={deleteError.message}
                class="form__input-error-large"
              />
            )}
          </li>

          <li>
            <label htmlFor="application_name">
              Application Name <Required />
            </label>
            <input
              type="text"
              name="application_name"
              id="application_name"
              placeholder="Application Name"
              maxLength="40"
              value={application_name}
              onChange={handleOnChange}
            />
          </li>
          <li>
            {errors.application_name && dirty.application_name && (
              <ValidateError message={errors.application_name} />
            )}
          </li>

          <li>
            <label htmlFor="application_url">
              Application URL <Required />
            </label>
            <input
              type="text"
              name="application_url"
              id="application_url"
              placeholder="Application URL"
              value={application_url}
              onChange={handleOnChange}
            />
          </li>
          <li>
            {errors.application_name && dirty.application_name && (
              <ValidateError message={errors.application_name} />
            )}
          </li>

          <li>
            <label htmlFor="repository_prod">Production Repository</label>
            <input
              type="text"
              name="repository_prod"
              id="repository_prod"
              placeholder="Production Repository"
              value={repository_prod}
              onChange={handleOnChange}
            />
          </li>

          <li>
            <label htmlFor="repository_test">Test Repository</label>
            <input
              type="text"
              name="repository_test"
              id="repository_test"
              placeholder="Test Repository"
              value={repository_test}
              onChange={handleOnChange}
            />
          </li>

          <li>
            <label htmlFor="database_prod">Production Database</label>
            <input
              type="text"
              name="database_prod"
              id="database_prod"
              placeholder="Production Database"
              value={database_prod}
              onChange={handleOnChange}
            />
          </li>

          <li>
            <label htmlFor="database_test">Test Database</label>
            <input
              type="text"
              name="database_test"
              id="database_test"
              placeholder="Test Database"
              value={database_test}
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
            <button type="button" onClick={() => handleDelete()}>
              Delete
            </button>
          </li>
        </ul>
      </form>
    </section>
  );
}

UpdateApplication.defaultProps = {
  application: {},
  bugs: [],
};

UpdateApplication.propTypes = {
  application: PropTypes.object.isRequired,
  bugs: PropTypes.array.isRequired,
};
