import React from 'react';
import './Grid.css';

const numRows = 6;
const numCols = 5;

function Grid({data, cellColors}) {

    // console.log("Cell colors in Grid comp: ",cellColors)
    // console.log(data);
    const gridCells = [];
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellContent = data[row][col];
            const cell = (
                <div key={cellId} className={`cell ${cellColors[row][col]} `}>
                   <strong> {cellContent} </strong>
                </div>
            );
            gridCells.push(cell);
        }
    }

    return (
        <>
            <div className="grid-container">
                {gridCells}
            </div>
        </>
    );
}

export default Grid;
