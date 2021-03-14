import React from 'react';
import PropTypes from 'prop-types';
import './FormBook.css';
import { connect } from 'react-redux';
import { updateBook } from '../../actions/book';

class FormBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      author: '',
      genre: '',
      pages: '',
    };
  }

  componentDidMount = () => {
    const { actionToPerform, buttonId, books } = this.props;
    if (actionToPerform === 'Save Changes') {
      const book = books.filter(x => x.id.toString() === buttonId);
      this.setState({
        name: book[0].name,
        author: book[0].author,
        genre: book[0].genre,
        pages: book[0].pages,
      });
    }
  }

  handleChangeName = e => {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangeAuthor = e => {
    this.setState({
      author: e.target.value,
    });
  }

  handleChangeGenre = e => {
    this.setState({
      genre: e.target.value,
    });
  }

  handleChangePages = e => {
    this.setState({
      pages: e.target.value,
    });
  }

  handleSubmit = (name, author, genre, pages) => {
    const { addBook } = this.props;
    addBook(name, author, genre, pages);
  }

  handleUpdate = async id => {
    const { name, author, genre, pages } = this.state;

    const {
      user, updateBook, changeEditForm,
    } = this.props;

    const data = {
      id,
      user_id: user.user.id,
      name,
      author,
      genre,
      pages,
    };

    await updateBook(data);
    changeEditForm();
  }

  render() {
    const { name, author, genre, pages } = this.state;
    const {
      actionToPerform, books, buttonId, changeEditForm, changeAddForm,
    } = this.props;
    const book = books.filter(x => x.id.toString() === buttonId);
    return (
      <div>
        <h3>
          {actionToPerform}
          {' '}
          Book
        </h3>
        <form
          className="one-form"
          onSubmit={
           actionToPerform === 'Add'
             ? () => this.handleSubmit(name, author, genre, pages) : () => this.handleUpdate(book[0].id)
}
        >
          <div className="one-parameter">
            <label htmlFor="name">
              Name:
              <input
                required
                id="name"
                type="text"
                name="name"
                defaultValue={buttonId === '0' ? name : books[0].name}
                onChange={this.handleChangeName}
              />
            </label>
          </div>
          <div className="one-parameter">
            <label htmlFor="author">
              Author:
              <textarea
                id="author"
                name="author"
                defaultValue={buttonId === '0' ? author : books[0].author}
                onChange={this.handleChangeAuthor}
              />
            </label>
          </div>

          <div className="one-parameter">
            <label htmlFor="genre">
              genre
              <textarea
                id="genre"
                name="genre"
                defaultValue={buttonId === '0' ? genre : books[0].genre}
                onChange={this.handleChangeGenre}
              />
            </label>
          </div>
          <div className="one-parameter">
            <label htmlFor="pages">
              No of pages:
              <textarea
                id="pages"
                name="pages"
                defaultValue={buttonId === '0' ? pages : books[0].pages}
                onChange={this.handleChangePages}
              />
            </label>
          </div>
          <div className="buttons-form">
            {actionToPerform === 'Add' && <button type="submit">{actionToPerform}</button>}
            {actionToPerform === 'Save Changes' && <button type="submit">Save</button>}
            {actionToPerform === 'Add' && <button type="button" onClick={changeAddForm}>Cancel</button>}
            {actionToPerform === 'Save Changes' && <button type="button" onClick={changeEditForm}>Cancel</button>}
          </div>
        </form>
      </div>
    );
  }
}

FormBook.propTypes = {
  addBook: PropTypes.func,
  actionToPerform: PropTypes.string,
  changeAddForm: PropTypes.func,
  books: PropTypes.instanceOf(Array),
  buttonId: PropTypes.string,
  updateBook: PropTypes.func,
  changeEditForm: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),

};

FormBook.defaultProps = {
  changeAddForm: () => {},
  addBook: () => {},
  actionToPerform: '',
  books: [],
  buttonId: '0',
  updateBook: () => {},
  changeEditForm: () => {},
  user: {},
};

const mapStateToProps = state => ({
  user: state.user,
  books: state.books,
});
const mapDispatchToProps = dispatch => ({
  updateBook: data => dispatch(updateBook(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormBook);
