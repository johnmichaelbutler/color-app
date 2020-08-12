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

function PaletteMetaForm(props) {
  const [open, setOpen] = useState(false);
  const { history } = props;

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
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <ValidatorForm onSubmit={savePalette}>
              <TextValidator
                label='Palette Name'
                value={newPaletteName}
                onChange={(e) => setNewPaletteName(e.target.value)}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter A Name", "Name already taken"]}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save Palette
              </Button>
            </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(PaletteMetaForm);
