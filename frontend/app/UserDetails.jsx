import React from 'react';

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username,
      email: props.user.email,
      _id: props.user._id,
      message: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEMailChange = this.handleEMailChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  handleUsernameChange(e) {
    this.setState(...this.state, { username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState(...this.state, { password: e.target.value });
  }

  handleEMailChange(e) {
    this.setState(...this.state, { email: e.target.value });
  }

  handleUpdate() {
    this.sendData();
  }

  sendData() {
    fetch(`http://localhost:3000/Users/${this.props.user._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        authorization: (`JWT ${this.props.token}`),
      },
      body: JSON.stringify(this.state),
    }).then(response => response.json())
      .then((responseJson) => {
        this.setState(...this.state, { message: responseJson.message ? responseJson.message : '' });
        if (responseJson.user) {
          this.props.handleUserUpdate(responseJson.user);
        }
      })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
  }

  render() {
    return (
      <div className="container well" style={{ border: '1px solid', padding: '30px', width: '400px' }}>
        <div>
          <h2> Edit Info </h2>
        </div>
        <div>
          <span> Username: </span>
          <input className="form-control" placeholder="Username" onChange={this.handleUsernameChange} type="text" value={this.state.username} />
        </div>
        <div>
          <span> Email: </span>
          <input className="form-control" placeholder="Email" onChange={this.handleEMailChange} type="text" value={this.state.email} />
        </div>
        <button className="btn btn-success" style={{ 'margin-top': '5px' }} onClick={this.handleUpdate}>Update</button>
        {this.state.message.length ? <div>{this.state.message}</div> : ''}
      </div>
    );
  }
}
