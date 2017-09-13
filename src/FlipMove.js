import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

class FlipMove extends Component {
  constructor(props) {
    super(props);

    this.elements = {};
    this.boxes = {};
  }
  componentWillReceiveProps() {
    Object.keys(this.elements).forEach(key => {
      const element = this.elements[key];

      const boundingBox = element.getBoundingClientRect();
      
      this.boxes[key] = boundingBox;
    });
  }

  componentDidUpdate() {
    Object.keys(this.elements).forEach(key => {
      const element = this.elements[key];

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
      <div className="flip-move">
        {React.Children.map(this.props.children, (child, idx) => {
          return React.cloneElement(child, {
            ref: node => {
              if (node == null) {
                console.warn('FlipMove does not support functional components');
                return;
              }
              
              this.elements[child.key] = ReactDOM.findDOMNode(node);
            },
          });
        })}
      </div>
    );
  }
}

export default FlipMove;
