import React from "react";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import gql from "graphql-tag";

const SUBSCRIBED_MESSAGE = gql`
  subscription {
    messageSent {
      to
      from
      message
    }
  }
`;

class ShowMessage extends React.Component {
    componentDidMount() {
        const { subscribeToMore, message } = this.props;
        subscribeToMore({
            document: SUBSCRIBED_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                if (prev.messages.length === 0) {
                    return {
                        messages: [...prev.messages, subscriptionData.data.messageSent]
                    };
                } else {
                    if (
                        (prev.messages[prev.messages.length - 1].from === message.from &&
                            prev.messages[prev.messages.length - 1].to === message.to) ||
                        (prev.messages[prev.messages.length - 1].from === message.to &&
                            prev.messages[prev.messages.length - 1].to === message.from)
                    ) {
                        return {
                            messages: [...prev.messages, subscriptionData.data.messageSent]
                        };
                    } else {
                        return {
                            messages: [subscriptionData.data.messageSent]
                        };
                    }
                }
            }
        });
    }

    render() {
        const { allMessages, from, to, align, message } = this.props;
        console.log("inside show message", message);
        const data = message.allMessages.map(i => ({
            position: message.align,
            type: "text",
            text: i,
            date: Date.now()
        }));
        return (
            <>
                {message.count ? (
                    <MessageList
                        className="message-list"
                        lockable={false}
                        toBottomHeight={"150%"}
                        dataSource={data}
                    />
                ) : (
                        ""
                    )}
            </>
        );
    }
}
export default ShowMessage;
