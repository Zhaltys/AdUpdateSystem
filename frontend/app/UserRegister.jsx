import React from 'react';

export default class UserRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      message:''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEMailChange = this.handleEMailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount() {
  }

  handleUsernameChange(e) {
    this.setState(...this.state, { username: e.target.value });
  }
  handleEMailChange(e) {
    this.setState(...this.state, { email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState(...this.state, { password: e.target.value });
  }

  handleRegister(e) {
    this.sendData();
  }

  sendData() {
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state),

    })
      .then((data) => {
        console.log('Request success: ', data);
        if (data.status==409)
        {
          this.setState(...this.state, { message: 'User already exists!' });
        }
        else
        {
          this.props.register('Success. You can now log in!');
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
          <h2>User registration</h2>
        </div>
        <div>
          <span>
            Please enter your Username:
          </span>
          <input className="form-control" placeholder="Username" onChange={this.handleUsernameChange} type="text" value={this.state.username} />
        </div>
        <div>
          <span>
            Please enter your E-mail:
          </span>
          <input className="form-control" placeholder="E-Mail" onChange={this.handleEMailChange} type="text" value={this.state.email} />
        </div>
        <div>
          <span>
            Please enter your password:
          </span>
          <input className="form-control" placeholder="Password" onChange={this.handlePasswordChange} type="password" value={this.state.password} />
        </div>
        <button className="btn btn-success" style={{ 'margin-top': '5px' }} onClick={this.handleRegister}>Register</button>
        {this.state.message.length ? <div>{this.state.message}</div> : ''}
      </div>
    );
  }
}
