import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { addNonProfit } from '../../store/actions';

class AddNonProfit extends React.Component {
  
  render() {
    return(
      <main className="add-nonprofit">
        <div className="nonprofit-card">
          <h2>Add a Non-Profit Organization</h2>
          <Formik
            initialValues={{
              website: '',
              description: '',
              address: '',
              city: '',
              zip: ''
            }}
            onSubmit={ (values, formikBag) => {
              formikBag.setSubmitting(true);
              console.log('submit');
              this.props.addNonProfit(values)
                .then(res => res && this.props.history.push("/search"))
                .then(formikBag.setSubmitting(false));
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
                          {errors.query && touched.query && (
                            <div className="error-msg">{errors.query}</div>
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
                    <button type="button" onClick={handleReset} disabled={isSubmitting}>
                      Clear Form
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                      Add Non-Profit
                    </button>
                  </div>
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
  error: state.query.error,
  isQuerying: state.query.isQuerying
})
export default connect( mapStateToProps, { addNonProfit } )(AddNonProfit);