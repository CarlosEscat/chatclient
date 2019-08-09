import React from "react";
//import { request } from "http";
import * as request from "superagent";

class App extends React.Component {
  state = {
    message: "",
    messages: []
  };

  source = new EventSource("http://localhost:5000/stream");

  componentDidMount() {
    this.source.onmessage = event => {
      //const newMessage = [...this.state.messages, event.data];
      const messages = JSON.parse(event.data);
      this.setState({ messages: messages });
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    console.log("this.state.message", this.state.message);

    const response = await request
      .post("http://localhost:5000/message")
      .send({ message: this.state.message });

    this.setState({ message: "" });

    console.log("response", response);
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({ message: value });
  };

  render() {
    const messages = this.state.messages.map((messages, index) => (
      <p key={index}> {messages} </p>
    ));

    const form = (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.message}
          onChange={this.onChange}
        />
        <button type="submit">Send</button>
      </form>
    );
    return (
      <main>
        {" "}
        {form}
        {messages}{" "}
      </main>
    );
  }
}

export default App;
