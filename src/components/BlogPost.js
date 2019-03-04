import React from 'react';

class BlogPost extends React.Component {

  render(){
    return(
      <div className="blog__post">
          <ul><li><b>{ this.props.date }</b></li></ul>
          <p>{ this.props.children }</p>
      </div>
    );
  }
}

export default BlogPost; 