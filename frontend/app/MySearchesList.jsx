import React from 'react';

export default class MySearchesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      searches: [],
    };
    this.getData = this.getData.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    console.log(`JWT ${this.props.token}`);
    return fetch('http://localhost:3000/mysearches', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: (`JWT ${this.props.token}`),
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          searches: responseJson,
        }, () => {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleDelete(index) {
    this.deleteData(index);
    this.getData();
  }
  handleUpdate(index) {
    this.sendData(index);
  }
  sendData(index) {
    fetch(`http://localhost:3000/mysearches/${this.state.searches[index]._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        authorization: (`JWT ${this.props.token}`),
      },
      body: JSON.stringify(this.state.searches[index]),

    }).then((data) => {
      console.log('Request success: ', data.json());
    })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
  }
  handleTitleChange(title, index) {
    const tempSearches = this.state.searches;
    tempSearches[index].title = title;
    this.setState(...this.state, { searches: tempSearches });
  }
  handleUrlChange(url, index) {
    const tempSearches = this.state.searches;
    tempSearches[index].url = url;
    this.setState(...this.state, { searches: tempSearches });
  }
  deleteData(index) {
    fetch(`http://localhost:3000/mysearches/${this.state.searches[index]._id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        authorization: (`JWT ${this.props.token}`),
      },
    }).then((data) => {
      console.log('Request success: ', data);
    })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
  }
  render() {
    if (!this.state.isLoading) {
      const searchList = this.state.searches.map((search, index) => (
        <div className="container">
          <li className="list-group-item" key={index}>
            <div class='input-group input-field'>
              <span className='input-group-addon'>
                Title:
              </span>
              <input class="form-control" onChange={e => this.handleTitleChange(e.target.value, index)} type="text" value={search.title} />
            </div>
            <div class='input-group input-field'>
              <span className='input-group-addon'>
                URL:
              </span>
              <input class="form-control" onChange={e => this.handleUrlChange(e.target.value, index)} type="text" value={search.url} />
            </div>
            <button className='btn btn-warning input-field' onClick={() => this.handleUpdate(index)}>Update</button>
            <button className='btn btn-danger input-field' onClick={() => this.handleDelete(index)}>Delete</button>
          </li>
        </div>));
      return (
        <div>
          <div><h2>My Searches</h2></div>
          <ul className="list-group">{searchList}</ul>
          <button onClick={this.getData}>Refresh</button>
        </div>);
    }
    return ('Loading');
  }
}
