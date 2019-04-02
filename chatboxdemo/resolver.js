const Messages = require("./constants/message");
const Users = require("./constants/user");
const CHAT_CHANNEL = "CHAT_CHANNEL";
const USER_CREATED = "USER_CREATED";

const resolvers = {
  Query: {
    users(root, args, context) {
      return Users;
    },
    friends(root, { name }, context) {
      let Friends = [];
      Users.forEach(user => {
        if (user.name == name) {
          return user.friends.map(id => {
            Users.forEach(myUser => {
              if (myUser.id == id) {
                Friends.push(myUser.name);
              }
            });
          });
        }
      });
      return Friends;
    },
    user(root, { name, email }, context) {
      let newUser;
      Users.forEach(user => {
        if (user.name == name && user.email == email) {
          newUser = user;
        }
      });
      return newUser;
    },
    messages(root, args, context) {
      return Messages;
    }
  },

  Mutation: {
    sendMessage(root, { to, from, message }, { pubsub }) {
      const chat = { to, from, message };
      Messages.push(chat);
      pubsub.publish(CHAT_CHANNEL, { messageSent: chat });
      return chat;
    },
    addUser(root, { name, email }, { pubsub }) {
      const newUser = {
        id: Users.length + 1,
        name: name,
        email: email,
        friends: []
      };
      Users.push(newUser);
      pubsub.publish(USER_CREATED, { userCreated: newUser });
      return newUser;
    }
  },

  Subscription: {
    messageSent: {
      subscribe: (root, args, { pubsub }) => {
        return pubsub.asyncIterator(CHAT_CHANNEL);
      }
    },
    userCreated: {
      subscribe: (root, args, { pubsub }) => {
        return pubsub.asyncIterator(USER_CREATED);
      }
    }
  }
};

module.exports = resolvers;
