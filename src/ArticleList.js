import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Article from './Article';
import './App.css';

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.elements = {};
    this.boxes = {};
  }
  componentWillReceiveProps() {
    Object.keys(this.elements).forEach(key => {
      const element = ReactDOM.findDOMNode(this.elements[key]);

      const boundingBox = element.getBoundingClientRect();
      
      this.boxes[key] = boundingBox;
    });
  }

  componentDidUpdate() {
    Object.keys(this.elements).forEach(key => {
      const element = ReactDOM.findDOMNode(this.elements[key]);

      const newBox = element.getBoundingClientRect();
      const oldBox = this.boxes[key];

      const deltaX = oldBox.left - newBox.left; 
      const deltaY = oldBox.top  - newBox.top;

      requestAnimationFrame( () => {
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        element.style.transition = 'transform 0s'; 

        requestAnimationFrame( () => {
          element.style.transform  = '';
          element.style.transition = 'transform 500ms';
        });
      });
    });
  }

  render() {
    return (
      <div className="article-list">
        {this.props.articles.map(article => (
          <Article 
            key={article.id} 
            ref={el => { this.elements[article.id] = el; }}
            text={article.text}
          />
        ))}
      </div>
    );
  }
}

export default ArticleList;
