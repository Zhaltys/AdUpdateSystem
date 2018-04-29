import React from 'react';

export default class AdList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ads: [],
      searchId: props.searchId
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    console.log(`JWT ${this.props.token}`);
    return fetch('http://localhost:3000/Ads/'+ this.state.searchId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: (`JWT ${this.props.token}`),
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({ ...this.state,
          ads: responseJson
        }, () => {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const adList = this.state.ads.map((ad, index) => (
      <span className="container">
        <li className="list-group-item" key={index}>
          <div className="ad-title"> {ad.title}</div>
          <div className="ad-url">Url: 
          <a href={ad.url}>{ad.url}
          </a>
          </div>          
        <img className="ad-picture" src={ad.imageUrl}/> 
        </li>
      </span>));
    return (
      <div>
        <ul className="list-group ad-list">{adList}</ul>
      </div>
    );
  }
}
