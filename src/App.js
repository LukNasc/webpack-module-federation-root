import React from "react";

import { Box, Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ErrorBoundary } from "react-error-boundary"
import { Header, Banner, Main } from "./components";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  header: {
    width: "100%",
    height: 64,
  },
  banner: {
    width: "100%",
  },
  main: {
    maxWidth: "1334px"
  }
})


function App() {
  const classes = useStyles();

  return (
    <Box component="div" className={classes.root} >
      <Box component="div" className={classes.header}>
        <ErrorBoundary fallback={<span>Header não encontrado</span>}>
          <React.Suspense fallback="Loading...">
            <Header />
          </React.Suspense>
        </ErrorBoundary>
      </Box>
      <Box component="div" className={classes.banner}>
        <React.Suspense fallback="Loading...">
          <Banner />
        </React.Suspense>
      </Box>
      <Container className={classes.main}>
        <React.Suspense fallback="Loading...">
          <Main />
        </React.Suspense>
      </Container>
    </Box>
  );
}

export default App;
