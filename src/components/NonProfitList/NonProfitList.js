import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import NonProfitItem from './NonProfitItem';

class NonProfitList extends React.Component {

  render() {
    console.log(this.props.NonProfitList);
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
            this.props.NonProfitList.map( (nonProfit, i) => {
              return <NonProfitItem nonProfit={nonProfit} key={`nonprofit-${i.toString().padStart(2,"0")}`} />
            })
          }
        </section>
      </main>
    )
  }
}

const defaultVar = [
  {
    "name": "Feed the Children, Inc.",
    "description": "One of America's most effective charities providing food, clothing, medical care, education, and emergency relief to children in the United States and overseas since 1979.",
    "website": "http://www.feedthechildren.org",
    "address": "333 N. Meridian Ave",
    "city": "Oklahoma City",
    "zip code": 73107
  },
  {
    "name": "Rude Ranch Animal Rescue",
    "description": "A no-kill organization dedicated to providing refuge to abandoned, abused and homeless dogs and cats until they are placed in permanent homes.",
    "website": "http://www.ruderanch.org",
    "address": "3200 Ivy Way",
    "city": "Harwood",
    "zip code": 20776
  },
  {
    "name": "Maryland Zoo in Baltimore (The)",
    "description": "Educational programs and naturalistic exhibits provide visitors with educational recreation activities and further understanding of the urgent need to conserve and protect wildlife and wetlands.",
    "website": "http://www.marylandzoo.org",
    "address": "1876 Mansion House Drive, Druid Hill Park",
    "city": "Baltimore",
    "zip code": 21217
  },
  {
    "name": "Christopher Reeve Foundation",
    "description": "The Reeve Foundation is dedicated to curing spinal cord injury by funding innovative research and improving the quality of life for people living with paralysis.",
    "website": "http://www.christopherreeve.org",
    "address": "636 Morris Turnpike, Suite 3A",
    "city": "Short Hills",
    "zip code": 7078
  },
  {
    "name": "Institute of Notre Dame",
    "description": "A college-preparatory school for young women, rooted in the values of the Catholic faith and the educational vision of the School Sisters.",
    "website": "http://www.indofind.org",
    "address": "901 Aisquith Street",
    "city": "Baltimore",
    "zip code": 21202
  }
]

const mapStateToProps = state => ({
  error: state.error,
  NonProfitList: defaultVar
})
export default connect( mapStateToProps, {  } )(NonProfitList);