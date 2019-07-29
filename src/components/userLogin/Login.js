import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { loginHandler } from '../../store/actions';


class Login extends React.Component {

  render() {
    return(
      <div>
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
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
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
                <div className="input-feedback">{errors.username}</div>
              )}
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
                <div className="input-feedback">{errors.password}</div>
              )}
  
              <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          );
        }}
          </Formik>
  
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.error,
  isLoggingIn: state.isLoggingIn,
  nonProfitList: state.nonProfitList
})
export default connect( mapStateToProps, { loginHandler } )(Login);