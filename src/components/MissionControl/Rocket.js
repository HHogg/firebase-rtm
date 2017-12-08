/* eslint-disable max-len,react/jsx-sort-props,react/jsx-max-props-per-line */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Base from '../Base/Base';
import Flame from './Flame';
import './Rocket.css';

export default class Rocket extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    launch: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
  };

  render() {
    const { color, launch, ready } = this.props;
    const style = { fill: `var(--oc-${color}-6)` };
    const classes = classnames('Rocket', {
      'Rocket--launch': launch,
      'Rocket--ready': ready,
    });


    return (
      <Base className={ classes }>
        <div className="Rocket__container">
          <div className="Rocket__flames">
            <div className="Rocket__flame"><Flame /></div>
            <div className="Rocket__flame"><Flame /></div>
          </div>

          <div className="Rocket__ship">
            <svg version="1.1" viewBox="0 0 443.883 443.883" width="100%" x="0" y="0">
              <path className="Rocket__sub-tank" d="M336.036,166.27v277.61h-7.98l-8.59-49.56c-3.14-18.14-12.93-32.76-25.87-38.63 c-1.48-0.67-2.91-1.45-4.29-2.34v-140.3v-40.58v-6.2H336.036z"/>
              <path style={ style } d="M336.036,150.31v15.96h-46.73v-15.96c0-22.16,8.34-43.52,23.37-59.82 C327.697,106.79,336.036,128.15,336.036,150.31z"/>
              <path style={ style } d="M319.467,394.32l8.59,49.56h-15.48h-45.92V304.66c0,21.03,8.96,39.92,22.65,48.69 c1.38,0.89,2.81,1.67,4.29,2.34C306.536,361.56,316.327,376.18,319.467,394.32z"/>
              <path className="Rocket__main-tank" d="M289.307,213.05v140.3c-13.69-8.77-22.65-27.66-22.65-48.69v-41.44v-28.4 c0-32.42-12.2-63.65-34.17-87.49c-5.68-6.16-15.4-6.16-21.08,0c-10.99,11.92-19.54,25.69-25.33,40.53 c-5.8,14.84-8.85,30.75-8.85,46.96v28.4v41.44c0,21.04-8.95,39.93-22.65,48.69v-140.3v-40.58c0-30.84,5.6-61.12,16.26-89.49h102.22 c10.65,28.37,16.25,58.65,16.25,89.49V213.05z"/>
              <path style={ style } d="M273.057,82.98h-102.22c11.43-30.44,28.69-58.66,51.11-82.98 C244.367,24.32,261.617,52.54,273.057,82.98z"/>
              <path className="Rocket__body" d="M244.786,162.94c-3.67-5.48-7.78-10.7-12.3-15.61c-5.68-6.16-15.4-6.16-21.08,0 c-4.53,4.91-8.64,10.13-12.31,15.62c-5.26,7.83-9.61,16.18-13.02,24.91c-5.8,14.84-8.85,30.75-8.85,46.96v209.06h89.43V234.82 C266.656,209.07,258.967,184.08,244.786,162.94z"/>
              <path style={ style } d="M244.786,162.94c-5.58,6.32-13.74,10.3-22.84,10.3c-9.1,0-17.26-3.98-22.85-10.29 c3.67-5.49,7.78-10.71,12.31-15.62c5.68-6.16,15.4-6.16,21.08,0C237.007,152.24,241.116,157.46,244.786,162.94z"/>
              <path className="Rocket__window" d="M253.335,213.159l-14.081,14.067c-9.542-9.542-25.069-9.542-34.625,0l-14.081-14.067 C207.867,195.854,236.029,195.854,253.335,213.159z"/>
              <path style={ style } d="M154.577,353.35c13.7-8.76,22.65-27.65,22.65-48.69v139.22h-17.61h-43.78l8.58-49.56 c3.15-18.14,12.94-32.76,25.88-38.63C151.767,355.02,153.197,354.24,154.577,353.35z"/>
              <path className="Rocket__sub-tank" d="M154.577,213.05v140.3c-1.38,0.89-2.81,1.67-4.28,2.34c-12.94,5.87-22.73,20.49-25.88,38.63 l-8.58,49.56h-7.99V166.27h46.73v6.2V213.05z"/>
              <path style={ style } d="M154.577,150.31v15.96h-46.73v-15.96c0-22.16,8.34-43.52,23.37-59.82 C146.237,106.79,154.577,128.15,154.577,150.31z"/>
              <path style={ style } d="M229.445,443.883h-15v-72.448c0-4.142,3.358-7.5,7.5-7.5l0,0c4.142,0,7.5,3.358,7.5,7.5V443.883z"/>
            </svg>
          </div>
        </div>
      </Base>
    );
  }
}
