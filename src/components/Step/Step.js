import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Base from '../Base/Base';
import Flex from '../Flex/Flex';
import Link from '../Link/Link';
import StepBadge from './StepBadge';
import Text from '../Text/Text';
import './Step.css';

export default class Step extends Component {
  static propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    isComplete: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    module: PropTypes.string,
    number: PropTypes.string,
    resources: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })),
    summary: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    const {
      children,
      description,
      isComplete,
      isDisabled,
      module,
      number,
      resources,
      summary,
      title,
    } = this.props;

    const classes = classnames('Step', {
      'Step--complete': isComplete,
      'Step--disabled': isDisabled,
    });

    return (
      <Flex
          alignChildrenVertical="middle"
          className={ classes }
          direction="vertical"
          padding="x4">
        <Flex
            direction="horizontal"
            gutter="x4"
            margin="x2"
            shrink>

          <Flex>
            <Flex
                alignChildrenVertical="middle"
                direction="horizontal"
                gutter="x4">

              { title && (
                <Flex>
                  <Text size="large">
                    { number && <Text inline strong>Step { number }.</Text> } { title }
                  </Text>
                </Flex>
              ) }

              { module && (
                <Flex shrink>
                  <StepBadge>{ module }</StepBadge>
                </Flex>
              ) }
            </Flex>

            { summary && (
              <Text margin="x2" strong>
                { summary }
              </Text>
            ) }

            { description && (
              <Base margin="x4">
                <Text margin="x1" strong>Description: </Text>
                <Text>{ description }</Text>
              </Base>
            ) }

            { resources && (
              <Base margin="x4">
                <Text margin="x1" strong>Resources: </Text>
                { resources.map(({ name, location }, index) =>
                  <Text key={ index }>
                    - <Link
                        href={ location }
                        target="_blank"
                        title={ `Link to ${name} for ${title} step` }>
                      { name }
                    </Link>
                  </Text>
                ) }
              </Base>
            ) }

            <Base margin="x6">
              { isDisabled ? null : children }
            </Base>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
