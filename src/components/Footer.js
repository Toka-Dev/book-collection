import React from 'react'

/**
 * Footer of the application
 * 
 * @returns the current year and a continuing link to GitHub
 */
export default function Footer() {

    const currentYear = new Date();

    return (
        <footer className="ui black inverted center aligned segment">
            <div>
                @{currentYear.getFullYear()}
            </div>
            <div>
                <a href="https://github.com/Toka-Dev" rel="noopener noreferrer" target="_blank">My GitHub</a>
            </div>
        </footer>
    )
}
