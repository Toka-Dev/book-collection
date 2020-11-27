import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useBookApi, { bookApi } from './BookApi';
import LoadingSpinner from './LoadingSpinner';

/**
 * Detail view of a book
 * Uses the BookApi to get one special book
 * 
 * @returns detailed information about one book or the component LoadingSpinner
 */
export default function BookDetails() {
    
    const isbn = useParams().isbn;
    const book = useBookApi('get', `book/${isbn}`)
    const history = useHistory();
    
    //Set Guard: Uses const book and returns bookdetails only if BookApi has send the response
    if(!book) {
        return <LoadingSpinner name='Buch' />
    }

    const options = { /*weekday: 'long',*/ year: 'numeric', month: 'long', day: 'numeric' };
    const myPublished = new Date(book.published);
    const dateTimeFormat = new Intl.DateTimeFormat('de-DE', options);

    const arrayOfStars = () => {
        const stars = [];
        for (let i = 0; i < book.rating; i++) {
            stars.push(i);
        }
        return stars;
    };

    const myResult = (data) => {
        if (data === 'OK') {
            history.push(`/booklist/${isbn}`);
        } else {
            console.log(`Fehler: ${data}`);
        }
      }

    const deleteBook = () => {
        bookApi('delete', `book/${isbn}`, myResult);
    }

    return (
        <main id="plar">
            <h1>Detailansicht zur ISBN: {isbn}</h1>
            <div className="ui centered grid">
                <div className="four wide column">
                    {
                        book.thumbnails &&
                        book.thumbnails[0] &&
                        <img className="ui medium image" src={book.thumbnails[0].url} alt={book.thumbnails[0].title ? book.thumbnails[0].title : "Buchcover"} />
                    }
                    <div className="ui hidden divider"></div>
                    <div className="ui mini images">
                        {
                            book.thumbnails &&
                            book.thumbnails[0] &&
                            book.thumbnails.map(thumbnail => <Link to={`/bookdetails/${isbn}/${thumbnail.url}`} key={thumbnail.url}>
                                <img className="ui image tiny" src={thumbnail.url} alt={thumbnail.title ? thumbnail.title : "Buchcover"} />
                            </Link>)
                        }
                    </div>
                </div>
                <div className="twelve wide column">
                    <h3>{book.title}</h3>
                    {
                        book.subtitle &&
                        <div>{book.subtitle}</div>
                    }
                    <p>{dateTimeFormat.format(myPublished)}</p>
                    {
                        book.authors &&
                        <div>von {book.authors.join(', ')}</div>
                    }
                    <div>
                        {
                            arrayOfStars().map(star => <i key={star} className="yellow star icon"></i>)
                        }
                    </div>
                    <hr />
                    {
                        book.description &&
                        <p>{book.description}</p>
                    }
                </div>
            </div>
            <Link to="/booklist" className="ui animated button">
                <div className="visible content">
                    Zurück zur Büchersammlung
                </div>
                <div className="hidden content">
                    <i className="angle double left icon" />
                </div>
            </Link>
            <button className="negative ui button" onClick={deleteBook}>Buch löschen</button>
        </main>
    )
}
