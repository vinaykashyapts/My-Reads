import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchPage from './components/SearchPage';
import BooksList from './components/BooksList';
import './App.css';

class BooksApp extends React.Component {
  
  state = {
      books: [],
      loading: true
  };

  componentDidMount() {
      this.getBooks();
  }

  getBooks() {
      BooksAPI.getAll().then(books => {
          this.setState({ books: books, loading: false });
      });
  }

  handleBookShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(state => ({
          books: this.state.books.filter(b => b.id !== book.id).concat([ book ]),
          loading: false
        }))
        this.notifyUser(book)
      })
    }
  };

  notifyUser = (book) => {
    location.pathname === '/search' ? 
         this.Search.dialog.showAlert(`${book.title} has been added to your shelf!`)  // TO DO : Style dialog to make it look better
         : null
  }

  render() {
    const state = this.state;
    const currentlyReading = state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = state.books.filter((book) => book.shelf === 'wantToRead')
    const read = state.books.filter((book) => book.shelf === 'read')

    return (
      <BrowserRouter>
        <div className="app">

          <Route exact path="/" render={() => (
            !state.loading ?(
              <BooksList 
                currentlyReading={currentlyReading} 
                wantToRead={wantToRead} 
                read={read} 
                handleBookShelf={this.handleBookShelf.bind(this)}
              />
              ) : (
                <div className="loader"/>
              )
          )}/>
          <Route path="/search" render={({ history }) => (
            <SearchPage 
              ref={(ref) => this.Search = ref}
              handleBookShelf={this.handleBookShelf.bind(this)}
              history={history}
              books={currentlyReading.concat(wantToRead, read)}
            />
          )}/> 
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp