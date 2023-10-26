import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import ColorPickers from './ColorPickers';
import './Form.css';
import Divider from './Divider';
import { blendColors } from '../assets/blendColors.js';


const InputForm = () => {
    const initialColors = ['#ff0000', '#00ff00', '#0000ff', '#808000']; // Default colors: red, green, blue
    const [colors, setColors] = useState(initialColors);
    const [renderGrid, setRenderGrid] = useState(false)
    const [speed, setSpeed] = useState(0)

    const [formData, setFormData] = useState({
        xDimension: '',
        yDimension: ''
    });

    const addColor = (color) => {
        setColors([...colors, color])
    }

    const handleColorChange = (newColor, index) => {
        const updatedColors = [...colors];
        updatedColors[index] = newColor.hex;
        setColors(updatedColors);
    };

    const handleSubmit = () => {
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

    useEffect(() => {
        const color1 = '#ff0000'; // Red
        const color2 = '#00ff00'; // Green

        const blendedColor = blendColors(color1, color2);
        console.log(blendedColor);
    }, [])

    return (
        <div>



            <div className='form-container'>
                <Divider />
                <h2>COLORS</h2>

                <ColorPickers colors={colors} onColorChange={handleColorChange} addColor={addColor} />

                <Divider />

                <h2>USER INPUTS</h2>

                <form onSubmit={handleSubmit} className='form-text'>
                    <label className='label'>
                        <span>X: </span>
                        <input type="text" name="xDimension" value={formData.xDimension} onChange={handleChange} />
                    </label>
                    <label className='label'>
                        <span>Y: </span>
                        <input type="text" name="yDimension" value={formData.yDimension} onChange={handleChange} />
                    </label>
                    <label className='label'>
                        <span>Colors: </span>
                    </label>
                    <label className='label'>
                        <span>Stopping Criterion: </span>
                    </label>
                    <label className='label'>
                        <span>Speed: (In milliseconds) </span>
                        <input type="text" name="speed" value={speed} onChange={(e) => setSpeed(e.target.value)} />
                    </label>
                </form>

                <Divider />

                <h2>PAINTING</h2>

                {!renderGrid && <button onClick={handleSubmit}>Submit</button>}
                {renderGrid && <button onClick={handleReset}>Reset</button>}
            </div>

            {renderGrid && <Grid rows={parseInt(formData.yDimension)} cols={parseInt(formData.xDimension)} colors={colors} speed={speed} />}
        </div>
    );
};

export default InputForm;
