import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { DrawerOpenContext } from './contexts/DrawerOpenContext';
import useStyles from './styles/PaletteFormNavStyles';

function PaletteFormNav(props) {
  const classes = useStyles();

  const [formShowing, setFormShowing] = useState(false);

  const {drawerOpen, setDrawerOpen} = useContext(DrawerOpenContext);

  const showForm = () => {
    setFormShowing(true);
  }

  const hideForm = () => {
    setFormShowing(false);
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
          <Link to="/" className={classes.link}>
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
              >
                Go Back
              </Button>
            </Link>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={showForm}
            >
              Open form dialog
            </Button>
            {formShowing && <PaletteMetaForm hideForm={hideForm} openForm={formShowing} />}
          </div>
      </AppBar>
    </div>
  )
}

export default withRouter(PaletteFormNav);
