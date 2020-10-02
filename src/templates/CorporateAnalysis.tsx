import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AddCompanyDialog,
  CompanyListItem,
  SelectedCompanyDialog,
} from "../components/CorporateAnalysis";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { CreateButton } from "../components/Uikit";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../type/rootState";
import { getCompanies, getUserId } from "../reducks/user/selectors";
import { Company } from "../type/company";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
  },
  paper: {
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
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const companies = getCompanies(selector);
  const [addCompanyDialogOpen, setAddCompanyDialogOpen] = useState(false);
  const [selectedCompanyDialogopen, setSelectedCompanyDialogopen] = useState(
    false
  );
  const [company, setCompany] = useState<Company>({
    companyId: "",
    companyName: "",
    aspiration: 3,
    corporatePhilosophy: "",
    companyBusiness: "",
    yearOfEstablish: dayjs().format("YYYYMM"),
    numberOfEmployees: "",
    capital: "",
    annualIncome: "",
    requiredPersonImage: "",
    requiredSkill: "",
    workingEnvironment: "",
    welfare: "",
    future: "",
    task: "",
    reasonForAspiration: "",
    schedules: [],
    memo: "",
  } as Company);

  const resetCompany = () => {
    setCompany({
      companyId: "",
      companyName: "",
      aspiration: 3,
      corporatePhilosophy: "",
      companyBusiness: "",
      yearOfEstablish: dayjs().format("YYYYMM"),
      numberOfEmployees: "",
      capital: "",
      annualIncome: "",
      requiredPersonImage: "",
      requiredSkill: "",
      workingEnvironment: "",
      welfare: "",
      future: "",
      task: "",
      reasonForAspiration: "",
      schedules: [],
      memo: "",
    });
  };

  const handleClickOpenAddCompanyDialog = () => {
    setAddCompanyDialogOpen(true);
  };
  const handleCloseAddCompanyDialog = () => {
    resetCompany();
    setAddCompanyDialogOpen(false);
  };
  const handleClickOpenSelectedCompanyDialog = (c: Company) => {
    setCompany(c);
    setSelectedCompanyDialogopen(true);
  };
  const handleCloseSelectedCompanyDialog = () => {
    // resetCompany()
    setSelectedCompanyDialogopen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {companies.length > 0 ? (
          <>
            {companies.map((c, i) => (
              <CompanyListItem
                key={i}
                company={c}
                handleClickOpenSelectedCompanyDialog={() =>
                  handleClickOpenSelectedCompanyDialog(c)
                }
              />
            ))}
          </>
        ) : (
          <h2 className="empty-item">
            追加された企業は
            <br />
            ありません
          </h2>
        )}
      </Grid>

      <AddCompanyDialog
        open={addCompanyDialogOpen}
        handleClose={handleCloseAddCompanyDialog}
        company={company}
      />
      <SelectedCompanyDialog
        open={selectedCompanyDialogopen}
        handleClose={handleCloseSelectedCompanyDialog}
        handleClickOpenAddCompanyDialog={handleClickOpenAddCompanyDialog}
        selectedCompany={company}
      />
      <CreateButton
        onClick={() => {
          handleClickOpenAddCompanyDialog();
          resetCompany();
        }}
        size={"medium"}
      />
    </div>
  );
};

export default CorporateAnalysis;
