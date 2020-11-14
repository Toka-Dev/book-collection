import React from 'react';
import useBookApi from './BookApi';
import BookListItem from './BookListItem';
import LoadingSpinner from './LoadingSpinner';
import Css from './BookList.module.css';
import { useParams } from 'react-router-dom';

/**
 * Used the BookApi to get an array of all books
 * 
 * @returns a list with all books or the component LoadingSpinner
 */
export default function BookList() {
    
    const isbn = useParams().isbn;
    const bookList = useBookApi('get', 'books');

    //Set Guard: Use const bookList and return bookListItems only if BookApi had send the response
    if(!bookList) {
        return <LoadingSpinner name='Bücherliste'/>
    }

    return (
        <main id="plar" className={`ui list ${Css.bg}`}>
            <h1>Meine Büchersammlung</h1>
            {
                isbn &&
                <p className="green">Das Buch mit der ISBN {isbn} wurde gelöscht</p>
            }
            {
                bookList.map(book => <BookListItem key={book.isbn} book={book} />)
            }
        </main>
    )
}
