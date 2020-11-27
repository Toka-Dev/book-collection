import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

/**
 * Shows a single thumbnail of a book
 * Uses the routing library hooks - useParams and useLocation -
 * to get the appropriate thumbnail
 * 
 * @returns one thumbnail
 */
export default function Thumbnail() {

    const isbn = useParams().isbn;
    const pathname = useLocation().pathname;

    const bookUrl = () => {
        return pathname.substring(pathname.lastIndexOf(`${isbn}`) + isbn.length + 1 )
    }

    return (
        <div className="ui centered segment">
            <Link to={`/bookdetails/${isbn}`} className="ui animated button">
                <div className="visible content">
                    Zurück zur Detailansicht
                </div>
                <div className="hidden content">
                    <i className="angle double left icon" />
                </div>
            </Link>
            <img className="ui image" src={bookUrl()} alt="Buchcover"/>
        </div>
    )
}
