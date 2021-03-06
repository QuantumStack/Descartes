import React from 'react';
import PropTypes from 'prop-types';
import NewPassword from './NewPassword';
import { passwordStrengthThreshold } from '../config';
import DashboardHeader from './DashboardHeader';
import PaymentHistoryTable from './PaymentHistoryTable';

class AccountSettings extends React.Component {
  static propTypes = {
    navbar: PropTypes.node.isRequired,
    isLoading: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    showEmail: PropTypes.bool.isRequired,
    changePassword: PropTypes.bool,
    oldPassword: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    mismatch: PropTypes.bool.isRequired,
    strength: PropTypes.number.isRequired,
    payments: PropTypes.arrayOf(PropTypes.object).isRequired,
    editUser: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    changePassword: false,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      editUser, firstName, lastName, oldPassword, password, mismatch, strength,
    } = this.props;
    const delta = {};
    if (firstName) delta.firstName = firstName;
    if (lastName) delta.lastName = lastName;
    if (oldPassword && password && !mismatch && strength > passwordStrengthThreshold) {
      delta.oldPassword = oldPassword;
      delta.password = password;
    }
    editUser(delta);
  }

  render() {
    const {
      navbar,
      isLoading,
      firstName,
      lastName,
      email,
      showEmail,
      changePassword,
      oldPassword,
      password,
      password2,
      mismatch,
      strength,
      payments,
      handleChange,
    } = this.props;

    return (
      <div>
        {navbar}
        <div className="uk-section uk-section-xsmall">
          <div className="uk-container uk-container-xsmall">
            <form className="uk-form-horizontal" onSubmit={this.handleSubmit} data-uk-scrollspy="target: .uk-form-icon; cls: uk-animation-scale-up; delay: 100">
              <DashboardHeader>
                <h4>My Account</h4>
              </DashboardHeader>
              <div className="uk-margin">
                <label className="uk-form-label">Full Name</label>
                <div className="uk-form-controls">
                  <div className="uk-grid-small uk-child-width-1-2" data-uk-grid>
                    <div>
                      <div className="uk-inline uk-width-expand">
                        <span className="uk-form-icon" data-uk-icon="icon: user" />
                        <input className="uk-input" type="text" name="firstName" value={firstName} onChange={handleChange} required />
                      </div>
                    </div>
                    <div>
                      <div className="uk-inline uk-width-expand">
                        <input className="uk-input" type="text" name="lastName" value={lastName} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-margin">
                <label className="uk-form-label">Email</label>
                <div className="uk-form-controls">
                  <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" data-uk-icon="icon: mail" />
                    <input className="uk-input" type="text" name="name" value={email} disabled />
                  </div>
                  <div className="uk-margin-small-top">
                    <label>
                      <input className="uk-checkbox" type="checkbox" name="showEmail" checked={showEmail} onChange={handleChange} />
                      <span> Show email for courses I instruct</span>
                    </label>
                  </div>
                </div>
              </div>
              <h4 className="uk-margin-small">
                <a className="uk-text-emphasis" data-uk-toggle="target: #account-change-password; animation: uk-animation-slide-top-small">
                  <span>Change Password</span>
                  <span className="uk-margin-small-left" data-uk-icon="plus" />
                </a>
              </h4>
              <div id="account-change-password" hidden={!changePassword}>
                <div className="uk-margin uk-margin-small-bottom">
                  <label className="uk-form-label">Old Password</label>
                  <div className="uk-form-controls">
                    <div className="uk-inline uk-width-expand">
                      <span className="uk-form-icon" data-uk-icon="icon: history" />
                      <input className="uk-input" type="password" name="oldPassword" value={oldPassword} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <NewPassword isChange password={password} password2={password2} strength={strength} mismatch={mismatch} onChange={handleChange} />
              </div>
              <div className="uk-flex uk-flex-right">
                <button className="uk-button uk-button-primary" type="submit">
                  {isLoading ? (
                    <div key="loading" data-uk-spinner="ratio: 0.5" />
                  ) : (
                    <div key="account-change">
                      <span>Save </span>
                      <span data-uk-scrollspy="cls: uk-animation-slide-left-small; delay: 600" data-uk-icon="icon: check" />
                    </div>
                  )}
                </button>
              </div>
            </form>
            <h4 className="uk-margin-small-bottom">Payment History</h4>
            <PaymentHistoryTable payments={payments} />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default AccountSettings;
