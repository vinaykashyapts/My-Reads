import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookGrid from './BookGrid';
import * as BooksAPI from '../BooksAPI';

class SearchPage extends Component {
  
  state = {
    books: [],
    query: '',
    loading: false
  };

  handleUpdateQuery(query) {
    if(query === '') {
      this.setState({query: '', books: [], loading: false})
    } else {
      this.setState({loading: true})
      BooksAPI.search(query).then(books => {
        if (books instanceof Array) {
          books = books.map((book) => {
            const bookInShelf = this.props.books.find(b => b.id === book.id);
            if (bookInShelf) {
                book.shelf = bookInShelf.shelf;
            }
            return book;
          });
        } else {
          if (books.error) {
              books = [];
          }
        }
        this.setState({books: books, loading: false})
      });
      this.setState({query})
    }
  }

  render() {
    const { books, query, loading } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'>
            Close Search
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={e => this.handleUpdateQuery(e.target.value)}
            />
          </div>
        </div>
        {!loading && (
          <div className="search-books-results">
            {query && books.length === 0 && !loading && (
              <div className="no-results">No results found</div>
            )}
            <ol className="books-grid">
              {books.map((book, index) => {
                return (
                  <BookGrid
                    key={index}
                    book={book}
                    handleBookShelf={this.props.handleBookShelf}
                  />
                );
              })}
            </ol>
          </div>
        )}
        {loading && (
          <div className="loader"/>
        )}     
      </div>
    );
  }
}

export default SearchPage;