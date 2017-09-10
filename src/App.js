import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import BooksList from './components/BooksList';
import './App.css';

class BooksApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" component={BooksList} />
          <Route path="/search" component={SearchPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp