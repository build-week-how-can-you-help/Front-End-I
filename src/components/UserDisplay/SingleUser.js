import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { updateUserInfo, getCurrentUserInfo } from '../../store/actions';

class SingleUser extends React.Component {
  state = {
    isEditing: false
  }

  componentDidMount() {
    // console.log('CDM');
    this.props.getCurrentUserInfo();
  }

  onClickHandler = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    // console.log(this.props);
    return(
      <div className="user-card">
        { this.state.isEditing ? (
          <Formik
            initialValues={{
              username: this.props.userInfo.username,
              rolename: this.props.userInfo.userRoles[0].role.name,
              id:       this.props.userInfo.userid
            }}
            onSubmit={ (value, formikBag) => {
              formikBag.setSubmitting(true);
              const userArr = {
                admin: "ROLE_ADMIN",
                user: "ROLE_USER",
                data: "ROLE_DATA"
              }
              console.log('role name',userArr[value.rolename])
              value.authority = userArr[value.rolename];
              this.props.updateUserInfo(value);
            }}
            validationSchema={ Yup.object().shape({
              username: Yup.string()
                .required("Username is required")
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
                          username:
                        </td>
                        <td>
                          <input name="username" type="text"
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
                        <td>role:</td>
                        <td>
                          <select name="rolename"
                            value={values.rolename}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.rolename && touched.rolename && 'error'
                            }
                          >
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                            <option value="data">data</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="submit" disabled={isSubmitting}>Save</button>
                </form>
              )
            }}
          </Formik>
        ) : (
          <table>
            <tbody>
              <tr>
                <td>
                  username:
                </td>
                <td>
                  {this.props.userInfo.username}
                </td>
              </tr>
              <tr>
                <td>role:</td>
                <td>
                  {this.props.userInfo.userRoles[0].role.name}
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <span onClick={this.onClickHandler} className="edit">
          { this.state.isEditing ? 
            'cancel'
          :
            'edit'
          }
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.getUsers.error,
  currentUserInfo: state.getUsers.currentUserInfo,
  isGetting: state.getUsers.isGetting
})
export default connect( mapStateToProps, { updateUserInfo, getCurrentUserInfo } )(SingleUser);