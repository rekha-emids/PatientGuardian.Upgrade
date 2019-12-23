import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

const ErrorBoundaryHOC = (WrappedComponent) => {
  class HOC extends React.PureComponent {
    render() {
      return (
        <ErrorBoundary>
            <WrappedComponent {...this.props} />
        </ErrorBoundary>
      );
    }
  }
    
  return HOC; 
}

export default ErrorBoundaryHOC;