import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
              // props.updateNonProfit(values)
              //   .then(res => res && formikBag.setSubmitting(false), props.history.push("/search"));
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
                .min(5, "Zip must be at least 5 character long")
                .max(10, "You Zip is too long")
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
                          /><br />
                          <input type="text" name="city"
                            placeholder="City"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.city && touched.city && 'error'
                            }
                          />
                          <input type="text" name="zip"
                            placeholder="Zip"
                            value={values.zip}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.zip && touched.zip && 'error'
                            }
                          />
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

export default AddNonProfit;