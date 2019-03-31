import React from 'react';

class BlogPost extends React.Component {

  render(){
    let imageUrl = this.props.imageUrl;
    let imageCaption = this.props.imageCaption;
    let imageElement = imageUrl ? <img src={imageUrl} alt={imageCaption} /> : null
    
    return(
      <div className="blog__post">
          <ul><li><b>{ this.props.date }</b></li></ul>
          <p>{ this.props.children }</p>
          { imageElement }
          <p>{ imageCaption }</p>
      </div>
    );
  }
}

export default BlogPost; 