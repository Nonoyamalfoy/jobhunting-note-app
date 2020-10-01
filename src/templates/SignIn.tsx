import React, { useCallback, useState } from "react";
import {
  TextInput,
  PrimaryButton,
  ValidationTextInput,
} from "../components/Uikit";
import { signIn } from "../reducks/user/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { isValidEmailFormat } from "../lib/validation";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEditStart, setIsEmailEditStart] = useState(false);
  const [isPasswordEditStart, setIsPasswordEditStart] = useState(false);

  // const isEmailInValid = !email && isEmailEditStart;
  // const isPasswordInValid = !password && isPasswordEditStart;

  let isEmailInValid = false;
  let emailvalidationText = "";
  if (!email) {
    isEmailInValid = isEmailEditStart;
    emailvalidationText = "必須項目が未入力です";
  } else if (!isValidEmailFormat(email)) {
    isEmailInValid = isEmailEditStart;
    emailvalidationText = "メールアドレスの形式が不適切です";
  }

  let isPassWordInValid = false;
  let passwordValidationText = ""
  if(!password) {
    isPassWordInValid = isPasswordEditStart;
    passwordValidationText = "必須項目が未入力です"
  } else if(password.length < 6) {
    isPassWordInValid = isPasswordEditStart;
    passwordValidationText = "パスワードは6文字以上"
  }

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div className="form">
      <h2>ログイン</h2>
      <ValidationTextInput
        autoFocus={true}
        label={"Eメール"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
        onBlur={() => setIsEmailEditStart(true)}
        error={isEmailInValid}
        validationText={emailvalidationText}
      />
      <ValidationTextInput
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
        onBlur={() => setIsPasswordEditStart(true)}
        error={isPassWordInValid}
        validationText={passwordValidationText}
      />
      <div className="module-spacer--small" />
      <div>
        <PrimaryButton
          label={"SIGN IN"}
          onClick={() => {
            setIsEmailEditStart(true);
            setIsPasswordEditStart(true);
            dispatch(signIn({ email, password }));
          }}
        />
      </div>
      <div className="module-spacer--small" />
      <p onClick={() => dispatch(push("/signup"))}>初めての方はこちら </p>
      <p onClick={() => dispatch(push("/signin/reset"))}>
        パスワードをお忘れの方はこちら
      </p>
    </div>
  );
};

export default SignIn;
