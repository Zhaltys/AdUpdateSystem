import React from 'react';
import UserList from './UserList';
import UserRegister from './UserRegister';
import Header from './Header';
import Login from './Login';
import MySearchesList from './MySearchesList';
import NewSearch from './NewSearch';
import SearchList from './SearchList';
import png from './people.png';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      window: [
        true, // home
        false, // Login
        false, // Register
        false, // users
        false, // ads
        false, // my ads
        false, // new ad
        false // search
      ],
      token: '',
      username: '',
      showModal: false,
      showMessageModal: false,
      message: '',
    };
    this.setActive = this.setActive.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.handleOK = this.handleOK.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleNewSearch = this.handleNewSearch.bind(this);
  }
  setLogin(t, n) {
    const defaultWindow = [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
    this.setState({
      ...this.state,
      token: t,
      username: n,
      window: defaultWindow,
      showModal: true,
    });
  }
  setActive(n) {
    const defaultWindow = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
    defaultWindow[n] = true;
    this.setState({
      ...this.state,
      window: defaultWindow,
    });
  }
  handleRegister(m) {
    this.setState({
      ...this.state,
      showMessageModal: true,
      message: m,
    });
    this.setActive(1);
  }
  handleNewSearch(m) {
    this.setState({
      ...this.state,
      showMessageModal: true,
      message: m,
    });
    this.setActive(0);
  }
  handleOK() {
    this.setState({
      ...this.state,
      showModal: false,
      showMessageModal: false,
    });
  }
  render() {
    return (
      <div>
        {this.state.showModal ?
          <div className="modal">
            <div className="modal-content">
              <p> You are now logged in as <h2>{this.state.username}</h2> </p>
              <button onClick={this.handleOK}>OK</button>
            </div>
          </div> : ''
        }
        {this.state.showMessageModal ?
          <div className="modal">
            <div className="modal-content">
              <p> {this.state.message} </p>
              <button onClick={this.handleOK}>OK</button>
            </div>
          </div> : ''
        }
        <Header
          window={this.state.window}
          setActive={this.setActive}
          username={this.state.username}
        />
        <div className="container">
        <div className="row">
        <div className="col-sm-1">
        </div>          
          {this.state.window[0] ? (
            <div className="col-auto" style={{width : '500px'}}>
              <h2>
                Ad Update Tracking System Prototype
              </h2>
              <div>
                <img src={png} alt="" />
              </div>
            </div>        
          ) : '' }
          {this.state.window[1] ? (<div className="col-auto"><Login setLogin={this.setLogin} /></div>) : '' }
          {this.state.window[2] ? (<div className="col-auto"><UserRegister register={this.handleRegister} /></div>) : ''}
          {this.state.window[3] ? (<div className="col-auto"><UserList /></div>) : '' }
          {this.state.window[5] ? (<div className="col-auto"><MySearchesList token={this.state.token} /></div>) : ''}
          {this.state.window[6] ? (<div className="col-auto"><NewSearch token={this.state.token} modal={this.handleNewSearch} /></div>) : ''}
          {this.state.window[7] ? (<div className="col-auto"><SearchList token={this.state.token} /></div>) : ''}
        </div>
        <div className="col-sm-1">
        </div>
      </div>
      </div>      
    );
  }
}