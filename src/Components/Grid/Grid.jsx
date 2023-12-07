// src/components/Grid.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Grid = () => {
  const [gridData, setGridData] = useState([]);
  const [simulationResults, setSimulationResults] = useState([]);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  const initializeGrid = (x, y) => {
    const initialGrid = Array.from({ length: y }, () => Array(x).fill(null));
    setGridData(initialGrid);
  };

  const runSimulation = () => {
    if (isSimulationRunning) return;

    setIsSimulationRunning(true);

    const updatedGrid = gridData.map((row) =>
      row.map(() => {
        const randomColor = Math.floor(Math.random() * 3) + 1;
        return randomColor;
      })
    );

    setGridData(updatedGrid);

    setIsSimulationRunning(false);
  };

  const runMultipleSimulations = () => {
    if (isSimulationRunning) return;

    setIsSimulationRunning(true);

    const independentVariableValues = [2, 4, 8, 16, 32];
    const fixedValues = {
      color1: 'red',
      color2: 'green',
      color3: 'blue',
      stoppingCriterion: 'StoppingCriterion',
      repetitions: 5,
    };

    const results = [];

    independentVariableValues.forEach((value) => {
      const simulationResult = runSimulationOnce(value, fixedValues);
      results.push(simulationResult);
    });

    setSimulationResults(results);
    setIsSimulationRunning(false);
  };

  const runSimulationOnce = (independentValue, fixedValues) => {
    const simulationResult = {
      independentValue,
      ...calculateSimulationValues(/* Simulation data */),
    };

    return simulationResult;
  };

  const calculateSimulationValues = (simulationData) => {
    // Perform calculations for A, A1, A2, A3, B, and C based on simulationData
    // Replace with actual calculations
    return {
      A: /* Calculation for A */5,
      A1: /* Calculation for A1 */5,
      A2: /* Calculation for A2 */5,
      A3: /* Calculation for A3 */5,
      B: /* Calculation for B */5,
      C: /* Calculation for C */5,
    };
  };

  useEffect(() => {
    initializeGrid(10, 10);
  }, []);

  return (
    <div>
      <h1>Paint Simulation Grid</h1>
      <div className="grid-container">
        {gridData.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((color, colIndex) => (
              <div key={colIndex} className={`grid-cell color-${color}`}>
                {/* Render grid cells here */}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={runSimulation} disabled={isSimulationRunning}>
        Run Single Simulation
      </button>

      <Link to="/results">
        <button onClick={runMultipleSimulations} disabled={isSimulationRunning}>
          Run Multiple Simulations
        </button>
      </Link>
    </div>
  );
};

export default Grid;
