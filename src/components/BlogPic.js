import React from 'react';

class BlogPic extends React.Component {

  render(){
    return(
      <div className="blog__pic">
        <img src={ this.props.src } alt="Blog img"/>
        <p className="pic__caption">
          { this.props.caption }
        </p>
      </div>
    );
  }
}

export default BlogPic; 