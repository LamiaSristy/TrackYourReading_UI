/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { fetchReadingDays, createDay, deleteDay } from '../actions/trackings';
import { loginStatus } from '../actions/user';
import FormTracking from '../components/FormTracking';
import '../stylesheets/Trackings.css';

class Trackings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: props.match.params.id,
      addEdit: false,
      buttonId: '0',
      addMore: false,
    };
  }

  componentDidMount() {
    const {
      user, fetchReadingDays,
    } = this.props;

    const { ID } = this.state;
    const userID = user.user.id;

    fetchReadingDays(userID, ID);
  }

  createDate = date => {
    const dateFormat = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateFormat.toUTCString(undefined, options);
  }

  displayInfo = () => {
    const { displayForm } = this.props;
    displayForm();
  }

  addTracking = (date, page_no, user_id) => {
    const { ID } = this.state;
    const { createDay } = this.props;
    const book_id = ID;
    createDay({
      book_id, date, page_no, user_id
    });
  }

  deleteTracking = id => {
    const { ID } = this.state;
    const { deleteDay, user } = this.props;
    const user_id = user.user.id;
    const book_id = ID;
    deleteDay({ book_id, id, user_id });
  }

  changeEditForm = () => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
    });
  }

  changeAddForm = () => {
    const { displayForm } = this.props;
    displayForm();
  }

  displayEdit = e => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
      buttonId: e.target.id,
    });
  }

  displayMore = e => {
    const { addMore } = this.state;
    this.setState({
      addMore: !addMore,
      buttonId: e.target.id,
    });
  }

  displayTracking = () => {
    const { location } = this.props;
    const { state } = location;
    if (state) {
      const { bookname } = state;
      return bookname;
    }
    const { history } = this.props;
    history.push('/main');
    return null;
  }

  render() {
    const { addEdit, buttonId, addMore } = this.state;
    const { trackings, addForm } = this.props;

    const name = this.displayTracking();

    return (
      <div className="trackings">
        <div className="trackings-buttons">
          <button type="button" className="go-back" onClick={this.displayInfo}>
            <Link to="/main">
              <i className="fa fa-arrow-circle-left" aria-hidden="true" />
            </Link>
          </button>
          <button type="button" className="add-day" onClick={this.displayInfo}>
            <i className="fa fa-plus-circle" aria-hidden="true" />
          </button>
        </div>
        {!addEdit && !addForm && (
        <p>
          Tracking of Books pages:
          {name && <span>{name}</span>}
        </p>
        )}
        {trackings.map(day => (
          <div key={day.id}>
            {!addEdit && !addForm && (
              <div>
                <div className="day">
                  <div className="date">
                    <p>
                      {' '}
                      <i className="fa fa-calendar" aria-hidden="true" />
                      {this.createDate(day.date).slice(0, 16)}
                    </p>
                    <div>
                      <button type="button" onClick={() => this.deleteTracking(day.id)}>
                        <i className="fa fa-trash" />
                      </button>
                      <button type="button" onClick={this.displayEdit}><i className="fa fa-pencil-square" aria-label="pencil" id={day.id} /></button>
                    </div>
                  </div>
                  <div className="page_no">
                    <p>
                      Page read last time:
                    </p>
                    <p>{day.page_no}</p>
                  </div>              
                </div>
              </div>
            )}
            {addEdit && buttonId === day.id.toString() && (
            <FormTracking
              actionToPerform="Save Changes"
              buttonId={buttonId}
              changeEditForm={this.changeEditForm}
            />
            )}
          </div>
        ))}
        {addForm && <FormTracking actionToPerform="Add" addTracking={this.addTracking} changeAddForm={this.changeAddForm} /> }
      </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trackings: state.tracking,
});
const mapDispatchToProps = dispatch => ({
  fetchReadingDays: (datauser, databook) => dispatch(fetchReadingDays(datauser, databook)),
  loginStatus: () => dispatch(loginStatus()),
  createDay: data => dispatch(createDay(data)),
  deleteDay: (id, id2) => dispatch(deleteDay(id, id2)),
});

Trackings.propTypes = {
  addForm: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  fetchReadingDays: PropTypes.func,
  deleteDay: PropTypes.func,
  createDay: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  trackings: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  })),
  location: PropTypes.shape({
    state: PropTypes.shape({ bookname: PropTypes.string }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  displayForm: PropTypes.func,

};

Trackings.defaultProps = {
  addForm: false,
  fetchReadingDays: () => {},
  deleteDay: () => {},
  createDay: () => {},
  displayForm: () => {},
  user: {},
  trackings: [],
  location: {},
  history: {},
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trackings));
