import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import BookGrid from './BookGrid';
import * as BooksAPI from '../BooksAPI';

class BooksList extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    };

    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        BooksAPI.getAll().then(books => {
            const filterCurrentlyReading = new RegExp(escapeRegExp('currentlyReading'));
            let currentlyReading = books ? books.filter(book => filterCurrentlyReading.test(book.shelf)) : null;

            const filterWantToRead = new RegExp(escapeRegExp('wantToRead'));
            let wantToRead = books ? books.filter(book => filterWantToRead.test(book.shelf)) : null;

            const filterRead = new RegExp(escapeRegExp('read'));
            let read = books ? books.filter(book => filterRead.test(book.shelf)) : null;

            this.setState({ currentlyReading, wantToRead, read });
        });
    }

    handleBookShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getBooks());
    }

    renderShelf(books, title) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, index) =>
                            <BookGrid
                                key={index}
                                book={book}
                                handleBookShelf={this.handleBookShelf.bind(this)}
                            />)}
                    </ol>
                </div>
            </div>
        )
    }

    render() {
        const { currentlyReading, wantToRead, read } = this.state;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.renderShelf(currentlyReading, 'Currently Reading')}
                        {this.renderShelf(wantToRead, 'Want to Read')}
                        {this.renderShelf(read, 'Read')}
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'>
                        Search and Add a book
                    </Link>
                </div>
            </div>
        );
  }
}

export default BooksList;