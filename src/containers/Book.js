/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormBook from '../components/FormBook';
import { fetchUserBook, createBook, deleteBook } from '../actions/book';
import { loginStatus } from '../actions/user';
import '../stylesheets/Book.css';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm: false,
      editForm: false,
      idBook: '0',
    };
  }

  componentDidMount() {
    const { user, fetchUserBook } = this.props;
    const ID = user.user.id;
    fetchUserBook(ID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { book } = this.props;
    const {
      addForm, editForm,
    } = this.state;
    return book !== nextProps.book
    || addForm !== nextState.addForm
    || editForm !== nextState.editForm;
  }

  addBook = (name, author, genre, pages) => {
    const { createBook, user } = this.props;
    const { addForm } = this.state;
    const user_id = user.user.id;
    createBook({ name, author, genre, pages, user_id });
    this.setState({
      addForm: !addForm,
    });
  };

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  displayEdit= e => {
    const { editForm } = this.state;
    this.setState({
      editForm: !editForm,
      idBook: e.target.id,
    });
  }

  deleteBook = id => {
    const { user } = this.props;
    const { deleteBook } = this.props;
    const user_id = user.user.id;
    deleteBook({ user_id, id });
  }

   changeEditForm = () => {
     const { editForm } = this.state;
     this.setState({
       editForm: !editForm,
     });
   }

   changeAddForm = () => {
     const { addForm } = this.state;
     this.setState({
       addForm: !addForm,
     });
   }

   render() {
     const { book } = this.props;
     const {
       addForm, editForm, idBook,
     } = this.state;
     return (
       <main className="main">
         <button type="button" className="add-book" onClick={this.displayForm}>+</button>
         <div className="books">
           { !editForm && !addForm && <h3> All your Books</h3>}

           {book.length === 0 && !addForm && <div className="tracking">Start adding a book you want to track here!</div>}
           {book.map(book => (
             <div key={book.id}>
               { !editForm && !addForm && (
               <div className="one-book">
                 <div className="buttons">
                   <button type="button" onClick={() => this.deleteBook(book.id)}>
                     <i className="fa fa-minus-square" />
                   </button>
                   <button type="button" onClick={this.displayEdit}>
                     <i className="fa fa-pencil-square" id={book.id} />
                   </button>
                 </div>
                 <div className="book-info">
                   <Link to={{
                     pathname: `book/${book.id}`,
                     state: {
                       namebook: book.name,
                     },
                   }}
                   >
                     {!editForm && (
                     <div>
                       <div className="book-name">
                         <p>Name:</p>
                         <p>Author:</p>
                         <p>Genre:</p>
                         <p>Pages:</p>
                       </div>
                       <div className="book-description">
                         <p>{book.name}</p>
                         <p>{book.author}</p>
                         <p>{book.genre}</p>
                         <p>{book.pages}</p>
                       </div>
                     </div>
                     )}
                   </Link>
                 </div>
               </div>
               )}
               { editForm && book.id.toString() === idBook && <FormBook actionToPerform="Save Changes" buttonId={idBook} changeEditForm={this.changeEditForm} />}
             </div>
           ))}
         </div>
         <div className="newbook">
           {addForm && <FormBook addBook={this.addBook} actionToPerform="Add" changeAddForm={this.changeAddForm} />}
         </div>
       </main>
     );
   }
}

const mapStateToProps = state => (
  {
    user: state.user,
    isLogin: state.user.isLogin,
    book: state.book,
  });
const mapDispatchToProps = dispatch => ({
  fetchUserBook: data => dispatch(fetchUserBook(data)),
  createBook: data => dispatch(createBook(data)),
  deleteBook: id => dispatch(deleteBook(id)),
  loginStatus: () => dispatch(loginStatus()),
});

Book.propTypes = {
  fetchUserBook: PropTypes.func,
  createBook: PropTypes.func,
  deleteBook: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  book: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  })),
};

Book.defaultProps = {
  createBook: () => {},
  deleteBook: () => {},
  fetchUserBook: () => {},
  book: {},
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
