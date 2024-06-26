import React, { Component } from 'react';
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';

import CarouselArrow from '../../public/static/images/carousel_arrow.svg';
gsap.registerPlugin(CustomEase);

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      sliding: false,
      lockButton: false,
      direction: null,
    };

    this.itemPositionOrder = [0, 1, 3, 4, 2];
    this.getChildren = this.getChildren.bind(this);
    this.afterDoSliding = this.afterDoSliding.bind(this);
    this.afterComponentDidUpdate = this.afterComponentDidUpdate.bind(this);

    CustomEase.create("custom", "M0,0 C0,0 0.0247,0.00211 0.03707,0.00714 0.05152,0.01303 0.06423,0.01886 0.07459,0.03038 0.10351,0.06254 0.12546,0.08977 0.14735,0.12981 0.17564,0.18153 0.18831,0.21797 0.20917,0.2765 0.26882,0.44384 0.29416,0.54487 0.35353,0.70816 0.36667,0.74432 0.37878,0.76627 0.39883,0.79818 0.41618,0.82579 0.42964,0.84466 0.45302,0.8665 0.48414,0.89557 0.50894,0.91582 0.54618,0.93582 0.58624,0.95734 0.61812,0.96822 0.6633,0.97943 0.71261,0.99167 0.74622,0.99524 0.79841,0.99842 0.87552,1.00313 1,1 1,1 ");
    this.customEase = "custom";
  }

  componentDidUpdate() {
    const { direction } = this.state;

    if (this.state.sliding) {
      const sortedItems = this.getChildren();

      const first = sortedItems[this.itemPositionOrder[0]];
      const firstItem = first.ref.current;
      const firstItemPosition = firstItem.getBoundingClientRect();
      const firstItemCtaBackground = first.props['data-refs'][`item_cta-background_${first.key}`].current;
      const firstItemCtaArrow = first.props['data-refs'][`item_cta-arrow_${first.key}`].current;
      const firstItemOutside = first.props['data-refs'][`item_outside_${first.key}`].current;
      const firstItemNumber = first.props['data-refs'][`item_number_${first.key}`].current;
      const firstItemLabel = first.props['data-refs'][`item_label_${first.key}`].current;
      const secondItem = sortedItems[this.itemPositionOrder[1]].ref.current;
      const secondItemPosition = secondItem.getBoundingClientRect();
      const thirdItem = sortedItems[this.itemPositionOrder[2]].ref.current;
      const thirdItemPosition = thirdItem.getBoundingClientRect();
      const fourthItem = sortedItems[this.itemPositionOrder[3]].ref.current;
      const fifthItem = sortedItems[this.itemPositionOrder[4]].ref.current;

      gsap.set(firstItem, {
        clearProps: "x,y"
      });
      gsap.set(secondItem, {
        clearProps: "x,y"
      });
      gsap.set(thirdItem, {
        clearProps: "x,y"
      });
      gsap.set(fourthItem, {
        clearProps: "x,y"
      });
      gsap.set(fifthItem, {
        clearProps: "x,y"
      });

      gsap.from(firstItemCtaBackground, {
        xPercent: 100,
        ease: this.customEase,
        duration: .75
      });
      gsap.from(firstItemCtaArrow, {
        yPercent: 10,
        height: 0,
        ease: this.customEase,
        duration: .75
      });

      if (direction === 'next') {
        // Different animations per screenwidth for labels of first item in carousel
        if (window.innerWidth < 767) {
          gsap.from(firstItemNumber, {
            y: 0,
            ease: this.customEase,
            duration: .75
          });
          gsap.from(firstItemLabel, {
            y: 0,
            ease: this.customEase,
            duration: .75
          });
        } else {
          gsap.from(firstItemOutside, {
            xPercent: -100,
            ease: this.customEase,
            duration: .75
          });
        }

        gsap.set(fifthItem, {
          xPercent: 50,
        });
        gsap.to(fifthItem, {
          xPercent: 0,
          yPercent: 0,
          x: 0,
          opacity: 1,
          clearProps: "x,xPercent,yPercent",
          ease: this.customEase,
          duration: .750,
          onComplete: this.afterComponentDidUpdate
        });
      } else if (direction === 'prev') {
        gsap.from(firstItem, {
          xPercent: -200,
          yPercent: 100,
          rotate: -45,
          opacity: 0.5,
          clearProps: "rotate,opacity",
          ease: this.customEase,
          duration: .750,
          onComplete: this.afterComponentDidUpdate
        });
      }
    }
  }

  afterComponentDidUpdate() {
    this.setState({
      sliding: false,
      lockButton: false
    });
  }

  getChildren() {
    let { children } = this.props;

    // Get position from item
    let items = children.map((child, index) => ({
      ...child,
      position: this.getOrder(index)
    }));

    // Sort items by position so it easy to pick the item by position like:
    // item[0] for first item and  item[1] for second item
    const sortedItems = items.sort(function (a, b) {
      const positionA = a.position;
      const positionB = b.position;
      if (positionA < positionB) return -1;
      if (positionA > positionB) return 1;
      return 0;
    });

    return sortedItems;
  }

  getOrder(itemIndex) {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;

    if (itemIndex - position < 0) {
      return this.itemPositionOrder[numItems - Math.abs(itemIndex - position)];
    }

    return this.itemPositionOrder[itemIndex - position];
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
    if (this.state.lockButton) {
      return;
    } else {
      this.setState({
        lockButton: true
      })
    }

    const animationDuration = .750;
    const sortedItems = this.getChildren();
    const first = sortedItems[this.itemPositionOrder[0]];

    const firstItem = sortedItems[this.itemPositionOrder[0]].ref.current;
    const firstItemPosition = firstItem.getBoundingClientRect();
    const firstItemCtaBackground = first.props['data-refs'][`item_cta-background_${first.key}`].current;
    const firstItemCtaArrow = first.props['data-refs'][`item_cta-arrow_${first.key}`].current;
    const firstItemOutside = first.props['data-refs'][`item_outside_${first.key}`].current;
    const firstItemNumber = first.props['data-refs'][`item_number_${first.key}`].current;
    const firstItemLabel = first.props['data-refs'][`item_label_${first.key}`].current;
    const secondItem = sortedItems[this.itemPositionOrder[1]].ref.current;
    const secondItemPosition = secondItem.getBoundingClientRect();
    const thirdItem = sortedItems[this.itemPositionOrder[2]].ref.current;
    const thirdItemPosition = thirdItem.getBoundingClientRect();
    const fourthItem = sortedItems[this.itemPositionOrder[3]].ref.current;
    const fourthItemPosition = fourthItem.getBoundingClientRect();
    const fifthItem = sortedItems[this.itemPositionOrder[4]].ref.current;
    const fifthItemPosition = fifthItem.getBoundingClientRect();

    let myAnimation = gsap.timeline({
      id: 'sliderTimeline'
    });


    if (direction === 'next') {
      myAnimation.to(firstItem, {
        xPercent: -200,
        yPercent: 100,
        rotate: -45,
        opacity: 0.5,
        clearProps: "rotate,opacity",
        ease: this.customEase,
        force3D: false,
        duration: animationDuration,
      }, 0);

      myAnimation.to(secondItem, {
        x: (firstItemPosition.left - secondItemPosition.left), //-(1- (1/(firstItemPosition.width / secondItemPosition.width))) * secondItemPosition.x
        y: firstItemPosition.top - secondItemPosition.top,
        // height: firstItemPosition.height,
        // width: firstItemPosition.width,
        scale: firstItemPosition.width / secondItemPosition.width,
        // clearProps: "",
        ease: "power4",
        force3D: false,
        duration: animationDuration,
      }, 0);

      myAnimation.to(thirdItem, {
        x: secondItemPosition.x - thirdItemPosition.x,
        y: secondItemPosition.y - thirdItemPosition.y,
        ease: this.customEase,
        duration: animationDuration,
      }, 0);

      myAnimation.to(fourthItem, {
        x: thirdItemPosition.x - fourthItemPosition.x,
        y: thirdItemPosition.y - fourthItemPosition.y,
        ease: this.customEase,
        duration: animationDuration,
      }, 0);

      myAnimation.to(fifthItem, {
        x: fourthItemPosition.x - fifthItemPosition.x,
        y: fourthItemPosition.y - fifthItemPosition.y,
        ease: this.customEase,
        duration: animationDuration,
        onComplete: this.afterDoSliding,
        onCompleteParams: [direction, position]
      }, 0);


    } else if (direction === 'prev') {
      // First item
      myAnimation.to(firstItem, {
        x: (secondItemPosition.left - firstItemPosition.left), //-(1- (1/(firstItemPosition.width / secondItemPosition.width))) * secondItemPosition.x
        y: secondItemPosition.top - firstItemPosition.top,
        scale: secondItemPosition.width / firstItemPosition.width,
        ease: "power4",
        force3D: false,
        duration: animationDuration,
      }, 0);
      myAnimation.to(firstItemCtaBackground, {
        xPercent: 100,
        ease: this.customEase,
        duration: .75
      }, 0);
      myAnimation.to(firstItemCtaArrow, {
        yPercent: 0,
        height: 0,
        ease: this.customEase,
        duration: .75
      }, 0);

      // Different animations per screenwidth for labels of first item in carousel
      if (window.innerWidth < 767) {
        gsap.to(firstItemNumber, {
          y: 0,
          ease: this.customEase,
          duration: .75
        });
        gsap.to(firstItemLabel, {
          y: 0,
          ease: this.customEase,
          duration: .75
        });
      } else {
        gsap.to(firstItemOutside, {
          xPercent: -100,
          ease: this.customEase,
          duration: .75
        });
      }

      myAnimation.to(secondItem, {
        x: thirdItemPosition.x - secondItemPosition.x,
        y: thirdItemPosition.y - secondItemPosition.y,
        ease: this.customEase,
        duration: animationDuration,
      }, 0);

      myAnimation.to(thirdItem, {
        x: fourthItemPosition.x - thirdItemPosition.x,
        y: fourthItemPosition.y - thirdItemPosition.y,
        ease: this.customEase,
        duration: animationDuration,
      }, 0);

      myAnimation.to(fourthItem, {
        x: fifthItemPosition.x - fourthItemPosition.x,
        y: fifthItemPosition.y - fourthItemPosition.y,
        ease: this.customEase,
        duration: animationDuration,
      }, 0);

      myAnimation.to(fifthItem, {
        xPercent: 50,
        ease: this.customEase,
        duration: animationDuration,
        onComplete: this.afterDoSliding,
        onCompleteParams: [direction, position, myAnimation, firstItem]
      }, 0);
    }

  };

  afterDoSliding(direction, position, timeline, firstItem) {
    this.setState({
      direction,
      position,
      sliding: true
    });
    if (direction === 'prev') timeline.to(firstItem, { opacity: 0 });
  }

  render() {
    const { children } = this.props;

    let items = children.map((child, index) => ({
      ...child,
      position: this.getOrder(index)
    }));

    // Sort items by position so it easy to pick the item by position like:
    // item[0] for first item and  item[1] for second item
    const sortedItems = items.sort(function (a, b) {
      const positionA = a.position;
      const positionB = b.position;
      if (positionA < positionB) return -1;
      if (positionA > positionB) return 1;
      return 0;
    });

    return (
      <div className="recent-work__slider">
        <div className="recent-work__slider__wrapper">
          <div className="recent-work__slider__main">
            {sortedItems.slice(0, 1).map((child, index) => (
              <div className={`recent-work__slider__item${this.state.sliding ? ' sliding' : ''}${!this.state.isLocked ? ' finished' : ''}`} order={child.position} style={{ order: child.position }} key={child.key} ref={child.props['data-refs'][`${child.key}_ref`]}>
                {child}
              </div>
            ))}
            <div className="recent-work__slider__navigation">
              <button className="recent-work__slider__button recent-work__slider__button-prev" onClick={() => this.prevSlide()}><CarouselArrow /></button>
              <button className="recent-work__slider__button recent-work__slider__button-next" onClick={() => this.nextSlide()}><CarouselArrow /></button>
            </div>
          </div>
          <div className="recent-work__slider__thumbnails">
            {sortedItems.slice(1, 5).map((child, index) => (
              <div className={`recent-work__slider__item${this.state.sliding ? ' sliding' : ''}${!this.state.isLocked ? ' finished' : ''}`} order={child.position} style={{ order: child.position }} key={child.key} ref={child.props['data-refs'][`${child.key}_ref`]}>
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
