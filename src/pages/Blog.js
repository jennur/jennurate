import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BlogPost from '../components/BlogPost';
import BlogPic from '../components/BlogPic';

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "isSet": false,
      "blog": {}
    }
    this.renderBlog = this.renderBlog.bind(this);
  }
  render(){
    return(
      <div>
      <Link to="/">Go home</Link>
      <Header title={this.state.isSet ? this.state.blog.name : "Still loading?"}></Header>
      <section className="blog">
      { this.state.isSet ? this.renderBlog(this.state.blog.blogposts) : <BlogPost>Still loading content... </BlogPost>}
      
      </section>
      </div>
    );
  }
  renderBlog(blogposts) {
    let blogPosts = [];
    blogposts.forEach((post, key) => {
        if(post.imageUrl !== "" && post.post.length === 0) {
          blogPosts.push(<BlogPic key={key} src={post.imageUrl}
                 caption={post.date + " ~ " + post.imageCaption}/>);
        }
        if(post.post.length > 0) {
          blogPosts.push(<BlogPost key={key} date={post.date} imageUrl={post.imageUrl} imageCaption={post.imageCaption}>
            { post.post }</BlogPost>);
        }
    });
    return blogPosts;
  }
  componentDidMount() {
    fetch("blog.json")
    .then((res) => { return res.json(); })
    .then((data) => {
      this.setState({"blog": data });
      this.setState({"isSet": true });
      }
    )
  }
}

export default Blog;