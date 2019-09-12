import React from "react";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false
    };
  }
  render() {
    let imageUrl = this.props.imageUrl;
    let imageCaption = this.props.imageCaption;
    let imageElement = imageUrl ? (
      <img src={imageUrl} alt={imageCaption} />
    ) : null;

    return (
      <div className="blog__post">
        <ul>
          <li>
            <b>{this.props.date}</b>
          </li>
        </ul>
        <div>{this.props.children}</div>
        {imageElement}
        <p>{imageCaption}</p>
      </div>
    );
  }
}

export default BlogPost;
