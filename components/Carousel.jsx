import React, { Component, PropTypes } from 'react';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
    };
  }

  getOrder(itemIndex) {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;

    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position);
    }

    return itemIndex - position;
  }

  nextSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;

    this.doSliding('next', position === numItems - 1 ? 0 : position + 1);
  };

  prevSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length;

    this.doSliding('prev', position === 0 ? numItems - 1 : position - 1);
  };

  doSliding = (direction, position) => {
    this.setState({
      sliding: true,
      newPosition: position,
    });

    setTimeout(() => {
      this.setState({
        direction,
        position,
      });
    }, 1000);

    setTimeout(() => {
      this.setState({
        sliding: false,
      });
    }, 1000);
  };

  render() {
    const { children } = this.props;

    return (
      <div className="recent-work__slider">
        <div className="recent-work__slider__wrapper">
          { children.map((child, index) => (
            <div className={`recent-work__slider__item ${this.state.sliding ? 'sliding' : ''}`} order={this.getOrder(index)} style={{ order: this.getOrder(index) }} key={child.key}>
              {child}
            </div>
          ))}
        </div>

        <div className="recent-work__slider__navigation">
          <button onClick={() => this.nextSlide()}>Next</button>
          <span className="recent-work__slider__prev" />
          <span className="recent-work__slider__next" />
        </div>
      </div>
    );
  }
}

export default Carousel;
