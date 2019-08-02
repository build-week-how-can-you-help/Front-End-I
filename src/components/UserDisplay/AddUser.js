import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { addNewUser } from '../../store/actions';

class AddUser extends React.Component {

  render() {
    return(
      <main className="display-user">
        <div className="user-card add-user">
          <h2>Add New User</h2>
          <Formik
            initialValues={{
              username: '',
              password: '',
              userRoles: [{
                role: {
                  name: "user"
                }
              }]
            }}
            onSubmit={ (value, formikBag) => {
              formikBag.setSubmitting(true);
              this.props.addNewUser(value)
                .then(res => res && formikBag.setSubmitting(false));
            }}
            validationSchema={ Yup.object().shape({
              username: Yup.string()
                .min(2, "User name must be at least 2 characters long")
                .max(15, "Username cannot be longer than 15 characters")
                .required("Username is required"),
              password: Yup.string()
                .min(6, "Password must be at least 6 chracters long")
                .max(20, "Password cannot be more than 20 characters long")
                .required("Password is required")
            })}
          >
            {props => {
              const{
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return(
                <form onSubmit={handleSubmit}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          Username:
                        </td>
                        <td>
                          <input name="username" type="text"
                            placeholder="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.username && touched.username && 'error'
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Password:</td>
                        <td>
                          <input name="password" type="password"
                            placeholder="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.password && touched.password && 'error'
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="submit" disabled={isSubmitting}>Save</button>
                </form>
              )
            }}
          </Formik>
        </div> 
      </main>
    )
  }
}

const mapStateToProps = state => ({
  error: state.getUsers.error,
  newUser: state.getUsers.newUser,
  isAdding: state.getUsers.isAdding
})
export default connect( mapStateToProps, { addNewUser } )(AddUser);