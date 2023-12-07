// src/Grid.js
import React, { useState, useEffect } from 'react';
import './Grid.css';
import PercentBar from './PercentBar';
import Dialog from '@mui/material/Dialog';

import { blendColors } from '../assets/blendColors.js';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import waterDrop1 from '../assets/sounds/waterDrop1.mp3';
import waterDrop2 from '../assets/sounds/waterDrop2.mp3';
import waterDrop3 from '../assets/sounds/waterDrop3.mp3';
import waterDrop4 from '../assets/sounds/waterDrop4.mp3';
import waterDrop5 from '../assets/sounds/waterDrop5.mp3';

const audioFiles = [waterDrop1, waterDrop2, waterDrop3, waterDrop4, waterDrop5];

const Grid = ({ rows, cols, colors, speed, enableSound, squarePaintedTwiceCheck, gridName, handleGridUpdate, format }) => {
    const [grid, setGrid] = useState(Array(rows).fill(Array(cols).fill(null)));
    const [isCellPainted, setIsCellPainted] = useState(Array(rows).fill(Array(cols).fill(false)));
    const [paintCounts, setPaintCounts] = useState(Array(rows).fill(Array(cols).fill(0))); // Matrix to store paint counts
    const [totalPaintCount, setTotalPaintCount] = useState(0);
    const [maxPaintCount, setMaxPaintCount] = useState(0);
    const [averagePaintCounts, setAveragePaintCounts] = useState(Array(rows).fill(Array(cols).fill(0))); // Matrix to store average paint counts
    const [colorCount, setColorCount] = useState({})
    const [filledPercentage, setFilledPercentage] = useState(0);

    const [gridData, setGridData] = useState({
        total: 0,
        maxSingleSquare: 0,
        averagePaintDropsPerSquare: 0,
        filledPercent: 0
    })

    useEffect(() => {
        if (format === "multi") {
            const updatedGridData = {
            total: totalPaintCount,
            maxSingleSquare: maxPaintCount,
            averagePaintDropsPerSquare: averagePaintCounts,
            filledPercent: filledPercentage
        };
    
        setGridData(updatedGridData);
    
        // Pass the updatedGridData directly to handleGridUpdate
        handleGridUpdate(gridName, updatedGridData);
        }

        
    }, [totalPaintCount, maxPaintCount, averagePaintCounts, filledPercentage]);
    


    const randomizeSquare = () => {

        //Stopping criterion
        if (enableSound) {
            const randomAudioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
            // Create an audio object
            const audio = new Audio(randomAudioFile);
            // Play the selected audio
            audio.play();
        }

        if (squarePaintedTwiceCheck) {
            console.log(grid)
            if (maxPaintCount >= 2) return
        }

        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        setColorCount(prevCounts => {
            const updatedCounts = { ...prevCounts };
            updatedCounts[randomColor] = (updatedCounts[randomColor] || 0) + 1;
            return updatedCounts;
        });

        setPaintCounts((prevCounts) => {
            let totalPaintCount = 0;
            const updatedCounts = prevCounts.map((row, rowIndex) =>
                row.map((count, colIndex) => {
                    if (rowIndex === randomRow && colIndex === randomCol) {
                        const updatedCount = count + 1;
                        totalPaintCount += updatedCount;
                        if (updatedCount > maxPaintCount) {
                            setMaxPaintCount(updatedCount); // Update max paint count
                        }
                        return updatedCount;
                    }
                    totalPaintCount += count;
                    return count;
                })
            );

            // Calculate average and update grid
            const averagePaintCount = totalPaintCount / (rows * cols);
            setIsCellPainted((prevPainted) => {
                const newPainted = prevPainted.map((row, rowIndex) =>
                    row.map((cell, colIndex) => rowIndex === randomRow && colIndex === randomCol)
                );
                return newPainted;
            });

            setAveragePaintCounts(averagePaintCount)
            return updatedCounts;
        });

        const newGrid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                if (rowIndex === randomRow && colIndex === randomCol) {
                    if (cell) {
                        return blendColors(cell, randomColor);
                    }
                    return randomColor;
                }
                return cell;
            })
        );

        const newPaints = isCellPainted.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                if (rowIndex === randomRow && colIndex === randomCol) {
                    return true;
                }
                return false;
            })
        );
        setIsCellPainted(newPaints)


        setGrid(newGrid);




    };

    useEffect(() => {
        const isGridFull = grid.flat().every((cell) => cell !== null);

        if (!isGridFull) {
            // If the grid is not full, continue randomizing after a short delay
            setTimeout(randomizeSquare, speed);

        } else {
            const endTime = new Date();


            console.log(`Painting completed at: ${endTime}`);
            console.log(colorCount)

        }

        const totalCells = rows * cols;
        const filledCells = grid.flat().filter(cell => cell !== null).length;
        const percentage = (filledCells / totalCells) * 100;
        setFilledPercentage(percentage);
    }, [grid]);

    useEffect(() => {
        let total = 0

        {
            Object.entries(colorCount).map(([color, count]) => (
                total = total + count
            ))
        }

        setTotalPaintCount(total)
    }, [paintCounts, setPaintCounts])

    return (
        <div className="grid">
            <div className='progress' style={{ position: 'relative' }}>
                <h2>Grid Filled Status</h2>
                <p>{filledPercentage.toFixed(2)}% filled</p>
                <PercentBar percent={filledPercentage} />
            </div>

            {format === "single" && filledPercentage === 100 && <div className="button-container">
                <Link to="/simulationLandingPage">
                    <Button variant="contained" color="primary">
                        Continue
                    </Button>
                </Link>
            </div>}

            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div key={colIndex} style={{ backgroundColor: cell }} className={`cell ${isCellPainted[rowIndex][colIndex] ? 'filled' : ''}`}>
                            {cell && (
                                <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
                                    <div onAnimationEnd={() => {
                                        const newPaints = isCellPainted.map((row, rowI) =>
                                            row.map((cell, colI) => {
                                                if (rowIndex === rowI && colIndex === colI) {
                                                    return false;
                                                }
                                                return false;
                                            })
                                        );
                                        setIsCellPainted(newPaints)

                                    }} className="droplet" style={{ backgroundColor: cell }}></div>
                                    <div className="splash splash1" style={{ backgroundColor: cell }}></div>
                                    <div className="splash splash2" style={{ backgroundColor: cell }}></div>
                                    <div className="splash splash3" style={{ backgroundColor: cell }}></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}

            {/* <h2>Stats</h2>
            <div>
                <p>Total paint drops: {totalPaintCount} </p>
            </div>
            <div className='stats'>
                {Object.entries(colorCount).map(([color, count]) => (
                    <p key={color}>
                        {color}: {count}
                    </p>
                ))}
                <div>
                    Most paint drops on a single square: {maxPaintCount}
                </div>
                <div>
                    Average paint drops per square: </div>
                <div>
                    {averagePaintCounts}
                </div>

            </div>
            <div className='progress' style={{ position: 'relative' }}>
                <h2>Grid Filled Status</h2>
                <p>{filledPercentage.toFixed(2)}% filled</p>
                <PercentBar percent={filledPercentage} />
            </div> */}

        </div>
    );
};

export default Grid;
