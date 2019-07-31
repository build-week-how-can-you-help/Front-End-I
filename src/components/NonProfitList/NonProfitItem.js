import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CodeGenerator } from '@babel/generator';

const NonProfitItem = props => {
  const [ isEditing, setIsEditing ] = useState(false);

  const onChangeHandler = () => {
    setIsEditing( !isEditing );
  }

  // refresh current page
  // import createHistory from 'history/createBrowserHistory'
  // const history = createHistory();
  // history.go(0)

  return (
    <div className="nonprofit-card">
      <h2>{props.nonProfit.name}</h2>
      {isEditing ? (
        <>
          <Formik
            initialValues={{
              website: props.nonProfit.website,
              description: props.nonProfit.description,
              address: props.nonProfit.address,
              city: props.nonProfit.city,
              zip: props.nonProfit["zip code"]
            }}
            onSubmit={ (values, formikBag) => {
              formikBag.setSubmitting(true);
              props.updateNonProfit(values)
                .then(res => res && formikBag.setSubmitting(false), props.history.push("/search"));
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
                      <tr>
                        <td>Website:</td>
                        <td>
                          <input type="text" name="website"
                            value={values.website}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.website && touched.website && 'error'
                            }
                          />
                      </td>
                      </tr>
                      <tr>
                        <td>Description:</td>
                        <td>
                          <textarea type="text" name="description"
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
                      <tr>
                        <td>Address:</td>
                        <td>
                          <input type="text" name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.address && touched.address && 'error'
                            }
                          /><br />
                          <input type="text" name="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.city && touched.city && 'error'
                            }
                          />
                          <input type="text" name="zip"
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
            <tr>
              <td>Website:</td>
              <td><a href={props.nonProfit.website} titile={props.nonProfit.name}>{props.nonProfit.website}</a></td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{props.nonProfit.description}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{props.nonProfit.address}<br />{props.nonProfit.city}, {props.nonProfit["zip code"]}</td>
            </tr>
          </tbody>
        </table>
      )}
      {isEditing ? (
        <span onClick={onChangeHandler} className="edit">cancel</span>
      ) : (
        <span onClick={onChangeHandler} className="edit">edit</span>
      )
      }
    </div>
  )
}

export default NonProfitItem;