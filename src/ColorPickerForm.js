import React, { useState, useEffect, useContext } from 'react';
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { CustomColorsContext } from './contexts/CustomColorsContext';
import { CurrentColorContext } from './contexts/CurrentColorContext';
import useStyles from './styles/ColorPickerFormStyles';

function ColorPickerForm() {
  const [newColorName, setNewColorName] = useState("");
  const {customColors, setCustomColors} = useContext(CustomColorsContext);
  const {currentColor, setCurrentColor} = useContext(CurrentColorContext);
  const maxColors = 20;
  const paletteIsFull = customColors.length >= maxColors;
  const classes = useStyles();

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', value => {
      return customColors.every(({name}) => name.toLowerCase() !== value.toLowerCase());
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return customColors.every((color) => color.color !== currentColor);
    });
  }, [customColors, currentColor]);

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    }
    setCustomColors([...customColors, newColor]);
    setNewColorName("");
  }


  return (
    <div className={classes.root}>
      <ChromePicker
        color={currentColor}
        onChangeComplete={(newColor) => setCurrentColor(newColor.hex)}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
        <TextValidator
          autoFocus
          variant="filled"
          margin="normal"
          placeholder="Color Name"
          className={classes.colorInput}
          value={newColorName}
          onChange={e =>setNewColorName(e.target.value)}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={["Enter A Name", "Color name must be unique", "Color already used!"]}
        />
        <Button
          variant="contained"
          color="primary"
          style={{backgroundColor: paletteIsFull ? "grey" : currentColor}}
          type="submit"
          disabled={paletteIsFull}
          className={classes.addColor}
        >
          {paletteIsFull ? "Palette Full" : "Add Color" }
        </Button>
      </ValidatorForm>
    </div>
  )
}

export default ColorPickerForm;
