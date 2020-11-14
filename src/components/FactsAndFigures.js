import React from 'react'
import useBookApi from './BookApi'
import LoadingSpinner from './LoadingSpinner';

/**
 * Used the BookApi to get an array of all books
 * 
 * @returns statistical data about all books or the component LoadingSpinner
 */
export default function FactsAndFigures() {

    const bookList = useBookApi('get', 'books');

    //Set Guard: Use const bookList and return facts and figures only if BookApi had send the response
    if(!bookList) {
        return <LoadingSpinner name="Bücherliste"/>
    }

    const statisticalDataObject = () => bookList.reduce(function(acc, book) {
        acc.totalBooks++;
        
        if(acc.oldestBook === '') {
            acc.oldestBook = book.published;
        } else if (acc.oldestBook > book.published) {
            acc.oldestBook = book.published;
        }

        if(acc.newestBook === '') {
            acc.newestBook = book.published;
        } else if (acc.newestBook < book.published) {
            acc.newestBook = book.published;
        }

        acc.sumOfAllRatings += book.rating;
        const countRatings = acc.ratingArray.push(book.rating);
        acc.averageRating = acc.sumOfAllRatings / countRatings;

        return acc;
    }, {
        totalBooks: 0, oldestBook: '', newestBook: '', ratingArray: [], averageRating: 0, sumOfAllRatings: 0
    })

    const options = { /*weekday: 'long',*/ year: 'numeric', month: 'long', day: 'numeric' };
    const dateTimeFormat = new Intl.DateTimeFormat('de-DE', options);

    return (
        <main id="plar">
            <h1>Zahlen und Fakten zur Büchersammlung</h1>
            <div className="ui green statistic">
                <div className="label">
                    Anzahl Bücher in der Sammlung
                </div>
                <div className="value">
                    {statisticalDataObject().totalBooks}
                </div>
                <div className="ui horizontal divider">
                    AND
                </div>
                <div className="label">
                    Durchschnittliche Bewertung
                </div>
                <div className="value">
                    {statisticalDataObject().averageRating.toFixed(2)}
                </div>
                <div className="ui horizontal divider">
                    AND
                </div>
                <div className="label">
                    Älteste Veröffentlichung
                </div>
                <div className="value">
                    {dateTimeFormat.format(new Date(statisticalDataObject().oldestBook))}
                </div>
                <div className="ui horizontal divider">
                    AND
                </div>
                <div className="label">
                    Neueste Veröffentlichung
                </div>
                <div className="value">
                    {dateTimeFormat.format(new Date(statisticalDataObject().newestBook))}
                </div>
            </div>
        </main>
    )
}
