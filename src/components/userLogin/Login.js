import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { loginHandler } from '../../store/actions';


class Login extends React.Component {

  render() {
    return(
      <main className="login">
        <div className="login-container">
          <h1>Login</h1>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={ (values, formikBag) => {
              formikBag.setSubmitting(true);
              this.props.loginHandler(values)
                .then(res => res && this.props.history.push("/home"));
            }}
            validationSchema={ Yup.object().shape({
              username: Yup.string()
                .min(2, "must be at least two characters")
                .max(15, "cannot be more than 15 characters")
                .required("Please enter your Username"),
              password: Yup.string()
                .max(20, "Password cannot be longer than 20 characters")
                .required("Please enter your password")
            }) }
            >
            {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <label htmlFor="username">
                    Username
                  </label>
                  <input id="username" placeholder="Username" type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.username && touched.username && 'error'
                    }
                  />
                  {errors.username && touched.username && (
                    <div className="error-msg">{errors.username}</div>
                  )}
                </div>
                <div className="input-container">
                  <label htmlFor="password">
                    Password
                  </label>
                  <input id="password" placeholder="Password" type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password && 'error'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="error-msg">{errors.password}</div>
                  )}
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
              </form>
            );
          }}
          </Formik>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  error: state.error,
  isLoggingIn: state.isLoggingIn,
  nonProfitList: state.nonProfitList
})
export default connect( mapStateToProps, { loginHandler } )(Login);