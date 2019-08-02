import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { updateNonProfit, removeNonProfit } from '../../store/actions';

class NonProfitItem extends React.Component {
  state = {
    isEditing: false
  }

  onChangeHandler = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  deleteNonprofit = () => {
    console.log('delete');
    this.props.removeNonProfit()
      .then( res => res && this.setState({ isEditing: !this.state.isEditing }));
  }

  // refresh current page
  // import createHistory from 'history/createBrowserHistory'
  // const history = createHistory();
  // history.go(0)

  render() {
    // console.log(props)
    return (
      <div className="nonprofit-card">
        <h2>{this.props.nonProfit.name}</h2>
        {this.state.isEditing ? (
          <>
            <Formik
              initialValues={{
                website: this.props.nonProfit.website,
                description: this.props.nonProfit.description,
                address: this.props.nonProfit.address,
                city: this.props.nonProfit.city,
                zip: this.props.nonProfit["zip code"]
              }}
              onSubmit={ (values, formikBag) => {
                formikBag.setSubmitting(true);
                this.props.updateNonProfit(values)
                  .then(res => res && this.props.history.push("/search"))
                  .then( formikBag.setSubmitting(false));
              }}
              validationSchema={ Yup.object().shape({
                website: Yup.string()
                  .url(),
                description: Yup.string()
                  .required("description is required"),
                address: Yup.string(),
                city: Yup.string()
                  .required("City is required"),
                zip: Yup.number()
                  .required("Zip code is required")
              })}
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
                  handleReset
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <table>
                      <tbody>
                        <tr className="mobile"><td>Website:</td></tr>
                        <tr>
                          <td className="desktop">Website:</td>
                          <td>
                            <input type="text" name="website"
                              placeholder="Website"
                              value={values.website}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.website && touched.website && 'error'
                              }
                            />
                            {errors.website && touched.website && (
                              <div className="error-msg">{errors.website}</div>
                            )}
                        </td>
                        </tr>
                        <tr className="mobile"><td>Description:</td></tr>
                        <tr>
                          <td className="desktop">Description:</td>
                          <td>
                            <textarea type="text" name="description"
                              placeholder="Type organization info here."
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.description && touched.description && 'error'
                              }
                            >
                            {errors.description && touched.description && (
                              <div className="error-msg">{errors.description}</div>
                            )}
                            </textarea>
                          </td>
                        </tr>
                        <tr className="mobile"><td>Address:</td></tr>
                        <tr>
                          <td className="desktop">Address:</td>
                          <td>
                            <input type="text" name="address"
                              placeholder="Address"
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.address && touched.address && 'error'
                              }
                            />
                            {errors.address && touched.address && (
                              <div className="error-msg">{errors.address}</div>
                            )}<br />
                            <input type="text" name="city"
                              placeholder="City"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.city && touched.city && 'error'
                              }
                            />
                            {errors.city && touched.city && (
                              <div className="error-msg">{errors.city}</div>
                            )}
                            <input type="text" name="zip"
                              placeholder="Zip"
                              value={values.zip}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.zip && touched.zip && 'error'
                              }
                            />
                            {errors.zip && touched.zip && (
                              <div className="error-msg">{errors.zip}</div>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="buttons">
                      <button type="button" onClick={this.deleteNonprofit} disabled={isSubmitting} className="delete">
                        Delete
                      </button>
                      <button type="button" onClick={handleReset} disabled={isSubmitting}>
                        Reset
                      </button>
                      <button type="submit" disabled={isSubmitting}>
                        Save
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </>
        ) : (
          <table>
            <tbody>
                <tr className="mobile"><td>Website:</td></tr>
              <tr>
                <td className="desktop">Website:</td>
                <td><a href={this.props.nonProfit.website} titile={this.props.nonProfit.name}>{this.props.nonProfit.website}</a></td>
              </tr>
                <tr className="mobile"><td>Description:</td></tr>
              <tr>
                <td className="desktop">Description:</td>
                <td>{this.props.nonProfit.description}</td>
              </tr>
                <tr className="mobile"><td>Address:</td></tr>
              <tr>
                <td className="desktop">Address:</td>
                <td>{this.props.nonProfit.address}<br />{this.props.nonProfit.city}, {this.props.nonProfit["zip code"]}</td>
              </tr>
            </tbody>
          </table>
        )}
        {this.state.isEditing ? (
          <span onClick={this.onChangeHandler} className="edit">cancel</span>
        ) : (
          <span onClick={this.onChangeHandler} className="edit">edit</span>
        )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.query.error,
  isQuerying: state.query.isQuerying
})
export default connect( mapStateToProps, { updateNonProfit, removeNonProfit } )(NonProfitItem);