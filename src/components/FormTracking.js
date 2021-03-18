/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDay } from '../actions/trackings';
import '../stylesheets/FormTracking.css';

class FormDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2021-03-10',
      page_no: 105,
    };
  }

  componentDidMount = () => {
    const { actionToPerform, buttonId, trackings } = this.props;
    if (actionToPerform === 'Save Changes') {
      const track = trackings.filter(x => x.id.toString() === buttonId);
      this.setState({
        date: track[0].date,
        page_no: track[0].page_no,
      });
    }
  }

  handleChangeDate = e => {
    this.setState({
      date: e.target.value,
    });
  }

  handleChangePageNo = e => {
    this.setState({
      page_no: e.target.value,
    });
  }

  handleEdit = async (id, book_id) => {
    const {
      date, page_no,
    } = this.state;
    const {
      user, updateDay, changeEditForm,
    } = this.props;
    const data = {
      id,
      user_id: user.user.id,
      book_id,
      date,
      page_no,
    };

    await updateDay(data);
    changeEditForm();
  }

  handleSubmit(date, page_no) {
    const { addTracking, changeAddForm, user } = this.props;
    const user_id = user.user.id;
    addTracking(date, page_no, user_id);
    changeAddForm();
  }

  render() {
    const {
      date, page_no,
    } = this.state;
    const {
      actionToPerform, trackings, buttonId, changeAddForm, changeEditForm,
    } = this.props;
    const track = trackings.filter(x => x.id.toString() === buttonId);

    return (
      <div>
        <p>
          {actionToPerform}
          {' '}
          Tracking for Books
        </p>
        <form className="day">

          <div className="form-div">
            <div className="date-track">
              <div className="date-div">
                <label htmlFor="date">
                  Date:
                  <input
                    id="date"
                    type="date"
                    name="date"
                    defaultValue={buttonId === '0' ? date : track[0].date.slice(0, 10)}
                    onChange={this.handleChangeDate}
                  />
                </label>

              </div>
              <div className="page_no-div">
                <label htmlFor="pageno">
                  No. of Page:
                  <input
                    id="pageno"
                    type="number"
                    name="page_no"
                    defaultValue={buttonId === '0' ? page_no : track[0].page_no}
                    onChange={this.handleChangePageNo}
                  />
                </label>
              </div>
            </div>
            <div className="buttons-form day-buttons">
              {actionToPerform === 'Add' && <button type="button" onClick={() => this.handleSubmit(date, page_no)}>{actionToPerform}</button>}
              {actionToPerform === 'Save Changes' && <button type="button" onClick={() => this.handleEdit(track[0].id, track[0].book_id)}>Save</button>}
              {actionToPerform === 'Add' && <button type="button" onClick={changeAddForm}>Cancel</button>}
              {actionToPerform === 'Save Changes' && <button type="button" onClick={changeEditForm}>Cancel</button>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

FormDay.propTypes = {
  addTracking: PropTypes.func,
  changeEditForm: PropTypes.func,
  changeAddForm: PropTypes.func,
  updateDay: PropTypes.func,
  buttonId: PropTypes.string,
  actionToPerform: PropTypes.string,
  trackings: PropTypes.instanceOf(Array),
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

FormDay.defaultProps = {
  changeAddForm: () => {},
  addTracking: () => {},
  updateDay: () => {},
  changeEditForm: () => {},
  actionToPerform: '',
  trackings: [],
  buttonId: '0',
  user: {},

};

const mapStateToProps = state => ({
  user: state.user,
  trackings: state.tracking,
});
const mapDispatchToProps = dispatch => ({
  updateDay: data => dispatch(updateDay(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDay);
