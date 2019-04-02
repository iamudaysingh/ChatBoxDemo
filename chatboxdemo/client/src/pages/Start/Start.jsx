import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GetUser from '../GetUser';

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            buttonVisibility: true,
            name: '',
            email: '',
            hitQuery: false,
        }
    }

    handlechange = field => (event) => {
        this.setState({
            [field]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
            buttonVisibility: false
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        this.setState({
            open: false,
            hitQuery: true,
        });
    };


    render() {
        const { name, email, hitQuery, buttonVisibility } = this.state;
        return (
            <div>
                {
                    buttonVisibility ?
                        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
                            Start
                </Button> : ''
                }
                {
                    (hitQuery) ? (
                        <GetUser name={name} email={email} />
                    ) : ''
                }
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Enter Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={name}
                            label="Name"
                            fullWidth
                            onClick={this.handlechange('name')}
                            onChange={this.handlechange('name')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            value={email}
                            label="Email Address"
                            fullWidth
                            onClick={this.handlechange('email')}
                            onChange={this.handlechange('email')}
                            margin="normal"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Start;
