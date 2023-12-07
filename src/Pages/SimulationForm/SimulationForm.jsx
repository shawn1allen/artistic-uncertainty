import React, { useEffect, useState } from 'react';
import Grid from '../../Components/Grid.jsx';
import './SimulationForm.css';
import ColorPickers from '../../Components/ColorPickers/ColorPickers.jsx';
import Divider from '../../Components/Divider.jsx';
import { blendColors } from '../../assets/blendColors.js';
import { Typography, TextField, Button, Slider, Grid as MuiGrid, Checkbox, FormControlLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';


const SimulationForm = () => {
    const initialColors = ['#ff0000', '#00ff00', '#0000ff']; // Default colors: red, green, blue
    const [colors, setColors] = useState(initialColors);
    const [renderGrid, setRenderGrid] = useState(false)
    const [speed, setSpeed] = useState(0)

    const [paintAmount, setPaintAmount] = useState('');
    const [enableSound, setEnableSound] = useState(false); // New state for sound option

    const [squarePaintedTwiceCheck, setSquarePaintedTwiceCheck] = useState(false)


    // const [xAxisCheck, setXAxisCheck] = useState(false);
    const [repititionsCheck, setRepititionsCheck] = useState(false);
    const [dimensionCheck, setDimensionCheck] = useState(false);

    const [repititionList, setRepititionList] = useState('')
    const [dimensionList, setDimensionList] = useState('')

    const [repititionConstant, setRepetitionConstant] = useState(0)
    const [dimensionConstant, setDimensionConstant] = useState(5)

    const [repArray, setRepArray] = useState([])
    const [dimArray, setDimArray] = useState([])

    const [masterGridData, setMasterGridData] = useState({})

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRenderGrid(false)
    };

    const handleGridUpdate = (gridName, data) => {
        // Update the grid data in the state
        setMasterGridData((prevGridData) => ({
            ...prevGridData,
            [gridName]: data,
        }));

        console.log(masterGridData)
    };

    const [error, setError] = useState('');
    const [validList, setValidList] = useState(false)


    const addColor = (color) => {
        setColors([...colors, color])
    }

    const handleColorChange = (newColor, index) => {
        const updatedColors = [...colors];
        updatedColors[index] = newColor.hex;
        setColors(updatedColors);
    };

    const handleSubmit = (e) => {
        setTimeout(setRenderGrid(false), 0)

        e.preventDefault();

        console.log("Submitted")

        setRenderGrid(true)
        handleOpen()

        // const xDimension = parseInt(formData.xDimension);
        // const yDimension = parseInt(formData.yDimension);

        // console.log(xDimension)
        // console.log(yDimension)

        // if (!isNaN(xDimension) && xDimension > 0 && !isNaN(yDimension) && yDimension > 0) {
        //     // Valid dimensions, create the grid
        //     setRenderGrid(true)
        //     console.log("Started paint at: " + Date());
        // } else {
        //     console.log("No values")
        //     // Invalid dimensions, handle the error (e.g., show an error message)
        // }
        // Handle form submission logic here
    };

    const handleReset = () => {
        setRenderGrid(false)
    }



    const handleDimensionChange = (event) => {
        setDimensionCheck(event.target.checked)
        // setXAxisCheck(false)
        setRepititionsCheck(false)
        setDimensionList('')
        setRepititionList('')
    }

    // const handleXAxisChange = (event) => {
    //     setDimensionCheck(false)
    //     // setXAxisCheck(event.target.checked)
    //     setRepititionsCheck(false)
    // }

    const handleCheckboxChange = (event) => {
        setDimensionCheck(false)
        // setXAxisCheck(false)
        setRepititionsCheck(event.target.checked)
        setDimensionList('')
        setRepititionList('')
    }


    const handleDimensionList = (e) => {
        console.log('Changed dims')
        setDimensionList(e.target.value)
    }

    const handleRepititionList = (e) => {
        console.log('Changed reps')
        setRepititionList(e.target.value)
    }

    const handleRepititionConstant = (e) => {
        setRepetitionConstant(e.target.value)
    }

    const handleDimensionConstant = (e) => {
        setDimensionConstant(e.target.value)
    }


    const handleErrorValidation = (repititions, dimensions) => {

        console.log(repititions)
        console.log(dimensions)

        const repititionsArray = repititions.split(',').map(Number);
        const dimensionsArray = dimensions.split(',').map(Number);

        console.log(repititionsArray.length)
        console.log(dimensionsArray.length)

        if (repititionsArray.some(isNaN) || dimensionsArray.some(isNaN) || repititionsArray.some(num => num % 1 !== 0) || dimensionsArray.some(num => num % 1 !== 0)) {
            setError('List contains non integer values.');
            return
        } else {
            setError('');

            // Further processing or sending the data to the server can be done here
            // console.log();
        }

        if (repititionsArray.length < 5 && dimensionsArray.length < 5) {
            setError('Not enough values. Enter at least 5.');
            return
        } else {
            setError('');

            // Further processing or sending the data to the server can be done here
            // console.log();
        }

        if (repititionsArray.length > 10 || dimensionsArray.length > 10) {
            setError('Too many values. Maximum is 10.');
            return
        } else {
            setError('');

            // Further processing or sending the data to the server can be done here
            // console.log();
        }

        setValidList(true)
        setRepArray(repititionsArray)
        setDimArray(dimensionsArray)

    }

    const handleSquarePaintedTwiceChange = (event) => {

        setSquarePaintedTwiceCheck(event.target.checked)
        console.log("Bam" + squarePaintedTwiceCheck)
    }


    const handlePaintAmountChange = (event) => {
        setPaintAmount(event.target.value);
    };

    const handleSoundChange = (event) => {
        // Your logic for handling sound checkbox change
        setEnableSound(event.target.checked);
        console.log(enableSound)
    };

    useEffect(() => {
        console.log(enableSound)
    }, [enableSound, setEnableSound])

    return (
        <div className='Form-page'>
            <div className='form-container'>

                <h2>Experiment Form</h2>

                <h2>USER INPUTS</h2>

                <ColorPickers colors={colors} onColorChange={handleColorChange} addColor={addColor} />

                <FormControlLabel
                                control={<Checkbox name="oneSquarePaintedTwice" onChange={handleSquarePaintedTwiceChange} />}
                                label="One square painted twice"
                            />

                {/* <Divider /> */}

                <form className='form-text'>
                    
                        <MuiGrid item xs={12}>
                            <Typography gutterBottom>
                                Independent Variable:
                            </Typography>
                            {/* <FormControlLabel
                                control={<Checkbox name="dimension" checked={dimensionCheck} onChange={handleDimensionChange} />}
                                label="Dimensions"
                            /> */}
                            {/* <FormControlLabel
                                control={<Checkbox name="x-axis" checked={xAxisCheck} onChange={handleXAxisChange} />}
                                label="X Value"
                            /> */}
                            <FormControlLabel
                                control={<Checkbox name="repititions" checked={repititionsCheck} onChange={handleCheckboxChange} />}
                                label="Repititions"
                            />

                        </MuiGrid>


                        <Button onClick={() => handleErrorValidation(repititionList, dimensionList)}>Check numbers</Button>

                        {dimensionCheck &&
                            <MuiGrid item xs={12} sm={6}>
                                <TextField
                                    label="Dimensions (comma separated list)"
                                    variant="outlined"
                                    fullWidth
                                    name="Dimensions"
                                    value={dimensionList}
                                    onChange={handleDimensionList}

                                />
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                            </MuiGrid>
                        }

                        {repititionsCheck &&
                            <MuiGrid item xs={12} sm={6}>
                                <TextField
                                    label="Repititions (comma separated list)"
                                    variant="outlined"
                                    fullWidth
                                    name="reps"
                                    value={repititionList}
                                    onChange={handleRepititionList}

                                />
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                            </MuiGrid>
                        }

                        {repititionsCheck && validList &&
                            <>
                                <MuiGrid item xs={12} sm={6}>
                                    <TextField
                                        label="Dimension Constant"
                                        variant="outlined"
                                        fullWidth
                                        name="dimConstant"
                                        value={dimensionConstant}
                                        onChange={handleDimensionConstant}

                                    />
                                    {error && <p style={{ color: 'red' }}>{error}</p>}

                                </MuiGrid>
                            </>
                        }

                        {dimensionCheck && validList &&
                            <>
                                <MuiGrid item xs={12} sm={6}>
                                    <TextField
                                        label="Repitition Constant"
                                        variant="outlined"
                                        fullWidth
                                        name="repConstant"
                                        value={repititionConstant}
                                        onChange={handleRepititionConstant}

                                    />

                                </MuiGrid>
                            </>
                        }

                        {validList && <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>}

                        <Dialog open={open} onClose={handleClose} fullScreen maxWidth="md" >
                            <Button onClick={handleClose}>------------ Close Experiment ------------</Button>
                            <div className='dialogue-container'>
                                {renderGrid && repititionsCheck && repArray.map((repValue, index1) => {
                                    return <div className='repetition-container' key={index1}>
                                        <p>Grid Set {index1 + 1} </p>
                                        {
                                            Array.from({ length: repValue }).map((_, index2) => {

                                                // const newGridData = { /* ... */ }; // Collect any additional data needed for the grid
                                                // handleGridUpdate('Grid1', newGridData); // Use a unique name for each grid

                                                const tempGridName = `grid${index1}${index2}`
                                                // console.log(tempGridName)

                                                return <div className='grid-item' key={index2}>

                                                    <Grid rows={parseInt(dimensionConstant)} cols={parseInt(dimensionConstant)} colors={colors} speed={speed} enableSound={enableSound} squarePaintedTwiceCheck={squarePaintedTwiceCheck} gridName={tempGridName} handleGridUpdate={handleGridUpdate} format={"multi"} />
                                                </div>

                                            })
                                        }
                                    </div>


                                })}
                            </div>
                        </Dialog>


                        {/* <Button onClick={() => console.log(masterGridData)}>Print Data</Button> */}

                        {/* <MuiGrid item xs={12} sm={6}>
                            <TextField
                                label="Y"
                                variant="outlined"
                                fullWidth
                                name="yDimension"
                                value={formData.yDimension}
                                onChange={handleChange}
                            />
                        </MuiGrid> */}






                        {/* <MuiGrid item xs={12}>
                            <Typography id="speed-slider" gutterBottom>
                                Speed Delay: {speed} ms
                            </Typography>
                            <Slider
                                value={speed}
                                onChange={(e) => setSpeed(e.target.value)}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                                aria-labelledby="speed-slider"
                            />
                        </MuiGrid> */}

                    
                </form>

                {/* <FormControlLabel
                    control={<Checkbox name="enableSound" onChange={handleSoundChange} />}
                    label="Enable sound"
                /> */}
                {/* <p></p>     */}
                {/* {!renderGrid && <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>} */}

            </div>

            {/* {renderGrid && <Button onClick={handleReset}>Reset</Button>}

            {renderGrid && <Grid rows={parseInt(formData.yDimension)} cols={parseInt(formData.xDimension)} colors={colors} speed={speed} enableSound={enableSound} xAxisCheck={xAxisCheck} />} */}

        </div>
    );
};

export default SimulationForm;
