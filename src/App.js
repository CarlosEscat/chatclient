import React from "react";
//import { request } from "http";
//import * as request from "superagent";
import MessageForm from "./components/MessageForm";
import UserForm from "./components/UserForm";
import { allMessages } from "./actions";
import { connect } from "react-redux";
import "./App.css";

class App extends React.Component {
  state = {
    message: "",
  };

  source = new EventSource(
    //"https://mysterious-mesa-84416.herokuapp.com/stream"
    "http://localhost:5000/stream"
  );

  componentDidMount() {
    this.source.onmessage = (event) => {
      const messages = JSON.parse(event.data);
      this.props.allMessages(messages);
    };
  }

  render() {
    const messages = this.props.messages.map((messages, index) => (
      <div key={"messagediv" + index}>
        <br />
        <label className="Message" key={index}>
          {messages.user}: {messages.text}
        </label>
      </div>
    ));

    return (
      <div className="App">
        <h1>Chat Translator</h1>
        <main>
          <UserForm user={this.props.user} />
          <MessageForm user={this.props.user} />

          {messages}
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.user,
  };
}

const mapDispatchToProps = {
  allMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
