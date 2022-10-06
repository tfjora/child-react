/* eslint-disable no-useless-computed-key */
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  container: {
    boxSizing: "border-box",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  AppRoutesContainer: {
    background: "white",
    borderRadius: "8px",
    maxWidth: "1200px",
    width: "100%",
  },
});
