import React from "react";
import { Query } from "react-apollo";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ShowMessage from "../ShowMessage/ShowMessage";
import Send from "@material-ui/icons/Send";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";

const MESSAGES = gql`
query {
    messages {
    to
    from
    message
    }
}
`;

const SEND_MESSAGE = gql`
mutation SendMessage($to: String!, $from: String!, $message: String!) {
    sendMessage(to: $to, from: $from, message: $message) {
    to
    from
  message
    }
  }
`;

class GetMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            subscription: ""
        };
    }

    handleChange = event => {
        this.setState({
            message: event.target.value
        });
    };

    handleClick = (e, sendMessage, to, from, message) => {
        e.preventDefault();
        sendMessage({ variables: { to, from, message } });
        this.setState({
            message: ""
        });
    };

    subscriptionHandler = allMessages => {
        this.setState({
            subscription: allMessages
        });
    };

    render() {
        console.log(this.state);
        const { message, subscription } = this.state;
        const { to, from, classes } = this.props;
        let align = "left";
        return (
            <>
                <Query query={MESSAGES}>
                    {({ loading, error, data, subscribeToMore }) => {
                        if (loading) return <CircularProgress />;
                        if (error) return `Error!: ${error}`;
                        console.log('data of query', data);
                        let count = 0;
                        let defaultMessage = '';
                        const allMessages = data.messages.map(message => {
                            if ((message.from === from && message.to === to) || (message.from === to && message.to === from)) {
                                count++;
                                if (message.from === from && message.to === to) {
                                    align = 'right'
                                }
                                else {
                                    align = 'left'
                                }

                                return message.message;
                            }
                            else {
                                count = 0;
                                return defaultMessage;
                            }
                        });
                        console.log('count ', count);
                        return (
                            <>
                                <h4 align="center">
                                    {from} is connected with {to}
                                </h4>
                                <ShowMessage
                                    message={{ to, from, allMessages, align, count }}
                                    subscribeToMore={subscribeToMore}
                                />
                            </>
                        );
                    }}
                </Query>
                <Mutation mutation={SEND_MESSAGE}>
                    {(sendMessage, { data }) => (
                        <TextField
                            value={message}
                            label="Enter Message"
                            fullWidth
                            onChange={this.handleChange}
                            margin="100%"
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={e => {
                                                if (message) {
                                                    this.handleClick(e, sendMessage, to, from, message);
                                                }
                                            }}
                                        >
                                            <Send />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                </Mutation>
            </>
        );
    }
}

export default GetMessages;
