import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm'
import { makeStyles } from '@material-ui/core/styles';
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
        <Typography variant="h4">Design Your Palette</Typography>
        <Button variant='contained' color="secondary" onClick={() => setCustomColors([])}>
          Clear Palette
        </Button>
        <Button disabled={paletteIsFull} variant='contained' color="primary" onClick={() => addRandomColor()}>
          Random Color
        </Button>
        <ColorPickerForm />
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