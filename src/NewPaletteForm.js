import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import DraggableColorBox from './DraggableColorBox';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { AllPalettesContext } from './contexts/AllPalettesContext';


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
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState('teal');
  const [colors, setColors] = useState([]);
  const [newPaletteName, setNewPaletteName] = useState("");

  const {allPalettes, addToAllPalettes} = useContext(AllPalettesContext);
  const { history } = props;

  const classes = useStyles();

  useEffect(() => {
    console.log("allPalettes", allPalettes);
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

  const removeColor = (colorName) => {
    const filteredColors = colors.filter(color => color.name !== colorName)
    setColors(filteredColors);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='default'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
          <ValidatorForm onSubmit={savePalette}>
            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              onChange={e => setNewPaletteName(e.target.value)}
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
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <Button variant='contained' color="secondary">
          Clear Palette
        </Button>
        <Button variant='contained' color="primary">
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
            style={{backgroundColor: currentColor}}
            type="submit"
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          {colors.map(color => (
            <DraggableColorBox
              key={color.name}
              color={color.color}
              name={color.name}
              removeColor={() =>removeColor(color.name)}
            />
          ))}
      </main>
    </div>
  );
}

export default withRouter(NewPaletteForm);