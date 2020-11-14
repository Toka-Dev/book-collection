import React, { useState } from 'react'
import { bookApi } from './BookApi'

/**
 * Setting for the application
 * 
 * @returns settings to reset the bookmonkey api
 */
export default function PageSettings() {

    const [isStoreReset, setIsStoreReset] = useState(false);

    const myResult = (data) => {
        if(data === "OK") {
            setIsStoreReset(true);
        }
      }

    return (
        <main id="plar">
            <h1>Einstellungen</h1>
            <p>Möchten Sie die BookMonkey API zurücksetzen?</p>
            <button className="positive ui button" onClick={() => { bookApi('delete', 'book', myResult) }}>API zurücksetzen</button>
            {
                isStoreReset &&
                <i className="check icon"></i>
            }
        </main>
    )
}
