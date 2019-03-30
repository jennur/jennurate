import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

class Home extends React.Component {

  render(){
    return(
        <section className="blog">
          <Link to="/">Go home</Link>
          <Header title="About me" />
          <BlogPost>
             
          </BlogPost>
        </section>
    );
  }
  componentDidMount () {
  }
}

export default Home; 