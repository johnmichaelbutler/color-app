import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import arrayMove from 'array-move';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import PaletteFormNav from './PaletteFormNav';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm'
import { AllPalettesContext } from './contexts/AllPalettesContext';
import {CustomColorsContext} from './contexts/CustomColorsContext';

import useStyles from './styles/NewPaletteFormsStyles';

function NewPaletteForm() {
  const {allPalettes } = useContext(AllPalettesContext);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const {customColors, setCustomColors} = useContext(CustomColorsContext);


  const maxColors = 20;
  const paletteIsFull = customColors.length >= maxColors;
  const classes = useStyles();

  const addRandomColor = () => {
    const allColors = allPalettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[rand];
    let isDuplicateColor = true;
    while(isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = customColors.some(color => color.name === randomColor.name)
    }
    const {color, name} = randomColor
    const newColor = {color: color, name: name};
    setCustomColors([...customColors, newColor]);
  }

  const removeColor = (colorName) => {
    const filteredColors = customColors.filter(color => color.name !== colorName)
    setCustomColors(filteredColors);
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setCustomColors(arrayMove(customColors, oldIndex, newIndex))
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
          <div className={classes.buttons}>
            <Button className={classes.button} variant='contained' color="secondary" onClick={() => setCustomColors([])}>
              Clear Palette
            </Button>
            <Button className={classes.button} disabled={paletteIsFull} variant='contained' color="primary" onClick={() => addRandomColor()}>
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            customColors={customColors}
            setCustomColors={setCustomColors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={customColors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
      </main>
    </div>
  );
}

export default withRouter(NewPaletteForm);