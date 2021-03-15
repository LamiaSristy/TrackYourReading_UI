import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import img_block from '../assets/img/sign_in.png';
import Header from './Header.js';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Book from '../containers/Book';
import Trackings from '../containers/Trackings';
import Footer from './Footer';
import { loginStatus } from '../actions/user';
import '../stylesheets/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      addForm: false,
    };
  }

  componentDidMount() {
    const { loginStatus } = this.props;
    loginStatus();
  }

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  render() {
    const { isLogin } = this.props;
    const { addForm } = this.state;

    return (
      <Router>
        <div className="App">
          <Header />
          <Footer displayForm={this.displayForm} addForm={addForm} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                isLogin ? (
                  <Book />
                ) : (
                  <Login />
                )
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <Login />

              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <Signup />
              )}
            />
            <Route
              exact
              path="/main"
              render={() => (
                isLogin ? (
                  <Book />
                )
                  : (
                    <div className="login-access">
                      <p>You need to Sign In to access here</p>
                      <img src={img_block} alt="img_block" />
                    </div>
                  )
              )}

            />
            <Route
              path="/book/:id"
              render={({ match }) => (
                isLogin ? (
                  <div className="route-trackings">
                    <Trackings match={match} displayForm={this.displayForm} addForm={addForm} />
                    <Footer displayForm={this.displayForm} addForm={addForm} match={match} />
                  </div>
                )

                  : (
                    <div className="login-access">
                      <p>You need to login to access here</p>
                      <img src={img_block} alt="img_block" />
                    </div>
                  )
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
App.propTypes = {
  isLogin: PropTypes.bool,
  loginStatus: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    password: PropTypes.string,
    username: PropTypes.string,
  }),
};

App.defaultProps = {
  // isLogin: false,
  // loginStatus: () => {},
  // user: {},
};

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  user: state.user,
  book: state.book,
});
const mapDispatchToProps = dispatch => ({
  loginStatus: () => dispatch(loginStatus()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
