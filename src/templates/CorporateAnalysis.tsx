import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  List,
  Typography,
  Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import {
  AddCompanyDialog,
  CompanyListItem,
  SelectedCompanyDialog,
} from "../components/CorporateAnalysis";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { CreateButton } from "../components/Uikit";


const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    margin: 20,
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 200,
  },
  cardActionArea: {
    height: "100%",
  },
}));

const CorporateAnalysis: React.FC = () => {
  const classes = useStyles();
  const [addCompanyDialogOpen, setAddCompanyDialogOpen] = useState(false);
  const [selectedCompanyDialogopen, setSelectedCompanyDialogopen] = useState(
    false
  );
  const handleClickOpenAddCompanyDialog = () => {
    setAddCompanyDialogOpen(true);
  };
  const handleCloseAddCompanyDialog = () => {
    setAddCompanyDialogOpen(false);
  };
  const handleClickOpenSelectedCompanyDialog = () => {
    setSelectedCompanyDialogopen(true);
  };
  const handleCloseSelectedCompanyDialog = () => {
    setSelectedCompanyDialogopen(false);
  };
  return (
    <div className={classes.root}>

      <Grid container spacing={4}>
        <CompanyListItem
          handleClickOpenSelectedCompanyDialog={handleClickOpenSelectedCompanyDialog}
        />
        <CompanyListItem
          handleClickOpenSelectedCompanyDialog={handleClickOpenSelectedCompanyDialog}
        />
        <CompanyListItem
          handleClickOpenSelectedCompanyDialog={handleClickOpenSelectedCompanyDialog}
        />
      </Grid>

      <AddCompanyDialog
        open={addCompanyDialogOpen}
        handleClose={handleCloseAddCompanyDialog}
      />
      <SelectedCompanyDialog
        open={selectedCompanyDialogopen}
        handleClose={handleCloseSelectedCompanyDialog}
        handleClickOpenAddCompanyDialog={handleClickOpenAddCompanyDialog}
      />
      <CreateButton onClick={handleClickOpenAddCompanyDialog} size={"medium"} />
    </div>
  );
};

export default CorporateAnalysis;
