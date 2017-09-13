import React, { Component } from 'react';

import Article from './Article';
import FlipMove from './FlipMove';
import './App.css';

class ArticleList extends Component {
  render() {
    const { mode } = this.props;
    return (
      <div className={`articles ${mode === 'list' ? 'list' : 'table'}`}>
        <FlipMove>
          {this.props.articles.map(article => (
            <Article 
              key={article.id} 
              text={article.text}
            />
          ))}
        </FlipMove>
      </div>
    );
  }
}

export default ArticleList;
