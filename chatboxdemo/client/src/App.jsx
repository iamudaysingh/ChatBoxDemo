import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ChatRoute } from "./routes";
import MyRoute from "./pages/MyRoute";

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache,
  link
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/start" />
            </Route>
            <ChatRoute path="/start" component={MyRoute} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
