import React, { useState } from 'react';
import { bookApi } from './BookApi';
import checkInputString, { clearEmptyAuthor,clearEmptyThumbnail } from './FormValidation';

/**
 * Adds a new book to the collection
 * 
 * @returns a form with some informations that a new book can have
 */
export default function AddBook() {
    
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtile] = useState('');
    const [rating, setRating] = useState(1);
    const [published, setPublished] = useState('');
    const [description, setDescription] = useState('');
    const [authors, setAuthors] = useState(['']);
    const [thumbnails, setThumbnails] = useState([{title:'', url:''}]);

    const [checkIsbn, setCheckIsbn] = useState({errorExist:true, errorMessage:'Dies ist ein Pflichtfeld!'});
    const [checkTitle, setCheckTitle] = useState({errorExist:true, errorMessage:'Dies ist ein Pflichtfeld!'});
    const [checkPublished, setCheckPublished] = useState({errorExist:true, errorMessage:'Dies ist ein Pflichtfeld!'});
    const [showErrors, setShowErrors] = useState(false);

    const [userMessage, setUserMessage] = useState('');

    const book = () => {
        return {
            isbn: isbn,
            title: title,
            subtitle: subtitle,
            rating: rating,
            published: published,
            description: description,
            authors: authors,
            thumbnails: thumbnails
        }
    }

    const addNewAuthor = () => {
        setAuthors(authors => [...authors, '']);
    }

    const removeAuthor = (index) => {
        setAuthors(authors => {
            const copyAuthorsArray = [...authors];
            copyAuthorsArray.splice(index, 1);
            return copyAuthorsArray;
        })
    }

    const addNewThumbnail = () => {
        setThumbnails(thumbnails => [...thumbnails, {title:'', url:''}]);
    }

    const removeThumbnail = (index) => {
        setThumbnails(thumbnails => {
            const copyThumbnailsArray = [...thumbnails];
            copyThumbnailsArray.splice(index, 1);
            return copyThumbnailsArray;
        })
    }

    const changeIsbn = (value) => {
        setIsbn(value);
        setCheckIsbn(checkInputString(value, 11, 13));
    }

    const changeTitle = (value) => {
        setTitle(value);
        setCheckTitle(checkInputString(value, 1));
    }

    const changeSubtitle = (value) => {
        setSubtile(value);
    }
    
    const changeRating = (value) => {
        setRating(parseInt(value));
    }

    const changePublished = (value) => {
        setPublished(value);
        setCheckPublished(checkInputString(value, 10, 10));
    }

    const changeDescription = (value) => {
        setDescription(value);
    }

    const changeAuthor = (value, index) => {
        setAuthors(authors => {
            const copyAuthorsArray = [...authors];
            copyAuthorsArray[index] = value;
            return copyAuthorsArray;
        })
    }

    const changeThumbnail = (value, index, myProp) => {
        setThumbnails(thumbnails => {
            const copyThumbnailsArray = [...thumbnails];
            if(myProp === 'title') {
                copyThumbnailsArray[index].title = value;
            } else if(myProp === 'url') {
                copyThumbnailsArray[index].url = value;
            }
            return copyThumbnailsArray;
        })
    }

    const checkForm = () => {
        if(checkIsbn.errorExist || checkTitle.errorExist  || checkPublished.errorExist) {
            return false;
        } else {
            return true;
        }
    }
    
    const clearForm = () => {
        setIsbn('');
        setTitle('');
        setSubtile('');
        setRating(1);
        setPublished('');
        setDescription('');
        setAuthors(['']);
        setThumbnails([{title:'', url:''}]);

        setCheckIsbn({errorExist:true, errorMessage:'Dies ist ein Pflichtfeld!'});
        setCheckTitle({errorExist:true, errorMessage:'Dies ist ein Pflichtfeld!'});
        setCheckPublished({errorExist:true, errorMessage:'Dies ist ein Pflichtfeld!'});
        setShowErrors(false);
    }

    const myResult = (data) => {
        setUserMessage(`Erstellvorgang: ${data}`);
        if (data === 'Created') {
            clearForm();
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowErrors(true);
        if(checkForm()) {
            const bookToCreate = {...book()};
            bookToCreate.authors = clearEmptyAuthor(authors);
            bookToCreate.thumbnails =  clearEmptyThumbnail(thumbnails);
            bookApi('post', 'book', myResult, bookToCreate);
        } else {
            setUserMessage('');
        }
    }

    return (
        <main id="plar">
            <h1>Ein neues Buch der Sammlung hinzufügen</h1>
            {
                userMessage &&
                <h3><i>{userMessage}</i></h3>
            }
            <form className="ui form" onSubmit={e => {handleSubmit(e)}}>
                {
                    showErrors &&
                    checkIsbn.errorExist &&
                    <div className="ui pointing below red basic label">
                        {checkIsbn.errorMessage}
                    </div>
                }
                <div className="inline field">
                    <label>ISBN:*</label>
                    <input type="text" name="isbn" placeholder="ISBN" value={isbn}
                            onChange={e => {changeIsbn(e.target.value)}}/>
                </div>
                {
                    showErrors &&
                    checkTitle.errorExist &&
                    <div className="ui pointing below red basic label" >
                        {checkTitle.errorMessage}
                    </div>
                }
                <div className="inline field">
                    <label>Titel:*</label>
                    <input type="text" name="title" placeholder="Buchtitel" value={title}
                            onChange={e => {changeTitle(e.target.value)}}/>
                </div>
                <div className="inline field">
                    <label>Untertitel:</label>
                    <input type="text" name="subtitle" placeholder="Untertitel" value={subtitle}
                            onChange={e => {changeSubtitle(e.target.value)}}/>
                </div>
                <div className="inline field">
                    <label>Bewertung:</label>
                    <select value={rating} onChange={e => {changeRating(e.target.value)}}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                {
                    showErrors &&
                    checkPublished.errorExist &&
                    <div className="ui pointing below red basic label">
                        {checkPublished.errorMessage}
                    </div>
                }
                <div className="inline field">
                    <label>Veröffentlicht:*</label>
                    <input type="date" name="published" placeholder="DD.MM.JJJJ" value={published}
                            onChange={e => {changePublished(e.target.value)}}/>
                </div>
                <div className="inline field">
                    <label>Beschreibung:</label>
                    <textarea value={description} onChange={e => {changeDescription(e.target.value)}}/>
                </div>
                {
                    authors &&
                    authors.map((author, index) =>
                        <div key={index} className="inline field">
                            <label>Autor:</label>
                            <div className="ui action input">
                                <input type="text" name="author" placeholder="Autor" value={author} 
                                        onChange={e => {changeAuthor(e.target.value, index)}}/>
                                <button className="ui button" type="button" onClick={e => {removeAuthor(index)}}>Zeile löschen</button>
                            </div>
                        </div>                        
                    )
                }
                <button type="button" onClick={addNewAuthor}>Weiterer Author</button>
                {
                    thumbnails &&
                    thumbnails.map((thumbnail, index) =>
                        <div key={index} className="inline field">
                            <label>Miniaturbild:</label>
                            <input type="text" name="thumbnailTitle" placeholder="Miniaturbild-Titel" value={thumbnail.title}
                                    onChange={e => {changeThumbnail(e.target.value, index, 'title')}}/>
                            <div className="ui action input">
                                <input type="text" name="thumbnailUrl" placeholder="Miniaturbild-Url" value={thumbnail.url}
                                        onChange={e => {changeThumbnail(e.target.value, index, 'url')}}/>
                                <button className="ui button" type="button" onClick={e => {removeThumbnail(index)}}>Zeile löschen</button>
                            </div>
                        </div>
                    )
                }
                <button type="button" onClick={addNewThumbnail}>Weiteres Miniaturbild</button>
                <br/>
                <br/>
                <input type="submit" value="Buch hinzufügen" />
            </form>
        </main>
    )
}