import React from "react";
import { TextField, Typography } from "@material-ui/core";

type Props = {
  label: string;
  multiline: boolean;
  required?: boolean;
  rows?: number;
  value: any;
  type: string;
  autoFocus?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: boolean;
  validationText: string;
};

const ValidationTextInput: React.FC<Props> = (props) => {
  return (
    <>
      <TextField
        fullWidth={true}
        label={props.label}
        margin="dense"
        multiline={props.multiline}
        required={props.required}
        rows={props.rows}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        error={props.error}
        // className={props.className}
        inputProps={{ style: { fontSize: 17 } }}
        InputLabelProps={{ style: { fontSize: 17 } }}
        autoFocus={props.autoFocus}
      />
      <div className="validation">
        {props.error && (
          <Typography variant="caption" component="div" color="error">
            {props.validationText}
          </Typography>
        )}
      </div>
    </>
  );
};

export default ValidationTextInput;
