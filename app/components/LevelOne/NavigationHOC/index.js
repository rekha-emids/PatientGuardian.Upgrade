import React from 'react';

const withInteractionManager = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }
  }
    
  return HOC; 
}

export default withInteractionManager;