import React from 'react';

export default class SearchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      searches: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    console.log(`JWT ${this.props.token}`);
    return fetch('http://localhost:3000/searches', {
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

  render() {
    if (!this.state.isLoading) {
      const searchList = this.state.searches.map((search, index) => (
        <div className="container">
          <li className="list-group-item" key={index}>
            <h3>{search.title}</h3>
            <div>Url: {search.url}</div>
            <div>User ID: {search.userId}</div>
          </li>
        </div>));
      return (
        <div>
          <div>
            <h2>
            Searches list
            </h2>
          </div>
          <ul className="list-group">{searchList}</ul>
          <button onClick={this.getData}>
          press to work
          </button>
        </div>
      );
    }
    return ('Loading');
  }
}
