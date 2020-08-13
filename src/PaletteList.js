import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { AllPalettesContext } from './contexts/AllPalettesContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useStyles from './styles/PaletteListStyles';

function PaletteList(props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const { allPalettes, deletePalette } = useContext(AllPalettesContext);
  const classes = useStyles();

  const openDialog = id => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  }

  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingId("");
  }

  const confirmDelete = () => {
    deletePalette(deletingId);
    closeDialog();
  }

  return (
    <div className={classes.root}>
      <div classes={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {allPalettes.map(palette=> (
            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
              <MiniPalette
                key={palette.paletteName}
                colors={palette.colors}
                openDialog={openDialog}
                id={palette.id}
                {...palette}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog open={openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={closeDialog}>
        <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={confirmDelete}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Delete' />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Cancel' />
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
}

export default PaletteList;