import React from 'react';

class BlogPost extends React.Component {

  render(){
    return(
      <div className="blog__post">
          <p>{this.props.children}</p>
      </div>
    );
  }
}

export default BlogPost; 