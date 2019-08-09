import React from "react";
//import { request } from "http";
//import * as request from "superagent";
import MessageForm from "./components/MessageForm";
import UserForm from "./components/UserForm";
import { allMessages } from "./actions";
import { connect } from "react-redux";

class App extends React.Component {
  state = {
    message: ""
  };

  source = new EventSource("http://localhost:5000/stream");

  componentDidMount() {
    this.source.onmessage = event => {
      const messages = JSON.parse(event.data);
      this.props.allMessages(messages);
    };
  }

  render() {
    const messages = this.props.messages.map((messages, index) => (
      <p key={index}>
        {" "}
        {messages.user}: {messages.text}{" "}
      </p>
    ));

    return (
      <main>
        <MessageForm user={this.props.user} />
        <UserForm />
        {messages}
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.user
  };
}

const mapDispatchToProps = {
  allMessages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
