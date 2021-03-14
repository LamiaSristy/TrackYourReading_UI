/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './Signup.css';
import { createUser } from '../../actions/user';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      errors: '',
    };
  }

  handleChangeName = e => {
    this.setState({
      username: e.target.value,
    });
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  }

  handleChangePasswordConfirm = e => {
    this.setState({
      password_confirmation: e.target.value,
    });
  }

   handleSubmit= async e => {
     e.preventDefault();
     const {
       username, password, password_confirmation,
     } = this.state;
     const { createUser } = this.props;

     const response = await createUser({ username, password, password_confirmation });
     if (response && response.status === 200) {
       const { history } = this.props;
       history.push('/main');
     } else {
       const { error } = this.props;
       this.setState({
         errors: error,
       });
     }
   }

   handleErrors = () => {
     const { errors } = this.state;
     setTimeout(() => this.setState({ errors: '' }), 3000);
     return (
       <ul>
         {errors.map(error => <li key={error}>{error}</li>)}
       </ul>
     );
   }

   render() {
     const {
       username, errors, password, password_confirmation,
     } = this.state;
     return (
       <section className="signup">
         <div className="errors-div">
           {errors ? this.handleErrors() : null}
         </div>
         <h2>Sign Up</h2>
         <form onSubmit={this.handleSubmit}>
           <input
             placeholder="Username"
             type="text"
             name="username"
             value={username}
             onChange={this.handleChangeName}
             required
           />
           <input
             placeholder="Password"
             type="password"
             name="password"
             value={password}
             onChange={this.handleChangePassword}
             required
           />
           <input
             placeholder="Password confirmation"
             type="password"
             name="password_confirmation"
             value={password_confirmation}
             onChange={this.handleChangePasswordConfirm}
             required
           />
           <button placeholder="submit" type="submit">
             Sign In
           </button>
         </form>
       </section>
     );
   }
}

const mapStateToProps = state => ({
  user: state.user,
  isLogin: state.user.isLogin,
  error: state.user.error,
});
const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(createUser(data)),
});

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  createUser: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Array),

};

Signup.defaultProps = {
  error: [],
  history: {},
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
