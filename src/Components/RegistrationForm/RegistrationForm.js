import React, { Component } from 'react';
import ValidateError from '../ValidateError/ValidateError';
import AuthApiService from '../../services/auth-api-service';

const Required = () => (
  <span className='form__required'>*</span>
);

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      user_name: {
        value: "",
        touched: false
      },
      password: {
        value: "",
        touched: false
      },
      confirm_password: {
        value: "",
        touched: false
      },
      first_name: {
        value: "",
        touched: false
      },
      last_name: {
        value: "",
        touched: false
      },
    };
  }

  /*********************/
  /* Update Form State */
  /*********************/
  updateUserName(user_name) {
    this.setState({
      user_name: {
        value: user_name,
        touched: true
      }
    });
  }

  updateFirstName(first_name) {
    this.setState({
      first_name: {
        value: first_name,
        touched: true
      }
    });
  }

  updateLastName(last_name) {
    this.setState({
      last_name: {
        value: last_name,
        touched: true
      }
    });
  }

  updatePassword(password) {
    this.setState({
      password: { value: password, touched: true }
    });
  }

  updateConfirmPassword(confirm_password) {
    this.setState({
      confirm_password: {
        value: confirm_password,
        touched: true
      }
    });
  }

  /*********************/
  /* Update Database   */
  /*********************/
  handleSubmit = e => {
    e.preventDefault();

    const { first_name, last_name, user_name, password } = e.target;

    this.setState({ error: null });

    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
    })
      .then(user => {
        first_name.value = ''
        last_name.value = ''
        user_name.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  /*********************/
  /* Validate Fields   */
  /*********************/
  validateUserName() {
    const userName = this.state.user_name.value.trim();

    if (userName.length === 0) {
      return { error: true, message: 'Username is Required' }
    } else if (userName.length < 3) {
      return { error: true, message: "Username must be at least 3 characters long" };
    }

    return { error: false, message: '' }
  }

  validateFirstName() {
    const firstName = this.state.first_name.value.trim();

    if (firstName.length === 0) {
      return { error: true, message: 'First Name is Required' }
    } else if (firstName.length < 3) {
      return { error: true, message: "First Name must be at least 3 characters long" };
    }

    return { error: false, message: '' }
  }

  validateLastName() {
    const lastName = this.state.last_name.value.trim();

    if (lastName.length === 0) {
      return { error: true, message: 'Last Name is Required' }
    } else if (lastName.length < 3) {
      return { error: true, message: "Last Name must be at least 3 characters long" };
    }

    return { error: false, message: '' }
  }

  validatePassword() {
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
    const newPassword = this.state.password.value.trim();

    if (newPassword.length === 0) {
      return { error: true, message: "Password is required" };
    } else if (newPassword.length < 8 || newPassword.length > 72) {
      return { error: true, message: "Password must be between 8 and 72 characters long" };
    } else if (newPassword.startsWith(' ') || newPassword.endsWith(' ')) {
      return { error: true, message: "Password must not start or end with empty spacesr" };
    } else if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(newPassword)) {
      return { error: true, message: 'Password must contain one upper case, lower case, number and special character' };
    };

    return { error: false, message: '' }
  }

  validateConfirmPassword() {
    const confirmPassword = this.state.confirm_password.value.trim();
    const newPassword = this.state.password.value.trim();

    if (confirmPassword !== newPassword) {
      return { error: true, message: "Passwords do not match" };
    }

    return { error: false, message: '' }
  }


  render() {
    const { error } = this.state;

    let registrationButtonDisabled = true;

    const UserNameError = this.validateUserName();
    const FirstNameError = this.validateFirstName();
    const LastNameError = this.validateLastName();
    const PasswordError = this.validatePassword();
    const ConfirmPasswordError = this.validateConfirmPassword();

    if (!UserNameError.error && !FirstNameError.error && !LastNameError.error && !PasswordError.error && !ConfirmPasswordError.error) {
      registrationButtonDisabled = false;
    }

    return (
      <form
        className="Registration__form"
        onSubmit={this.handleSubmit}
      >
        <ul className="flex-outer">
          <li role='alert'>
            {error && <p className='form__input-error'>{error}</p>}
          </li>

          <li>
            <label htmlFor="user_name">
              Username
                <Required />
            </label>
            <input
              type="text"
              className="user_name"
              name="user_name"
              id="user_name"
              onChange={e => this.updateUserName(e.target.value)}
            />
          </li>
          <li>{this.state.user_name.touched && <ValidateError message={UserNameError.message} />}</li>

          <li>
            <label htmlFor='password'>
              Password
                <Required />
            </label>
            <input
              name='password'
              type='password'
              required
              id='password'
              onChange={e => this.updatePassword(e.target.value)}
            />
          </li>
          <li>{this.state.password.touched && <ValidateError message={PasswordError.message} />}</li>

          <li>
            <label htmlFor='confirm_password'>
              Confirm Password
                <Required />
            </label>
            <input
              name='confirm_password'
              type='password'
              required
              id='confirm_password'
              onChange={e => this.updateConfirmPassword(e.target.value)}
            />
          </li>
          <li>{this.state.confirm_password.touched && <ValidateError message={ConfirmPasswordError.message} />}</li>

          <li>
            <label htmlFor='first_name'>
              First name
                <Required />
            </label>
            <input
              name='first_name'
              type='text'
              required
              id='first_name'
              onChange={e => this.updateFirstName(e.target.value)}
            />
          </li>
          <li>{this.state.first_name.touched && <ValidateError message={FirstNameError.message} />}</li>

          <li>
            <label htmlFor='last_name'>
              Last name
                <Required />
            </label>
            <input
              name='last_name'
              type='text'
              required
              id='last_name'
              onChange={e => this.updateLastName(e.target.value)}
            />
          </li>
          <li>{this.state.last_name.touched && <ValidateError message={LastNameError.message} />}</li>
        </ul>
        <div className='form__button-group'>
          <button
            className='button'
            type='submit'
            disabled={registrationButtonDisabled}
          >
            Register
          </button>
        </div>
      </form>
    )
  }
}