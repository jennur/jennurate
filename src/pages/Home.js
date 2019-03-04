import React from 'react';
import FlashyHeader from '../components/FlashyHeader';
import bg from '../scripts/starBackground';

class Home extends React.Component {

  render(){
    return(
        <section>
        <div id="bg"></div>
        <FlashyHeader />
        </section>
    );
  }
  componentDidMount () {
    bg();
  }
}

export default Home; 