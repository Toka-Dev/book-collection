import React from 'react';

/**
 * Shows that data is currently being loaded
 * 
 * @param {string} props, name of the loading typ
 * @returns a loader
 */
export default function LoadingSpinner(props) {
    return (
        <div className="ui active inverted dimmer">
            <div className="ui text loader large">Lade {props.name} ...</div>
        </div>
    )
}