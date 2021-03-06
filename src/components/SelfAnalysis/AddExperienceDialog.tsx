import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogActions, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  TextInput,
  SaveButton,
  CloseButton,
  SelectAgeBox,
  ValidationTextInput,
} from "../Uikit";
import dayjs from "dayjs";
import {
  createStringChangeEventCallback,
  createNumberChangeEventCallback,
} from "../../lib/createHooks";
import { addExperiences } from "../../reducks/user/operations";
import { RootState } from "../../type/rootState";
import { getExperiences, getUserId } from "../../reducks/user/selectors";
import { Experience } from "../../type/user";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const day = dayjs();

const useStyles = makeStyles({
  box: {
    width: 16,
    height: 16,
    display: "block",
    // marginLeft: 6,
    borderRadius: 4,
  },
  icon: {
    margin: "0 auto",
  },
});

const setAges = () => {
  const ages = [];
  for (let i = 0; i <= 60; i++) {
    ages.push(i);
  }
  return ages;
};

type Props = {
  experience: Experience;
  open: boolean;
  handleClose: () => void;
};

const setMotivations = () => {
  const ages = [];
  for (let i = -50; i <= 100; i++) {
    ages.push(i);
  }
  return ages;
};

const AddExperienceDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const experiences = getExperiences(selector);
  const ages = setAges();
  const motivations = setMotivations();
  const [experienceId, setExperienceId] = useState("");
  const [title, setTitle] = useState("");
  const [age, setAge] = useState(0);
  const [motivation, setMotivation] = useState(0);
  const [description, setDescription] = useState("");
  const [isTitleEditStart, setIsTietleEditStart] = useState(false);
  const isTitleInValid = !title && isTitleEditStart;

  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";

  useEffect(() => {
    setAge(props.experience.age);
  }, [setAge, props.experience]);

  useEffect(() => {
    if (experiences.length > 0) {
      const _experience = experiences.filter(
        (experience) => experience.age === age
      )[0];
      if (_experience) {
        setExperienceId(_experience.experienceId);
        setTitle(_experience.title);
        setMotivation(_experience.motivation);
        setDescription(_experience.description);
      } else {
        setExperienceId("");
        setTitle("");
        setMotivation(0);
        setDescription("");
      }
    }
  }, [age]);

  return (
    <Dialog
      className="dialog"
      open={props.open}
      onClose={() => {
        props.handleClose();
        setIsTietleEditStart(false);
      }}
      fullWidth
      scroll={schrollType}
      fullScreen={matches}
      // maxWidth="sm"
    >
      <div className="dialogHeader">
        <DialogActions>
          <CloseButton
            onClick={() => {
              props.handleClose();
              setIsTietleEditStart(false);
            }}
          />
        </DialogActions>
      </div>

      <DialogContent>
        <div className="module-spacer--medium" />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <SelectAgeBox
              value={age}
              label="年齢"
              required={true}
              options={ages}
              select={createNumberChangeEventCallback(setAge)}
              unit="歳"
            />
          </Grid>
          <Grid item xs={6}>
            <SelectAgeBox
              value={motivation}
              label="モチベーション"
              required={true}
              options={motivations}
              select={createNumberChangeEventCallback(setMotivation)}
              unit="%"
            />
          </Grid>
        </Grid>
        <div className="module-spacer--medium" />
        <ValidationTextInput
          autoFocus={true}
          label="タイトル"
          value={title}
          multiline={true}
          onChange={createStringChangeEventCallback(setTitle)}
          type="text"
          required={true}
          onBlur={() => setIsTietleEditStart(true)}
          error={isTitleInValid}
          validationText="タイトルは必須項目です"
        />
        <div className="module-spacer--extra-small" />
        <TextInput
          label="概要"
          value={description}
          multiline={true}
          onChange={createStringChangeEventCallback(setDescription)}
          type="text"
        />
      </DialogContent>
      <DialogActions>
        <SaveButton
          onClick={() => {
            dispatch(
              addExperiences({
                experienceId: experienceId,
                title: title,
                age: age,
                motivation: motivation,
                description: description,
              })
            );
            setAge(0);
            if (title !== "") {
              props.handleClose();
              setIsTietleEditStart(false);
            }
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddExperienceDialog;
