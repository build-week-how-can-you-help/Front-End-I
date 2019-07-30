import React from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../store/actions';
import Loader from 'react-loader-spinner';

class Dashboard extends React.Component {
  componentDidMount() {
    // get user list
    this.props.getAllUsers()
      .then( res => console.log('GOT USERS'));
    // get non-profit
    
  }

  render() {
    console.log('users',this.props.userList);
    let sortedArr = [];
    return (
      <main className="dashboard">
        <section>
          <div className="users">
            <h2>New Users</h2>
            <ul>
              {(
                this.props.userList ? (
                  sortedArr = this.props.userList.sort( function(a,b) {
                    return a.id - b.id
                  }),
                  sortedArr = sortedArr.splice(0,5),
                  sortedArr.map( (item, i) => {
                    console.log("item",item);
                    return (
                      <li key={`user-${i.toString().padStart(2,"0")}`}>
                        <dl>
                          <dt><strong>username:</strong></dt>
                          <dd>{item.username}</dd>
                          <dt><strong>Role:</strong></dt>
                          <dd>{item.userRoles[0].role.name}</dd>
                        </dl>
                      </li>
                    )
                  })
                ) : (
                  <Loader type="Grid" color="#FFCE00" height={80} width={80} />
                )
              )}
            </ul>
          </div>
          <div className="non-profits">
            <h2>New Non-Profits</h2>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  error: state.getUsers.error,
  userList: state.getUsers.userList,
  isGetting: state.getUsers.isGetting
});
export default connect( mapStateToProps, { getAllUsers } )(Dashboard);