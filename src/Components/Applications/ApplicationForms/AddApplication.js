import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../Helpers/useForm";
import BedbugsContext from "../../../BedbugsContext";
import ValidateError from "../../ValidateError/ValidateError";
import ApplicationsApiService from "../../../services/applications-api-service";
const { isWebUri } = require("valid-url");

const Required = () => <span className="form__required">*</span>;

export default function AddApplication() {
  const { addApplication, setError } = useContext(BedbugsContext);

  const stateSchema = {
    application_name: { value: "", error: "" },
    application_url: { value: "", error: "" },
    repository_prod: { value: "", error: "" },
    repository_test: { value: "", error: "" },
    database_prod: { value: "", error: "" },
    database_test: { value: "", error: "" },
  };
  
  let history = useHistory();

  /*****************************************************************************/
  /* Add Application to Database, update state, return to list of applications */
  /*****************************************************************************/
  const onSubmitForm = (state) => {
    const application = state;

    ApplicationsApiService.postApplication(application)
      .then((data) => {
        addApplication(data);
        history.push("/applications");
      })
      .catch((error) => setError(error));
  };

  /*****************/
  /* Handle Cancel */
  /*****************/
  const handleClickCancel = () => {
    history.push("/applications");
  };

  /************************/
  /* Validate Form Fields */
  /************************/
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
    application_name,
    application_url,
    repository_prod,
    repository_test,
    database_test,
    database_prod,
  } = values;

  return (
    <>
      <h1>Add Application</h1>
      <form className="Application__form" onSubmit={handleOnSubmit}>
        <div className="required">* Required Fields</div>

        <ul className="flex-outer">
          <li>
            <label htmlFor="application_name">
              Application Name:
              <Required />
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
              Application URL:
              <Required />
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
            {errors.application_url && dirty.application_url && (
              <ValidateError message={errors.application_url} />
            )}
          </li>

          <li>
            <label htmlFor="repository_prod">Production Repository:</label>
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
            <label htmlFor="repository_test">Test Repository:</label>
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
            <label htmlFor="database_prod">Production Database:</label>
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
            <label htmlFor="database_test">Test Database:</label>
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
          </li>
        </ul>
      </form>
    </>
  );
}
