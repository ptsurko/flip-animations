import React, { Component } from 'react';
import ArticleList from './ArticleList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      articles: [{
        id: 1,
        text: 'We have a parent ArticleList component which takes a list of articles as its props. It maps through them, in order, and renders them.'
      }, {
        id: 2,
        text: 'If that list order changes (examples: the user toggles a setting that changes the sorting, an item gets upvoted and changes position, new data comes in from the server…), React reconciles the two states, and destroys / removes / appends / creates nodes as needed.',
      }, {
        id: 3,
        text: 'The DOM is dumb. If an item is removed from its original location and re-inserted at a new location 200px down, it has no awareness about what that update means for the element’s on-screen position.',
      }, {
        id: 4,
        text: 'Because the element’s CSS properties haven’t changed, there is no way to use CSS transitions to animate this change.',
      }],
      asc: false,
    };
  }

  handleSort() {
    this.setState(prevState => {
      let articles = prevState.articles;
      articles.sort((a1, a2) => {
        if (prevState.asc) {
          return a1.id > a2.id;
        }
        return a1.id < a2.id;
      });

      return {
        articles,
        asc: !prevState.asc
      };
    })
  }

  handleRandom() {
    
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <button onClick={this.handleSort.bind(this)}>Sort</button>
          <button onClick={this.handleRandom.bind(this)}>Random</button>
          <ArticleList articles={this.state.articles} />
        </div>
      </div>
    );
  }
}

export default App;
