import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  List,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { Company } from "../../entity/company";

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

type Props = {
  company: Company;
  handleClickOpenSelectedCompanyDialog: () => void;
};

const CompanyListItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.paper} elevation={5}>
        <CardActionArea
          className={classes.cardActionArea}
          onClick={props.handleClickOpenSelectedCompanyDialog}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.company.companyName}
            </Typography>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="read-only"
                value={props.company.aspiration}
                readOnly
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CompanyListItem;
