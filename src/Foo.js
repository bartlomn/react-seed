import React, { Component } from 'react';
import classnames from 'classnames';

class Foo extends Component {

  /**
   * Default css classes of the component
   * @type {String}
   */
  static defaultClasses = "default-local-class";

  /**
   * PropTypes ES7 way
   * @see https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es7-property-initializers
   */
  static propTypes = {
      classNames: React.PropTypes.string,
      label: React.PropTypes.string.isRequired
  };

  /**
   * Initial props ES7 way
   * @see https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es7-property-initializers
   */
  static defaultProps = {
      classNames: 'default-prop-class'
  };

  /**
   * Initial state ES7 way
   * @see https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es7-property-initializers
   */
  state = {
      count: 0
  };

  /**
   * Default constructor
   * @param  {Object} props component props
   * @return {void}
   */
  constructor(props) {
    super(props);
  }

  /**
   * React lifecycle method
   * @return {void}
   */
  componentWillMount() {
    setInterval(this.tick, 1000);
  }

  /**
   * Using syntacticall autobinding ES7 way.
   * @see https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
   */
  tick = () => {
    this.setState({ count: this.state.count + 1 });
  }

  /**
   * React render
   * @return {void}
   */
  render() {
    return (
      <div
        className={ classnames( Foo.defaultClasses, this.props.classNames ) }
        >
          <h1>Hello, this is { this.props.label }.</h1>
          Count is {this.state.count}
      </div>
    )
  }
}

export default Foo;
