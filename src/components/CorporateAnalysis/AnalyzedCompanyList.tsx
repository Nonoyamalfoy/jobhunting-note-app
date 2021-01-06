import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  List,
  Typography,
  Box,
  Grid, 
  Paper
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
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

type Props = {
  handleClickOpenSelectedCompanyDialog: () => void
}

const AnalyzedCompanyList: React.FC<Props> = ({handleClickOpenSelectedCompanyDialog}) => {
  const classes = useStyles()
  return (
    <>
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
    </>
  )
}

export default AnalyzedCompanyList
