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
    console.log(blogposts);
    blogposts.forEach(post => {
        if(post.imageUrl !== "") {
          blogPosts.push(<BlogPic src={post.imageUrl}
                 caption={post.date + " ~ " + post.imageCaption}/>);
        }
        if(post.post.length > 0) {
          blogPosts.push(<BlogPost date={post.date}>
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
      console.log(data)
      }
    )
  }
}

export default Blog;



/*Hey everyone, it's officially spring in Norway <span role="img" aria-label="Emojis">☀️🌿🇳🇴</span>, I just got my sunscreen <span role="img" aria-label="Emojis">🧴</span>, I'm ready for summer and here's my new blogish! 
          When I think of blogs I imagine all these fancy cookies with glaze on them <span role="img" aria-label="Emojis">🧁</span>, 
          pink lipsticks <span role="img" aria-label="Emojis">💄</span> and <i>outfit of the day</i> <span role="img" aria-label="Emojis">👘</span>, that's why I couldn't help calling this a blogish. Don't get me wrong, 
          I'm a girl, I like lipstick, but most likely there will be no
          cookies to find here, and especially not an outfit of the day - but who knows, sometimes I surprise myself.
          You might risk bumping into some plants here, though! <span role="img" aria-label="Emojis">🌱</span>
          I love my plants, they're my babies. I have new ones born every once in a while, as I plant the babies of everything I eat. 
          I'm just too curious about what the mother looked like as a baby to keep myself from letting them outgrow my house. <span role="img" aria-label="Emojis">🏡</span>
          <br/><br/>
          Anyplants <span role="img" aria-label="Emojis">🌴</span> (I'm about to grow a palm tree..), I just want to share the things I'm excited about. So here goes. I usually put all my stuff on 
           <a href="https://github.com/jennur">GitHub</a>, but that's just not as satisfying, so that's why I'm here <span role="img" aria-label="Emojis">🤠</span>. I feel pretty
          confident that this will end up being about tech and plants, so I guess I might as well just call it Plants and Codies.
          <br/><br/>
          That's it for now, I'll try to get this thing up and running! But first I want to redo my site, so plz gimme just a tiny piece of patience.*/