import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BlogPost from '../components/BlogPost';

class Blog extends React.Component {

  render(){
    return(
      <div>
      <Link to="/">Go home</Link>
      <Header title="Plants and Codies"></Header>
      <section className="blog">
      <BlogPost>
          Hey everyone, it's officially spring in Norway <span role="img" aria-label="Emojis">☀️🌿🇳🇴</span>, I just got my sunscreen <span role="img" aria-label="Emojis">🧴</span>, I'm ready for summer and here's my new blogish! 
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
          That's it for now, I'll try to get this thing up and running! But first I want to redo my site, so plz gimme just a tiny piece of patience.
      </BlogPost>
      </section>
      </div>
    );
  }
}

export default Blog;

