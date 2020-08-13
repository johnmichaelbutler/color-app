import { makeStyles } from '@material-ui/core/styles';
import sizes from './sizes';
import bg from './bg.svg';

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    /* background by SVGBackgrounds.com */
    backgroundColor: "#ffffff",
    backgroundImage: `url(${bg})`,
    overflow: "scroll"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("xl")]: {
      width: "80%"
    },
    [sizes.down("xs")]: {
      width: "75%"
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "rgba(0, 0, 0, 0.5)",
      textDecoration: "none",
      fontSize: "1.7rem",
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "1.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1.3rem"
    }
  },
  heading: {
    fontSize: "2rem",
    color: "rgba(0, 0, 0, 0.5)"
  }
});

export default useStyles;
