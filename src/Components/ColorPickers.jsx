import React, { useState } from 'react';
import { ChromePicker, SketchPicker } from 'react-color';
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';
import './ColorPickers.css'
import Backdrop from '@mui/material/Backdrop';
import { Button } from '@mui/material';

const ColorPickers = ({ colors, onColorChange, addColor }) => {
  const [currentIndex, setCurrentIndex] = useState()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (i) => {
    console.log(i)
    setCurrentIndex(i)
    setOpen(true);
  };

  const handleChange = (color) => {
    console.log("Hello")
  }

  return (
    <div className='color-pickers'>
      {colors.map((color, index) => (
        <div key={index} className="color-picker" >
          <button className='color-square' style={{ backgroundColor: `${color}` }} onClick={() => handleOpen(index)}></button>
          
          <Backdrop
            sx={{ color: '52,52,52,.5', zIndex: 1000 }}
            open={open}
          >
            <div style={{ width: '100vw', height: '100vh', position: 'fixed'}} onClick={() => {
              handleClose()
            }}></div>
            <Wheel color={color} onChange={(newColor) => onColorChange(newColor, currentIndex)} />
          </Backdrop>
          <p style={{ marginTop: '20px' }}>{color}</p>
        </div>
      ))}

      <div>
        <button className='add-color-btn' onClick={() => addColor("#ffffff")}>+</button>
      <p style={{ marginTop: '13px' }}>Add a new color!!!</p>
      </div>
      

    </div>
  );
};

export default ColorPickers;