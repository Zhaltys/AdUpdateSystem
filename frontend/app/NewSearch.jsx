import React from 'react';

export default class NewSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      url: ''
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
    this.sendData();
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
        <div class="input-group input-field">
          <span class="input-group-addon">
                Title:
          </span>
          <input className="form-control" placeholder="Title" style={{'width': '300px'}} onChange={this.handleTitleChange} type="text" value={this.state.title} />
        </div>
        <div class="input-group input-field">
          <span class="input-group-addon">
                URL:
          </span>
          <input className="form-control" placeholder="URL" onChange={this.handleUrlChange} type="text" value={this.state.url} />
        </div>
        <button className="btn btn-success" onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
}
