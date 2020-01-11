import React, { Component } from 'react';
import Carousel from './Carousel';

import Link from 'next/link';

const htmlClass = 'recent-work';

class RecentWork extends Component {
  constructor(props) {
    super(props);

    this.dataset = props.projects.map((child) => {
      return {
          [`${child.id}_ref`]: React.createRef(),
          [`item_cta-background_${child.id}`]: React.createRef(),
          [`item_cta-arrow_${child.id}`]: React.createRef(),
          [`item_outside_${child.id}`]: React.createRef(),
        }
    });
  }

  pad(num, size) {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
  }

  render() {
    const projects = this.props.projects.map((project, index) => {
    const {dataset} = this;

      const id = project.id,
            number = index + 1,
            featuredMedia = project._embedded['wp:featuredmedia'],
            image = (featuredMedia && featuredMedia[0].media_details) ? project._embedded['wp:featuredmedia'][0].media_details.sizes.full : null,
            href = `/project?slug=${project.slug}&apiRoute=project`,
            realSlug = `/project/${project.slug}`;

      return (
        <div className={`${htmlClass}__slider__item__inner`} key={id} ref={dataset[index][`${id}_ref`]} refs={dataset[index]}>
          {featuredMedia && image
            ? <img className={`${htmlClass}__slider__item__image`} src={image.source_url} />
            : null }
          <Link href={href} as={realSlug}>
            <a className="recent-work__slider__item__cta">
              <div className="recent-work__slider__item__cta-background" ref={dataset[index][`item_cta-background_${id}`]}></div>
              <div className="recent-work__slider__item__cta-arrow" ref={dataset[index][`item_cta-arrow_${id}`]}></div>
            </a>
          </Link>
          <div className="recent-work__slider__item__outside" ref={dataset[index][`item_outside_${id}`]}>
            <span className="recent-work__slider__item__number">{this.pad(number, 2)}</span>
            <Link href={href} as={realSlug}><a className="recent-work__slider__item__label">View project</a></Link>
          </div>
        </div>
      );
    });

    return (
      <section className={`wrapper ${htmlClass}`} id="recent-work">
        <div className={`${htmlClass}__wrapper`}>
          <div className={`${htmlClass}__header`}>
            <h2 className={`${htmlClass}__header__title h1`}>Recent Work</h2>
          </div>

          <Carousel>
            {projects}
          </Carousel>
        </div>
      </section>
    );
  }
}

export default RecentWork;
