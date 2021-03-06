import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LabeledRow } from "./LabeledRow";
import { useTranslation } from "react-i18next";
import { setCookie } from "../shared";
import appConfig from "../appConfig";
import { updateCurrentUser } from "../redux/actions";
import { logIn } from "../api/login";
import Image from "react-bootstrap/Image";
import { Alert } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logo from "../assets/logo1.png";

function LoginForm() {
  const { debug } = appConfig;
  const [email, setEmail] = useState(debug ? "@it-ref.de" : "");
  const [password, setPassword] = useState(debug ? "1Passwort!" : "");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const submitForm = (e: any) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    logIn({ email, password })
      .then((user) => {
        console.log(user.data.data);
        setCookie("inSession", "true");
        dispatch(updateCurrentUser(user.data.data));
      })
      .catch(onError);
  };

  const onError = (e: object) => {
    console.log(e);
    setErrorMessage(t("login.standard_error"));
    setError(true);
  };

  return (
    <Row className="login-form">
      <Col sm={4}>
        <Image src={logo} className="logo"></Image>

        <div className="mt-24">
          <h2>{t("sign_up.header")}</h2>
          <p>
            {t("login.sign_up_desc")}&nbsp;
            <Link to={"/sign_up"}>{t("login.sign_up_action")}</Link>
          </p>
        </div>

        <h2>FAQ</h2>
        <ul>
          <li>Wer wird in die Babysitterbörse aufgenommen?</li>
          <li>Vorgehen und kurze Anleitung zur Registrierung als Babysitter</li>
          <li>
            Rechtliche Hinweise und Art &amp; Umfang der Nutzung der Plattform
          </li>
        </ul>
      </Col>
      <Col sm={8}>
        <div className="mb-12 form-group">
          <h1>{t("login.member_area")}</h1>
          <p>{t("login.introduction_text")}</p>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <LabeledRow label={t("email")} htmlFor="ansb_user_email">
            <input
              className="string email optional form-control"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="ansb_user[email]"
              id="ansb_user_email"
              autoComplete="username"
            />
          </LabeledRow>
          <LabeledRow label={t("password")} htmlFor="password">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="password optional form-control"
              type="password"
              autoComplete="current-password"
              id="password"
            />
          </LabeledRow>
          <input
            onClick={submitForm}
            type="submit"
            name="commit"
            value="Anmelden"
            className="btn button-lg ghost-button overlay-button"
            data-disable-with="Anmelden"
          />
        </div>

        <Row className="mb-12">
          <Link to={"/forgot_password"}>{t("login.forgot_password")}</Link>
        </Row>
      </Col>
    </Row>
  );
}

export default LoginForm;
