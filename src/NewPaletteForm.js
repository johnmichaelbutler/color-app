import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import DraggableColorList from './DraggableColorList';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { AllPalettesContext } from './contexts/AllPalettesContext';
import { DrawerOpenContext } from './contexts/DrawerOpenContext';
import arrayMove from 'array-move';


const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function NewPaletteForm(props) {
  
  const [newColorName, setNewColorName] = useState("");
  const [currentColor, setCurrentColor] = useState("teal");
  
  const {allPalettes, addToAllPalettes} = useContext(AllPalettesContext);
  const {drawerOpen, setDrawerOpen} = useContext(DrawerOpenContext);
  const [colors, setColors] = useState(allPalettes[0].colors);
  const [newPaletteName, setNewPaletteName] = useState("");
  
  const maxColors = 20;
  const paletteIsFull = colors.length >= maxColors;
  const { history } = props;

  const classes = useStyles();

  useEffect(() => {
    console.log("allPalettes", allPalettes);
    console.log("initial colors", colors);
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      allPalettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      ));
    ValidatorForm.addValidationRule('isColorNameUnique', value => {
      return colors.every(({name}) => name.toLowerCase() !== value.toLowerCase());
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return colors.every((color) => color.color !== currentColor);
    });
  }, [colors, currentColor, allPalettes]);

  const savePalette = () => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    };
    addToAllPalettes(allPalettes, newPalette);
    history.push("/");
  }

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    }
    setColors([...colors, newColor]);
    setNewColorName("");
  }

  const makeRandomColor = () => {
    const allColors = allPalettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    return allColors[rand];
  }

  const addRandomColor = () => {
    const {color, name} = makeRandomColor();
    const newColor = {color: color, name: name};
    setColors([...colors, newColor]);
    console.log("colors after random", colors);
  }

  const removeColor = (colorName) => {
    const filteredColors = colors.filter(color => color.name !== colorName)
    setColors(filteredColors);
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        classes={classes}
        newPaletteName={newPaletteName}
        setNewPaleteName={setNewPaletteName}
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
        <Typography variant="h4">Design Your Palette</Typography>
        <Button variant='contained' color="secondary" onClick={() => setColors([])}>
          Clear Palette
        </Button>
        <Button disabled={paletteIsFull} variant='contained' color="primary" onClick={() => addRandomColor()}>
          Random Color
        </Button>
        <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => setCurrentColor(newColor.hex)}
        />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
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
          >
            {paletteIsFull ? "Palette Full" : "Add Color" }
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

export default withRouter(NewPaletteForm);