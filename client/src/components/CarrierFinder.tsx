import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Table from "./Table";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  label: {
    padding: "10px 0 15px 0",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  select: {
    display: "inherit",
  },
}));

const CarrierFinder: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState("");
  const [coverage, setCoverage] = React.useState([]);
  const [carriers, setCarriers] = useState([]);

  const handleFormSubmission = (): void => {
    fetch(`/carriers?state=${state}&coverage=${coverage}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCarriers(data);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Carriers",
        columns: [
          {
            Header: "Name",
            accessor: "carrier",
          },
          {
            Header: "State",
            accessor: "state",
            Cell: ({ value }: any) => value.toUpperCase(),
          },
        ],
      },
      {
        Header: "Policies",
        columns: [
          {
            Header: "Auto 🚙",
            accessor: "auto",
            Cell: ({ value }: any) => (value ? `✅` : `❌`),
          },
          {
            Header: "Fire 🔥",
            accessor: "fire",
            Cell: ({ value }: any) => (value ? `✅` : `❌`),
          },
          {
            Header: "Flood 🌊",
            accessor: "flood",
            Cell: ({ value }: any) => (value ? `✅` : `❌`),
          },
        ],
      },
    ],
    []
  );

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" color="primary">
          Obie Policy Finder
        </Typography>
        <Typography component="h1" variant="subtitle1" color="primary">
          Select a state and coverage type to find matching carrier
        </Typography>
        <form className={classes.form} noValidate>
          <InputLabel className={classes.label}>State</InputLabel>
          <Select
            label="State"
            value={state}
            className={classes.select}
            onChange={(event) => setState(event.target.value as string)}
          >
            <MenuItem value={"il"}>Illinois</MenuItem>
            <MenuItem value={"in"}>Indiana</MenuItem>
            <MenuItem value={"mi"}>Michigan</MenuItem>
          </Select>
          <InputLabel className={classes.label}>Coverage</InputLabel>
          <Select
            multiple
            label="Coverage"
            value={coverage}
            className={classes.select}
            onChange={(event) => setCoverage(event.target.value as any)}
          >
            <MenuItem value={"auto"}>Auto</MenuItem>
            <MenuItem value={"fire"}>Fire</MenuItem>
            <MenuItem value={"flood"}>Flood</MenuItem>
          </Select>
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              handleFormSubmission();
            }}
            disabled={!state.length || !coverage.length}
          >
            Search
          </Button>
        </form>
      </div>
      <Box>
        <Table columns={columns} data={carriers} />
      </Box>
    </Container>
  );
};

export default CarrierFinder;
