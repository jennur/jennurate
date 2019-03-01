import React from 'react';
import Footer from '../components/Footer';
import FlashyHeader from '../components/FlashyHeader';

class Home extends React.Component {

  render(){
    return(
        <div>
        <div id="bg"></div>
        <FlashyHeader />
        <Footer />
        </div>
    );
  }
}

export default Home; 