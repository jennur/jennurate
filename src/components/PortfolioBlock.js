import React from "react";

class PortfolioBlock extends React.Component {
  render() {
    return (
      <div className="portfolio-item-wrapper">
        <div className="portfolio-item">
          <h2 className="portfolio-item__title">{this.props.title}</h2>
          <h3>{this.props.type}</h3>
          <iframe
            className="portfolio-item__iframe"
            title={this.props.title}
            src={this.props.url}
          />
          <div className="portfolio-item__description">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}

export default PortfolioBlock;
