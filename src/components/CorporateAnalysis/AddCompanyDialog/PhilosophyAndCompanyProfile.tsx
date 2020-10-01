import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TextInput } from "../../Uikit";
import { DatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Accordion: {
      padding: 0,
      borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
      boxShadow: "none",
      margin: 0,
      marginTop: 5,
      "&:before": {
        display: "none",
      },
      "&.Mui-expanded": {
        margin: 0,
      },
    },
    AccordionSummary: {
      padding: "0px 16px 0px 0px",
      "& .MuiAccordionSummary-content": {
        margin: "17px 0px 7px 0px",
      },
    },
    AccordionDetails: {
      display: "block",
      backgroundColor: "#dfe3e7",
      [theme.breakpoints.down(960)]: {
        padding: "8px 5px 16px",
      },
    },
  })
);

type Props = {
  corporatePhilosophy: string;
  companyBusiness: string;
  yearOfEstablish: string;
  numberOfEmployees: string;
  capital: string;
  annualIncome: string;
  setcorporatePhilosophy: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setCompanyBusiness: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setYearOfEstablish: (month: any) => void;
  setNumberOfEmployees: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setCapital: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setAnnualIncome: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PhilosophyAndCompanyProfile: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <>
      <Accordion className={classes.Accordion} defaultExpanded>
        <AccordionSummary
          className={classes.AccordionSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>理念・会社概要</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.AccordionDetails}>
          <TextInput
            label={"理念"}
            multiline={true}
            required={true}
            value={props.corporatePhilosophy}
            type={"text"}
            onChange={props.setcorporatePhilosophy}
          />
          <TextInput
            label={"事業"}
            multiline={true}
            required={true}
            value={props.companyBusiness}
            type={"text"}
            onChange={props.setCompanyBusiness}
          />
          <Grid container>
            <Grid item container spacing={4}>
              <Grid item xs={6}>
                <DatePicker
                  variant="inline"
                  openTo="year"
                  views={["year", "month"]}
                  format="YYYY/MM"
                  label="設立年"
                  value={props.yearOfEstablish}
                  onChange={props.setYearOfEstablish}
                  fullWidth
                  disableToolbar
                  inputProps={{ style: { fontSize: 17 } }}
                  InputLabelProps={{ style: { fontSize: 17 } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  label={"従業員数"}
                  multiline={true}
                  required={true}
                  rows={1}
                  value={props.numberOfEmployees}
                  type={"text"}
                  onChange={props.setNumberOfEmployees}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={4}>
              <Grid item xs={6}>
                <TextInput
                  label={"資本金"}
                  multiline={true}
                  required={true}
                  rows={1}
                  value={props.capital}
                  type={"text"}
                  onChange={props.setCapital}
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  label={"年収"}
                  multiline={true}
                  required={true}
                  rows={1}
                  value={props.annualIncome}
                  type={"text"}
                  onChange={props.setAnnualIncome}
                />
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default PhilosophyAndCompanyProfile;
