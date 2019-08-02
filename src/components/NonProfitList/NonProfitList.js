import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { searchQuery } from '../../store/actions';

import NonProfitItem from './NonProfitItem';

class NonProfitList extends React.Component {

  componentDidMount() {
    this.props.searchQuery('');
  }

  render() {
    // console.log('nonProfitList', this.props.nonProfitList);
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
                .then(res => res && this.props.history.push("/"))
                .then(formikBag.setSubmitting(false));
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
                  <input id="query" name="query" placeholder="Search for non-profit" type="text"
                    value={values.query}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.query && touched.query && 'error'
                    }
                  />
                  <i className="fas fa-map-marker-alt"></i>
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
          <button type="button" className="add-non-profit"><Link to="/addnonprofit">Add Non-Profit</Link></button>
        </div>
        <section className="search-results">
          { this.props.nonProfitList ? (
            this.props.nonProfitList.map( (nonProfit, i) => {
              return <NonProfitItem nonProfit={nonProfit} key={`nonprofit-${i.toString().padStart(2,"0")}`} />
            })
          ) : (
            <Loader type="Grid" color="#FFCE00" height={80} width={80} />
          )
          }
        </section>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  error: state.query.error,
  nonProfitList: state.query.nonProfitList,
  isQuerying: state.query.isQuerying
})
export default connect( mapStateToProps, { searchQuery } )(NonProfitList);