import React, { useEffect, useState } from 'react';
import Grid from '../../Components/Grid.jsx';
import ColorPickers from '../../Components/ColorPickers/ColorPickers.jsx';
import './Form.css';
import Divider from '../../Components/Divider.jsx';
import { blendColors } from '../../assets/blendColors.js';
import { Typography, TextField, Button, Slider, Grid as MuiGrid, Checkbox, FormControlLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';

const InputForm = () => {
    const initialColors = ['#ff0000', '#00ff00', '#0000ff']; // Default colors: red, green, blue
    const [colors, setColors] = useState(initialColors);
    const [renderGrid, setRenderGrid] = useState(false)
    const [speed, setSpeed] = useState(0)

    const [runsOutOfPaint, setRunsOutOfPaint] = useState(false);
    const [paintAmount, setPaintAmount] = useState('');
    const [enableSound, setEnableSound] = useState(false); // New state for sound option
    const [squarePaintedTwiceCheck, setSquarePaintedTwiceCheck] = useState(false)

    const [formData, setFormData] = useState({
        xDimension: 10,
        yDimension: 10
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRenderGrid(false)
    };

    const addColor = (color) => {
        setColors([...colors, color])
    }

    const handleColorChange = (newColor, index) => {
        const updatedColors = [...colors];
        updatedColors[index] = newColor.hex;
        setColors(updatedColors);
    };

    const handleSubmit = () => {
        setOpen(true);

        setTimeout(setRenderGrid(false), 0)

        // e.preventDefault();

        const xDimension = parseInt(formData.xDimension);
        const yDimension = parseInt(formData.yDimension);

        console.log(xDimension)
        console.log(yDimension)

        if (!isNaN(xDimension) && xDimension > 0 && !isNaN(yDimension) && yDimension > 0) {
            // Valid dimensions, create the grid
            setRenderGrid(true)
            console.log("Started paint at: " + Date());
        } else {
            console.log("No values")
            // Invalid dimensions, handle the error (e.g., show an error message)
        }
        // Handle form submission logic here
    };

    const handleReset = () => {
        setRenderGrid(false)
    }

    const handleChange = (e) => {
        setRenderGrid(false)
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSquarePaintedTwiceChange = (event) => {

        setSquarePaintedTwiceCheck(event.target.checked)
        console.log("Bam" + squarePaintedTwiceCheck)
    }

    const handleCheckboxChange = (event) => {
        setRunsOutOfPaint(event.target.checked);
    };

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

                <h2>Single Grid Form</h2>

                <h2>USER INPUTS</h2>

                <ColorPickers colors={colors} onColorChange={handleColorChange} addColor={addColor} />

                {/* <Divider /> */}

                <form onSubmit={handleSubmit} className='form-text'>
                    <MuiGrid container spacing={2} sx={{
                        alignItems: 'center'
                    }}>
                        <MuiGrid item xs={12} sm={6}>
                            <TextField
                                label="X"
                                variant="outlined"
                                fullWidth
                                name="xDimension"
                                value={formData.xDimension}
                                onChange={handleChange}
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12} sm={6}>
                            <TextField
                                label="Y"
                                variant="outlined"
                                fullWidth
                                name="yDimension"
                                value={formData.yDimension}
                                onChange={handleChange}
                            />
                        </MuiGrid>

                        <MuiGrid item xs={12}>
                            <Typography gutterBottom>
                                Stopping Criterion:
                            </Typography>
                            <FormControlLabel
                                control={<Checkbox name="allSquaresColored" defaultChecked />}
                                label="All squares colored"
                            />
                            <FormControlLabel
                                control={<Checkbox name="oneSquarePaintedTwice" onChange={handleSquarePaintedTwiceChange} />}
                                label="One square painted twice"
                            />
                            <FormControlLabel
                                control={<Checkbox name="runsOutOfPaint" checked={runsOutOfPaint} onChange={handleCheckboxChange} />}
                                label="Runs out of paint"
                            />
                            {runsOutOfPaint && (
                                <>
                                    <p></p>
                                    <TextField
                                        label="Amount of paint"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        value={paintAmount}
                                        onChange={handlePaintAmountChange}
                                    /></>
                            )}
                        </MuiGrid>

                        <MuiGrid item xs={12}>
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
                        </MuiGrid>

                    </MuiGrid>
                </form>

                <FormControlLabel
                    control={<Checkbox name="enableSound" onChange={handleSoundChange} />}
                    label="Enable sound"
                />
                <p></p>
                {!renderGrid && <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>}

            </div>


            <Dialog open={open} onClose={handleClose} maxWidth="md" >
               
                <div className='dialogue-container'>
                    {renderGrid && <Grid rows={parseInt(formData.yDimension)} cols={parseInt(formData.xDimension)} colors={colors} speed={speed} enableSound={enableSound} squarePaintedTwiceCheck={squarePaintedTwiceCheck} format={"single"}/>}
                    {/* {renderGrid && <Button onClick={handleReset}>Reset</Button>} */}

                </div>
            </Dialog>
        </div>
    );
};

export default InputForm;
