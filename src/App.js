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
    BooksAPI.update(book, shelf)
        .then(
          this.setState((state) => ({
            books: state.books.map(b => {
              if (b.title === book.title) {
                  b.shelf = shelf;
                  return b
              } else {
                  return b
              }
            }),
            loading: false
          })),
          location.pathname === '/search' ? alert(`${book.title} has been added to your shelf!`) : null
        )
    };

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