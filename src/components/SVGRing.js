import React from 'react'


/**
 * SVG element
 * Two animated circle with text
 * Can be integrated into any component
 * 
 * @returns SVG
 */
export default function SVGRing() {
    return (
        <svg height="250" width="250">
            <filter id="fire">
                <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence"/>
                <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G">
                    <animate id="fireAni1" attributeName="scale" from="0" to="30" begin="1s" dur="6s" fill="freeze"/>
                    <animate attributeName="scale" values="30;15;30" begin="fireAni1.end" dur="6s" repeatCount="indefinite"/>
                </feDisplacementMap>
            </filter>
            <circle id="redCircle" cx="125" cy="125" r="90" stroke="#F40707" strokeWidth="20" fill="none" filter="url(#fire)" opacity="0.9"/>
            <circle cx="125" cy="125" r="100" stroke="#ed6b1a" strokeWidth="20" fill="none" filter="url(#fire)" opacity="0.9"/>
            <text x="75" y="140" fill="#5d6363" fontSize="50">ToKa</text>
        </svg>
    )
}
