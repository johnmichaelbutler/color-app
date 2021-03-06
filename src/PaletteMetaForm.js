import React, { memo, useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AllPalettesContext, PaletteDispatchContext } from './contexts/AllPalettesContext';
import { CustomColorsContext } from './contexts/CustomColorsContext';

function PaletteMetaForm(props) {

  const [emojiOpen, setEmojiOpen] = useState(false);

  const { history, openForm, hideForm, setOpenForm } = props;

  const allPalettes = useContext(AllPalettesContext);
  const [newPaletteName, setNewPaletteName] = useState("");
  const customColors = useContext(CustomColorsContext);
  const paletteDispatch = useContext(PaletteDispatchContext);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
    allPalettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    ));
  }, [allPalettes]);

  const savePalette = (emoji) => {
    setOpenForm(false);
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: customColors,
      emoji: emoji.native
    };
    paletteDispatch({type: "ADD_PALETTE", payload: newPalette})
    history.push("/");
  }

  const handleTextChange = e => setNewPaletteName(e.target.value);

  return (
    <>
      <Dialog open={emojiOpen} onClose={hideForm}>
        <Picker title="Pick a Palette Emoji" onSelect={savePalette} />
      </Dialog>
      <Dialog open={openForm} onClose={hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => setEmojiOpen(true)}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's unique.
            </DialogContentText>
            <TextValidator
              autoFocus
              label='Palette Name'
              value={newPaletteName}
              onChange={handleTextChange}
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
    </>
  );
}

export default memo(withRouter(PaletteMetaForm));
