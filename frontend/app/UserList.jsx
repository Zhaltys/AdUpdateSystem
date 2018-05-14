import React from 'react';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    return fetch('http://localhost:3000/users', {
      method: 'GET',
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          users: responseJson,
        }, () => {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const userList = this.state.users.map((user, index) => (
      <div className="container">
        <li className="list-group-item" key={index}>
          <h4>Username: {user.username}</h4>
          <h5>Email: {user.email}</h5>
          <div>ID: {user._id}</div>
        </li>
      </div>));
    return (
      <div>
        <div><h2>User list</h2></div>
        <ul className="list-group">{userList}</ul>
      </div>
    );
  }
}
