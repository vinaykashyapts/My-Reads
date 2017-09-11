import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookGrid from './BookGrid';

class BooksList extends Component { 

    render() {
        const { currentlyReading, wantToRead, read } = this.props

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

    renderShelf(books, shelfTitle) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, index) =>
                            <BookGrid
                                key={index}
                                book={book}
                                handleBookShelf={this.props.handleBookShelf}
                            />)}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BooksList;