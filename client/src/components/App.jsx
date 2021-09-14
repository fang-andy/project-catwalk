import React from 'react';
import RatingsAndReviews from './ratings&reviews/RatingsAndReviews';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productID: '40348', // example product id
      metaData: {},
    }

    this.fetchMeta = this.fetchMeta.bind(this);
  }

  // Get meta reviews
  fetchMeta() {
    const { productID } = this.state;
    axios.get(`/reviews/meta/?product_id=${productID}`)
      .then((result) => {
        this.setState({
          metaData: result.data
        });
      })
      .catch((error) => {
        console.log('Error with fetchMeta ' + error);
      })
  }

  render() {
    return (
      <RatingsAndReviews
        productID={this.state.productID}
        metaData={this.state.metaData}
      />
    )
  }
}

export default App;