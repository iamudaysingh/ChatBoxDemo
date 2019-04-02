import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GetMessages from "../GetMessages/GetMessages";
import styles from "./style";

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  render() {
    const { match, classes } = this.props;
    const { from, to } = match.params;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Welcome to CHAT BOX
            </Typography>
          </Toolbar>
        </AppBar>
        <GetMessages to={to} from={from} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatBox);

