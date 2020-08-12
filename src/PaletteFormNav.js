import React, { useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { DrawerOpenContext } from './contexts/DrawerOpenContext';
import { AllPalettesContext } from './contexts/AllPalettesContext';
import { NewPaletteNameContext } from './contexts/NewPaletteNameContext';
import { CustomColorsContext } from './contexts/CustomColorsContext';

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
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px"
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
  navBtns: {

  }

}));

function PaletteFormNav(props) {
  const classes = useStyles();
  const {customColors} = useContext(CustomColorsContext);
  const { newPaletteName, setNewPaletteName } = useContext(NewPaletteNameContext);
  const {drawerOpen, setDrawerOpen} = useContext(DrawerOpenContext);
  const {allPalettes, addToAllPalettes } = useContext(AllPalettesContext);
  const { history } = props;

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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='default'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
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
            <Link to="/">
                <Button
                  variant='contained'
                  color='secondary'
                >
                  Go Back
                </Button>
              </Link>
          </div>
      </AppBar>
    </div>
  )
}

export default withRouter(PaletteFormNav);
