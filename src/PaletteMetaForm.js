import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { AllPalettesContext } from './contexts/AllPalettesContext';
import { NewPaletteNameContext } from './contexts/NewPaletteNameContext';
import { CustomColorsContext } from './contexts/CustomColorsContext';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

function PaletteMetaForm(props) {
  const { history, open, hideForm } = props;

  const {allPalettes, addToAllPalettes } = useContext(AllPalettesContext);
  const { newPaletteName, setNewPaletteName } = useContext(NewPaletteNameContext);
  const {customColors} = useContext(CustomColorsContext);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
    allPalettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    ));
  }, [allPalettes]);

  const savePalette = () => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: customColors
    };
    addToAllPalettes(allPalettes, newPalette);
    history.push("/");
  }

  return (
    <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={savePalette}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette. Make sure it's unique.
          </DialogContentText>
          <Picker />
          <TextValidator
            label='Palette Name'
            value={newPaletteName}
            onChange={(e) => setNewPaletteName(e.target.value)}
            fullWidth
            margin="normal"
            validators={["required", "isPaletteNameUnique"]}
            errorMessages={["Enter A Name", "Name already taken"]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideForm} color="primary">
            Cancel
          </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save Palette
              </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

export default withRouter(PaletteMetaForm);
