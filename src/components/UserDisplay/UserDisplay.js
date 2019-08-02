import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { getAllUsers } from '../../store/actions';

import SingleUser from './SingleUser';

class UserDisplay extends React.Component {
  state = {
    sortedList: [],
    query: ''
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  searchUserList = event => {
    let query = event.target.value;
    let sortedList = this.props.userList.filter( item => {
      let username = item.username.toLowerCase();
      return username.indexOf( query.toLowerCase() ) !== -1;
    });
    this.setState({
      sortedList: sortedList
    });
  }

  render() {
    return(
      <main className="display-user">
      <div className="search-bar">
        <input name="search" type="text" placeholder="Enter username to search for" onChange={this.searchUserList} />
        <button><Link to="/adduser">Add User</Link></button>
      </div>
      <section>
         {this.state.sortedList.length > 0 ? (
           this.state.sortedList.map( (user, i) => {
             return <SingleUser userInfo={user} key={`user-${i.toString().padStart(2,"0")}`} />
           })
          ) : this.props.userList ? (
           this.props.userList.map( (user, i) => {
             return <SingleUser userInfo={user} key={`user-${i.toString().padStart(2,"0")}`} />
           })
         ) : (
           <div className="loading">
             <Loader type="Grid" color="#FFCE00" height={80} width={80} />
           </div>
         )}
      </section>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  error: state.getUsers.error,
  userList: state.getUsers.userList,
  isGetting: state.getUsers.isGetting
})
export default connect( mapStateToProps, { getAllUsers } )(UserDisplay);