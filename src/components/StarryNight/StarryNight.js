import React, { Component, Fragment } from 'react';
import debounce from 'lodash.debounce';
import Link from '../Link/Link';
import './StarryNight.css';

const between = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export default class StarryNight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrackingMouse: true,
    };
  }

  componentDidMount() {
    this.setupStars();

    this.handleMouseMove = (event) => {
      if (!this.startX) {
        this.startX = event.x;
        this.startY = event.y;
      }

      this.renderStars(
        (this.startX - event.x) / 4,
        (this.startY - event.y) / 4,
      );
    };

    this.addMouseListener();

    window.addEventListener('resize', debounce(() => {
      this.setupStars();
    }, 500));
  }

  addMouseListener() {
    document.documentElement.addEventListener('mousemove', this.handleMouseMove);
  }

  removeMouseListener() {
    this.startX = null;
    this.startY = null;
    document.documentElement.removeEventListener('mousemove', this.handleMouseMove);
  }

  setupStars() {
    this.el.width = window.innerWidth;
    this.el.height = window.innerHeight;
    this.ctx = this.el.getContext('2d');
    this.stars = [];

    for (let n = 0; n < (this.el.width * this.el.height) / 1500; n++) {
      this.stars.push({
        size: Math.random() * 1.5,
        top: between(this.el.height * -0.5, this.el.height * 1.5),
        left: between(this.el.width * -0.5, this.el.width * 1.5),
      });
    }

    this.renderStars();
  }

  renderStars(x = 0, y = 0) {
    this.ctx.clearRect(0, 0, this.el.width, this.el.height);
    this.stars.forEach(({ size, top, left }) => {
      this.ctx.beginPath();
      this.ctx.arc(left + (x * size), top + (y * size), size, 0, Math.PI * 2, true);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  handleTrackingChange() {
    if (this.state.isTrackingMouse) {
      this.removeMouseListener();
      this.setState({ isTrackingMouse: false });
    } else {
      this.addMouseListener();
      this.setState({ isTrackingMouse: true });
    }
  }

  render() {
    return (
      <Fragment>
        <canvas
            className="StarryNight"
            ref={ (el) => this.el = el } />

        <div className="StarryNight__control">
          <Link onClick={ () => this.handleTrackingChange() }>
            Turn { this.state.isTrackingMouse ? 'off' : 'on' } mouse tracking
          </Link>
        </div>
      </Fragment>
    );
  }
}
