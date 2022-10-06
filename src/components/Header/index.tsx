import { useIsAuthenticated } from "@azure/msal-react";
import { Tab, Tabs } from "@material-ui/core";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import MessageIcon from "@mui/icons-material/Message";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router";
import clsx from "clsx";

import { LandingPageTabs } from "../../_models/Tabs";
import { SignInButton } from "../SignInButton";
import { SignOutButton } from "../SignOutButton";
import { useStyles } from "./style";

export default function Header({ children }: any) {
  const navigate = useNavigate();
  const styles = useStyles();
  const onChange = (value: LandingPageTabs | string) => {
    navigate(`/${value}`);
  };

  const isAuthenticated = useIsAuthenticated();
  console.log("isAuthenticated", isAuthenticated);
  const headerClass = clsx(
    isAuthenticated && styles.header,
    !isAuthenticated && styles.headerWithoutTabs
  );
  const theme = createTheme({
    overrides: {
      MuiTab: {
        root: {
          "&:hover": {
            backgroundColor: "#161e2e",
            color: "#161e2e",
          },
        },
        selected: {
          backgroundColor: "red",
          color: "red",
          "&:hover": {
            backgroundColor: "green",
            color: "green",
          },
        },
      },
    },
  });
  return (
    <>
      <div className={styles.container}>
        <div className={headerClass}>
          {isAuthenticated && (
            <MuiThemeProvider theme={theme}>
              <Tabs>
                <Tab
                  label={<PersonAddIcon />}
                  value={LandingPageTabs.person}
                  onClick={() => onChange(LandingPageTabs.person)}
                  style={{ color: "white" }}
                />
                <Tab
                  label={<ContactPageIcon />}
                  value={LandingPageTabs.personDetails}
                  onClick={() => onChange(LandingPageTabs.personDetails)}
                  style={{ color: "white" }}
                />
                <Tab
                  label={<MessageIcon />}
                  value={LandingPageTabs.quotes}
                  onClick={() => onChange(LandingPageTabs.quotes)}
                  style={{ color: "white" }}
                />
              </Tabs>
            </MuiThemeProvider>
          )}
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
}
