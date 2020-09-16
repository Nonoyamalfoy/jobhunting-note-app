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
} from "../components/Company";
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

const CompanyList: React.FC = () => {
  const classes = useStyles();
  const [addCompanyDialogopen, setAddCompanyDialogopen] = useState(false);
  const handleClickOpenAddCompanyDialog = () => {
    setAddCompanyDialogopen(true);
  };
  const handleCloseAddCompanyDialog = () => {
    setAddCompanyDialogopen(false);
  };
  const [selectedCompanyDialogopen, setSelectedCompanyDialogopen] = useState(
    false
  );
  const handleClickOpenSelectedCompanyDialog = () => {
    setSelectedCompanyDialogopen(true);
  };
  const handleCloseSelectedCompanyDialog = () => {
    setSelectedCompanyDialogopen(false);
  };
  return (
    <div className={classes.root}>
      {/* <List>
        <CompanyListItem />
      </List> */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.paper} elevation={5}>
            <CardActionArea
              className={classes.cardActionArea}
              onClick={handleClickOpenSelectedCompanyDialog}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  ヤフー株式会社
                </Typography>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="read-only" value={3} readOnly />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
          {/* <Paper className={classes.paper} elevation={5} >item</Paper> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper} elevation={5}>
            item
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper} elevation={5}>
            item
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper} elevation={5}>
            item
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper} elevation={5}>
            item
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper} elevation={5}>
            item
          </Paper>
        </Grid>
      </Grid>

      <AddCompanyDialog
        open={addCompanyDialogopen}
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

export default CompanyList;
