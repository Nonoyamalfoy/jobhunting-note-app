import React, { useCallback, useState } from "react";
import {TextInput, PrimaryButton, ValidationTextInput} from  "../components/Uikit";
import {signUp} from "../reducks/user/operations";
import { useDispatch } from "react-redux";
import {push} from "connected-react-router";
import { isValidEmailFormat } from "../lib/validation";


const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUserNameEditStart, setIsUserNameEditStart] = useState(false)
  const [isEmailEditStart, setIsEmailEditStart] = useState(false);
  const [isPasswordEditStart, setIsPasswordEditStart] = useState(false);
  const [isConfirmPasswordEditStart, setIsConfirmPasswordEditStart] = useState(false);

  const isUserNameInvalid = !username && isUserNameEditStart;

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

  let isConfirmPassWordInValid = false;
  let confirmPasswordValidationText = ""
  if(!confirmPassword) {
    isConfirmPassWordInValid = isConfirmPasswordEditStart;
    confirmPasswordValidationText = "必須項目が未入力です"
  } else if(password !== confirmPassword) {
    isConfirmPassWordInValid = isConfirmPasswordEditStart;
    confirmPasswordValidationText = "パスワードが一致しません"
  }

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername]);
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);
  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [setConfirmPassword]);

  return (
    <div className="form">
      <h2>アカウント登録</h2>
      <ValidationTextInput
        autoFocus={true}
        label={"ユーザー名"}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={"text"}
        onChange={inputUsername}
        onBlur={() => setIsUserNameEditStart(true)}
        error={isUserNameInvalid}
        validationText={emailvalidationText}
      />
      <ValidationTextInput
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
      <ValidationTextInput
        label={"パスワード(確認)"}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
        onBlur={() => setIsConfirmPasswordEditStart(true)}
        error={isConfirmPassWordInValid}
        validationText={confirmPasswordValidationText}
      />
      <div className="module-spacer--small" />
      <div>
        <PrimaryButton 
          label={"SIGN UP"}
          onClick={() => dispatch(signUp({username, email, password, confirmPassword}))}
        />
      </div>
      <div className="module-spacer--small" />
      <p onClick={() => dispatch(push("/signin"))}>すでにアカウントをお持ちの方はこちら</p>
    </div>
  )
}

export default SignUp