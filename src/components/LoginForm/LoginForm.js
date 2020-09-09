import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, Input, InputLabel, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

//material UI styles
const styles = theme => ({
  form: {
    marginTop: '3em',
  },
  textFields: {
    padding: '.2em',
  },
  loginBtn: {
    marginTop: '1em',
    width: '30%',
    backgroundColor: 'rgb(124, 199, 250)',
    '&:hover': {
      backgroundColor: 'rgb(93, 173, 226)',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  },
  links: {
    marginTop: '1.5em',
    fontSize: '.85em',
    marginBottom: '2em',
  },
});

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {

    const { classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.login}>
        <h2>Existing User</h2>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h3>
        )}
        <div>
          <InputLabel htmlFor="username">
            <TextField
              size="small"
              className={classes.textFields}
              variant="outlined"
              placeholder="username"
              type="text"
              name="username"
              required
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </InputLabel>
        </div>
        <div>
          <InputLabel htmlFor="password">
            <TextField
              size="small"
              className={classes.textFields}
              variant="outlined"
              placeholder="password"
              type="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </InputLabel>
        </div>
        <div>
          <Button
            className={classes.loginBtn}
            variant="contained"
            type="submit"
            name="submit"
            value="Log In">
            Log In
          </Button>
        </div>
        <div className={classes.links}>
          <Link to="/registration" color="inherit" variant="body2" >Create account</Link>
          <br />
          <Link to="/register" color="inherit" variant="body2">Continue as guest</Link>
        </div>
      </form>
    );
  }
}

const LoginFormStyled = withStyles(styles)(LoginForm);
export default connect(mapStoreToProps)(LoginFormStyled);