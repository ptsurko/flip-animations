import React, { Component } from 'react';
import './App.css';

class Article extends Component {
  render() {
    return (
      <div className="article">{this.props.text}</div>
    );
  }
}

export default Article;
