import React from 'react';
import SVGRing from './SVGRing';

/**
 * Home page of the 
 * 
 * @returns general information about the appliction and the component SVGRing
 */
export default function Home() {
    return (
        <main id="plar">
            <div className="ui center aligned segment">
                <h1>Büchersammlung</h1>
                
                <p>Diese Applikation dient der persönlichen Vertiefung und Erweiterung von Wissen.</p>
                <p>In dieser Applikation kann eine bestehende Büchersammlung angezeigt, erweitert und in der Detailansicht gelöscht werden.</p>
                <p>In dem Reiter "Einstellungen" lässt sich die API wieder in den Ursprungszustand versetzen.</p>
                
                <p>Gemacht mit
                    <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank"> React</a>,
                    <a href="https://semantic-ui.com/" rel="noopener noreferrer" target="_blank"> Semantic-ui</a> und
                    <a href="https://api3.angular-buch.com/swagger-ui/#/" rel="noopener noreferrer" target="_blank"> BookMonkey 3 API</a>
                </p>
                <SVGRing />
            </div>
        </main>
    )
}
