import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect,NavLink} from 'react-router-dom';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import BookList from './components/BookList';
import FactsAndFigures from './components/FactsAndFigures';
import Footer from './components/Footer';
import Home from './components/Home';
import Page404 from './components/Page404';
import PageSettings from './components/PageSettings';
import Thumbnail from './components/Thumbnail';

export default function App() {
  return (
    <Router>
      <nav className="ui inverted menu">
        <NavLink to="/home" className="item" activeClassName="active"><i className="home icon" /> Start</NavLink>
        <NavLink to="/booklist" className="item" activeClassName="active"><i className="book icon"></i> Meine Büchersammlung</NavLink>
        <NavLink to="/addbook" className="item" activeClassName="active"><i className="edit icon"></i> Büchersammlung erweitern</NavLink>
        <NavLink to="/factsandfigures" className="item" activeClassName="active"><i className="chart bar icon"></i> Zahlen und Fakten</NavLink>
        <NavLink to="/pagesetting" className="item" activeClassName="active"><i className="cogs icon" /> Einstellungen</NavLink>
      </nav>
      <Switch>
        <Route path="/bookdetails/:isbn/:url">
          <Thumbnail />
        </Route>
        <Route path="/bookdetails/:isbn">
          <BookDetails />
        </Route>
        <Route path="/booklist/:isbn">
          <BookList />
        </Route>
        <Route path="/booklist">
          <BookList />
        </Route>
        <Route path="/addbook">
          <AddBook />
        </Route>
        <Route path="/factsandfigures">
          <FactsAndFigures />
        </Route>
        <Route path="/pagesetting">
          <PageSettings />
        </Route>
        <Route path="/404">
          <Page404 />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="">
          <Redirect to="/home"></Redirect>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}