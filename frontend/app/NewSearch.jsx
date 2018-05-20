import React from 'react';
import { handledWebsites as websites } from '../../appConfig';

export default class NewSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      url: '',
      error: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount() {
  }
  handleTitleChange(e) {
    this.setState(...this.state, { title: e.target.value });
  }
  handleUrlChange(e) {
    this.setState(...this.state, { url: e.target.value });
  }

  handleSubmit() {
    if (this.state.title.length < 5) {
      this.setState(...this.state, {
        error: 'Title length must be atleast 5 symbols!',
      });
      return;
    }
    let canHandle = false;
    for (var site in websites) {
      console.log(site);
      if (this.state.url.includes(websites[site])) { canHandle = true; }
    }
    if (canHandle) {
      this.sendData();
    } else {
      console.log('Bad website');
      this.setState(...this.state, {
        error: `This website is not supported! \nSupported websites are: ${this.supportedSitesString()}`,
      });
    }
  }

  supportedSitesString() {
    let allSites = '';
    for (const site in websites) {
      allSites += `${websites[site]} `;
    }
    return allSites;
  }

  sendData() {
    fetch('http://localhost:3000/mysearches', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: (`JWT ${this.props.token}`),
      },
      body: JSON.stringify(this.state),

    })
      .then((data) => {
        console.log('Request success: ', data);
        this.props.modal('Search creation succesful!');
      })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
  }
  render() {
    return (
      <div className="container well" style={{ border: '1px solid', padding: '30px' }}>
        <div>
          <h2>New Search</h2>
        </div>
        <div className="input-group input-field">
          <span className="input-group-addon">
                Title:
          </span>
          <input className="form-control" placeholder="Title" style={{ width: '300px' }} onChange={this.handleTitleChange} type="text" value={this.state.title} />
        </div>
        <div className="input-group input-field">
          <span className="input-group-addon">
                URL:
          </span>
          <input className="form-control" placeholder="URL" onChange={this.handleUrlChange} type="text" value={this.state.url} />
        </div>
        {this.state.error.length > 0 ?
          <div className="error">
            {this.state.error}
          </div>
       : ''}
        <button className="btn btn-success" onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
}
