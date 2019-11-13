import React, { Component } from 'react';
import Carousel from "./Carousel";

class HomeOpening extends Component {

    constructor(props){
        super(props);
    }

    pad(num, size) {
      let s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    }

    render () {

      let projects = this.props.projects.map((project, index) => {

        let id = project.id,
          number = index + 1,
          featuredMedia = project._embedded['wp:featuredmedia'],
          image = (featuredMedia && featuredMedia[0].media_details) ? project._embedded['wp:featuredmedia'][0].media_details.sizes["full"] : null;

        return (
          <div className="recent-work__slider__item__inner" key={project.id}>
            {project.featured_media && image ?
              <img className="recent-work__slider__item__image" src={image.source_url} />
              : null }

            <div className="recent-work__slider__item__outside">
              <a className="recent-work__slider__item__label" href={project.link}>View project</a>
              <span className="recent-work__slider__item__number">{this.pad(number, 2)}</span>
            </div>
          </div>
        );
      });

      return (
        <section className="wrapper recent-work" id="recent-work">
          <div className="recent-work__wrapper">
            <div className="recent-work__header">
              <h2 className="recent-work__header__title">Recent Work</h2>
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
