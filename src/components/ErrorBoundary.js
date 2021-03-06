import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? (
      <div className="uk-section-default">
        <div className="uk-section uk-flex uk-flex-middle uk-flex-center" data-uk-height-viewport="expand: true">
          <span className="uk-margin-small-right">Oh no, something went wrong.</span>
          <a href="/">
            <span className="uk-margin-xsmall-left">Try again</span>
            <span data-uk-icon="icon: arrow-right" />
          </a>
        </div>
      </div>
    ) : children;
  }
}

export default ErrorBoundary;
