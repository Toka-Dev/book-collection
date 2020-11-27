import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Shows the cover, title, authors, release date and rating of the book
 * 
 * @param {object} props, one book object
 * @returns one book with some information as a link for more details
 */
export default function BookListItem(props) {
    
    const options = { /*weekday: 'long',*/ year: 'numeric', month: 'long', day: 'numeric' };
    const myPublished = new Date(props.book.published);
    const dateTimeFormat = new Intl.DateTimeFormat('de-DE', options);

    const arrayOfStars = () => {
        const stars = [];
        for (let i = 0; i < props.book.rating; i++) {
            stars.push(i);
        }
        return stars;
    };

    return (
        <Link className="item" to={`/bookdetails/${props.book.isbn}`}>
            {
                props.book.thumbnails &&
                props.book.thumbnails[0] &&
                <img className="ui image tiny" src={props.book.thumbnails[0].url} alt={props.book.thumbnails[0].title ? props.book.thumbnails[0].title : "Buchcover"} />
            }
            <div className="content">
                <div className="header">
                    {props.book.title}
                </div>
                <div className="description">
                    <div>
                        {
                            props.book.authors &&
                            <span>von {props.book.authors.join(', ')} | {dateTimeFormat.format(myPublished)}</span>
                        }
                    </div>
                    <div>
                        {
                            arrayOfStars().map(star => <i key={star} className="yellow star icon"></i>)
                        }
                    </div>
                </div>
            </div>
            <hr />
        </Link>
    )
}
