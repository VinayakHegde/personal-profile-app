import React from 'react';
import PropTypes from 'prop-types';
import './FlipCard.css';

class FlipCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: this.props.isFlipped,
      sideVisible : this.props.isFlipped ? 'back' : 'front',
      rotation: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFlipped !== this.props.isFlipped) {
      this.setState({ isFlipped: nextProps.isFlipped });
      this.setState({ rotation: this.state.rotation + 180 });
    }
  }

  getComponent() {
    let side = this.props.isFlipped ? 'back' : 'front';

    return this.props.children.filter(component => {
      return component.props.side === side;
    });
  }

  render() {
    const {
      flipDirection,
      infinite,
      flipSpeedFrontToBack,
      flipSpeedBackToFront,
      cardStyles: { front, back }
    } = this.props;
    const { isFlipped, rotation } = this.state;

    const frontRotateY = `rotateY(${
      infinite ? rotation : isFlipped ? 180 : 0
    }deg)`;
    const backRotateY = `rotateY(${
      infinite ? rotation + 180 : isFlipped ? 0 : -180
    }deg)`;
    const frontRotateX = `rotateX(${
      infinite ? rotation : isFlipped ? 180 : 0
    }deg)`;
    const backRotateX = `rotateX(${
      infinite ? rotation + 180 : isFlipped ? 0 : -180
    }deg)`;

    const styles = {
      front: {
        zIndex: '2',
        visibility: isFlipped ? 'hidden' : '',
        position: isFlipped ? 'absolute' : 'relative',
        transform: flipDirection === 'horizontal' ? frontRotateY : frontRotateX,
        transition: `${flipSpeedBackToFront}s`,
        ...front
      },
      back: {
        visibility: isFlipped ? '' : 'hidden',
        position: isFlipped ? 'relative' : 'absolute',
        transform: flipDirection === 'horizontal' ? backRotateY : backRotateX,
        transition: `${flipSpeedFrontToBack}s`,
        ...back
      }
    };

    return (
      <div className="flip-card-wrapper">
        <div className="flip-card">
          <div className="flip-card-front" style={styles.front}>
            {this.getComponent()}
          </div>

          <div className="flip-card-back" style={styles.back}>
            {this.getComponent()}
          </div>
          
        </div>
      </div>
    );
  }
}

FlipCard.propTypes = {
  cardStyles: PropTypes.shape({
    front: PropTypes.object,
    back: PropTypes.object
  }),
  cardZIndex: PropTypes.string,
  children: (props, propName, componentName) => {
    if (React.Children.count(props[propName]) !== 2) {
      return new Error(`${componentName} requires two children.`);
    }
  },
  flipDirection: (props, propName, componentName) => {
    if (!props[propName]) {
      return;
    }

    if (
      !(
        typeof props[propName] === 'string' || props[propName] instanceof String
      )
    ) {
      return new Error(`${propName} requires a string.`);
    }

    if (
      props[propName].toLowerCase() !== 'horizontal' &&
      props[propName].toLowerCase() !== 'vertical'
    ) {
      return new Error(
        `${propName} expects (horizontal|vertical), got ${props[
          propName
        ].toLowerCase()}`
      );
    }
  },
  flipSpeedBackToFront: PropTypes.number,
  flipSpeedFrontToBack: PropTypes.number,
  infinite: PropTypes.bool,
  isFlipped: PropTypes.bool
};

FlipCard.defaultProps = {
  cardStyles: {
    front: {},
    back: {}
  },
  cardZIndex: 'auto',
  flipDirection: 'horizontal',
  flipSpeedBackToFront: 0.3,
  flipSpeedFrontToBack: 0.3,
  infinite: false,
  isFlipped: false
};

export default FlipCard;