import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { AllPalettesContext } from './contexts/AllPalettesContext';
import { DrawerOpenContext } from './contexts/DrawerOpenContext';
import {CustomColorsContext} from './contexts/CustomColorsContext';
import arrayMove from 'array-move';

import useStyles from './styles/NewPaletteFormsStyles';

function NewPaletteForm(props) {
  const {allPalettes } = useContext(AllPalettesContext);
  const {drawerOpen, setDrawerOpen} = useContext(DrawerOpenContext);
  const {customColors, setCustomColors} = useContext(CustomColorsContext);


  const maxColors = 20;
  const paletteIsFull = customColors.length >= maxColors;
  const classes = useStyles();

  const makeRandomColor = () => {
    const allColors = allPalettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    return allColors[rand];
  }

  const addRandomColor = () => {
    const {color, name} = makeRandomColor();
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
      <PaletteFormNav />
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
          <ColorPickerForm />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

export default withRouter(NewPaletteForm);