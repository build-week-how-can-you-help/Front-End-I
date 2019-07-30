import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

class NonProfitList extends React.Component {

  render() {
    return(
      <main>
        <div className="search-bar">
          <Formik
            initialValues={{
              query: ''
            }}
            onSubmit={ (values, formikBag) => {
              formikBag.setSubmitting(true);
              this.props.searchQuery(values)
                .then(res => res && this.props.history.push("/"));
            }}
            validationSchema={ Yup.object().shape({
              query: Yup.string()
                .required("Please enter a non-profit name")
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
          } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="query-container">
                  <label htmlFor="query">
                    Search
                  </label>
                  <input id="query" placeholder="Search for non-profit" type="text"
                    value={values.query}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.query && touched.query && 'error'
                    }
                  />
                  {errors.query && touched.query && (
                    <div className="error-msg">{errors.query}</div>
                  )}
                </div>
                <button type="submit" disabled={isSubmitting}>
                  New Search
                </button>
              </form>
            )
          }}
          </Formik>
          <button type="button" className="add-non-profit">Add Non-Profit</button>
        </div>
        <section className="search-results">
          {
            
          }
        </section>
      </main>
    )
  }
}


const mapStateToProps = state => ({
  error: state.error,
  
})
export default connect( mapStateToProps, {  } )(NonProfitList);