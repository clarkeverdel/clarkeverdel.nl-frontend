import React, { Component } from 'react';
import Carousel from './Carousel';

class HomeOpening extends Component {
  constructor(props) {
    super(props);

    props.projects.forEach(child => {
      this[`${child.id}_ref`] = React.createRef(),
      this[`item_cta-background_${child.id}`] = React.createRef(),
      this[`item_cta-arrow_${child.id}`] = React.createRef(),
      this[`item_outside_${child.id}`] = React.createRef()
    });
  }

  pad(num, size) {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
  }

  render() {
    const projects = this.props.projects.map((project, index) => {
      const { id } = project;
      const number = index + 1;
      const featuredMedia = project._embedded['wp:featuredmedia'];
      const image = (featuredMedia && featuredMedia[0].media_details) ? project._embedded['wp:featuredmedia'][0].media_details.sizes.full : null;

      return (
        <div className="recent-work__slider__item__inner" key={project.id} ref={this[`${project.id}_ref`]}>
          {project.featured_media && image
            ? <img className="recent-work__slider__item__image" src={image.source_url} />
            : null }
          <a className="recent-work__slider__item__cta" href={project.link}>
            <div className="recent-work__slider__item__cta-background" ref={this[`item_cta-background_${project.id}`]}></div>
            <div className="recent-work__slider__item__cta-arrow" ref={this[`item_cta-arrow_${project.id}`]}></div>
          </a>
          <div className="recent-work__slider__item__outside" ref={this[`item_outside_${project.id}`]}>
            <span className="recent-work__slider__item__number">{this.pad(number, 2)}</span>
            <a className="recent-work__slider__item__label" href={project.link}>View project</a>
          </div>
        </div>
      );
    });

    return (
      <section className="wrapper recent-work" id="recent-work">
        <div className="recent-work__wrapper">
          <div className="recent-work__header">
            <h2 className="recent-work__header__title h1">Recent Work</h2>
          </div>

          <Carousel>
            {projects}
          </Carousel>
        </div>
      </section>
    );
  }
}

export default HomeOpening;
