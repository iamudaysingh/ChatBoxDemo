import React from 'react';
import { Query } from "react-apollo";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import gql from "graphql-tag";
import styles from './style';

const FRIENDS = gql`
    query Friends($from: String!){
        friends(name: $from)
    }`;

class GetFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: '',
        };
    }

    render() {
        const { from, classes } = this.props;
        return (
            <>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                Choose friend whom you want to chat....!!!!
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <Query query={FRIENDS} variables={{ from }}>
                    {({ loading, error, data }) => {
                        if (loading) return <CircularProgress />;
                        if (error) return `Error!: ${error}`;
                        if (data.friends)
                            return data.friends.map(to => <div style={{ textAlign: 'center', margin: 20 }}><Link color="inherit" underline="none" component={RouterLink} to={`/start/${from}/${to}`}>{to}</Link></div>);
                    }}
                </Query>
            </>
        );
    }
}

export default withStyles(styles)(GetFriends);
