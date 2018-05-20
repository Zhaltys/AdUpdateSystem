import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  handleUsernameChange(e) {
    this.setState(...this.state, { username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState(...this.state, { password: e.target.value });
  }

  handleLogin() {
    this.sendData();
  }

  sendData() {
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(response => response.json())
      .then((responseJson) => {
        if (responseJson.token !== undefined) { this.props.setLogin(responseJson.token, responseJson.user); }
        if (responseJson.message) {
          this.setState(...this.state, { message: responseJson.message });
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
          <h2> Login </h2>
        </div>
        <div>
          <span> Username: </span>
          <input className="form-control" placeholder="Username" onChange={this.handleUsernameChange} type="text" value={this.state.username} />
        </div>
        <div>
          <span> Password: </span>
          <input className="form-control" placeholder="Password" onChange={this.handlePasswordChange} type="password" value={this.state.password} />
        </div>
        <button className="btn btn-success" style={{ 'margin-top': '5px' }} onClick={this.handleLogin}>Login</button>
        {this.state.message.length ? <div>{this.state.message}</div> : ''}
      </div>
    );
  }
}
