import React, { Component } from 'react'
class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  // Static method
  static getDerivedStateFromError(error) {
    // Called when an error is thrown in a child component
    console.error(error);
    // Store the error in the state
    return {error: true};
  }
  render() {
    // If there was an error, show an error page
    if (this.state.error) {
    return (
        <main className="ErrorPage">
            <h1>Something seems to have gone wrong</h1>
            <p>Try refreshing the page</p>
            <iframe title='ErrorGiph' className='ErrorGiph' src="https://giphy.com/embed/3oEjHERaTIdeuFQrXq" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/glitch-cyberpunk-samer-fouad-3oEjHERaTIdeuFQrXq">via GIPHY</a></p>
        </main>
      );
    }
    // Otherwise, render the children
    return this.props.children;
  }
}

export default ErrorPage;