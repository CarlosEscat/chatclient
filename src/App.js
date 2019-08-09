import React from "react";

class App extends React.Component {
  state = {
    messages: []
  };

  source = new EventSource("http://localhost:5000/stream");

  componentDidMount() {
    this.source.onmessage = event => {
      const newMessage = [...this.state.messages, event.data];
      this.setState({ messages: newMessage });
    };
  }

  render() {
    const messages = this.state.messages.map((messages, index) => (
      <p key={index}> {messages} </p>
    ));
    return <main> {messages} </main>;
  }
}

export default App;
