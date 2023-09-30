import React, { useEffect } from 'react';
import './Keyboard.css';

const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete']
];

function Keyboard({ onKeyPress, keyColors }) {

    const handleKeyClick = (key) => {
        // console.log(`Key clicked: ${key}`);
        onKeyPress(key);
    };

    function getColorClass(key, keyColors) {
        let colorClass = '';

        for (let i = 0; i < keyColors.length; i++) {
            if (keyColors[i].includes(key)) {
                if (colorClass === '') {
                    colorClass = getColorClassName(i);
                } else if (colorClass === 'key-yellow' && getColorClassName(i) === 'key-green') {
                    colorClass = 'key-green';
                }
            }
        }

        return colorClass;
    }

    function getColorClassName(index) {
        const classNames = ['key-black', 'key-yellow', 'key-green'];
        return classNames[index] || '';
    }

    return (
        <div className="keyboard">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((key) => {
                        const colorClass = getColorClass(key, keyColors);
                        return (
                            <button
                                key={key}
                                id={key}
                                className={`key ${colorClass} ${key === "Delete" || key === "Enter" ? "special" : ""}`}
                                onClick={() => handleKeyClick(key)}
                            >
                                {key}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    );
}

export default Keyboard;
