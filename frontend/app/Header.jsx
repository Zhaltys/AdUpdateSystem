import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(n) {
    this.props.setActive(n);
  }
  render() {
    const active = 'btn btn-primary header-button';
    const inactive = 'btn btn-default header-button';
    const w = this.props.window;
    return (
      <div className="header">
      <span className="btn-group">        
        <ul>
          <li onClick={() => this.handleClick(0)} className={w[0] == true ? active : inactive}>Home</li>
          {this.props.username === '' ? <li onClick={() => this.handleClick(1)} className={w[1] == true ? active : inactive}>Login</li> : ''}
          {this.props.username === '' ? <li onClick={() => this.handleClick(2)} className={w[2] == true ? active : inactive}>Register</li> : ''}
          {this.props.username !== '' ? <li onClick={() => this.handleClick(3)} className={w[3] == true ? active : inactive}>View Users</li> : ''}
          {this.props.username !== '' ? <li onClick={() => this.handleClick(5)} className={w[5] == true ? active : inactive}>My Searches</li> : ''}
          {this.props.username !== '' ? <li onClick={() => this.handleClick(6)} className={w[6] == true ? active : inactive}>New Search</li> : ''}
          {this.props.username !== '' ? <li onClick={() => this.handleClick(7)} className={w[7] == true ? active : inactive}>Searches</li> : ''}
        </ul>
        </span>
      <span>
        {this.props.username !== '' ? <li className='btn btn-default header-button'  style={{ float: 'right', color: 'gray' }}>user: {this.props.username}</li> : ''}
      </span>
      </div>
    );
  }
}
