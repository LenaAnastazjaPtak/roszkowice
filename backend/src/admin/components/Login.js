import React from "react";
import { useSelector } from "react-redux";
import { Box, Button, FormGroup, H2, Input, Label, MessageBox, Text } from "@adminjs/design-system";
import { styled } from "@adminjs/design-system/styled-components";
import { allowOverride, useTranslation } from "adminjs";

const Wrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const StyledLogo = styled.img`
  max-width: 220px;
  width: 100%;
  height: auto;
`;

const FormContent = styled(Box)`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
`;

const Login = () => {
  const { action, errorMessage: message } = window.__APP_STATE__;
  const { translateComponent, translateMessage } = useTranslation();
  const branding = useSelector((state) => state.branding);

  return React.createElement(
    Wrapper,
    { flex: true, variant: "grey", className: "login__Wrapper" },
    React.createElement(
      Box,
      { bg: "white", height: "440px", flex: true, boxShadow: "login", width: [1, 2 / 3, "auto"] },
      [
        React.createElement(
          Box,
          {
            key: "left-panel",
            bg: "primary100",
            color: "white",
            p: "x3",
            width: "380px",
            flexGrow: 0,
            display: ["none", "none", "flex"],
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "xl",
          },
          [
            branding.logo
              ? React.createElement(StyledLogo, {
                  key: "left-logo",
                  src: branding.logo,
                  alt: branding.companyName,
                })
              : null,
            React.createElement(
              Box,
              { key: "left-copy", width: "100%", textAlign: "center" },
              [
                React.createElement(
                  H2,
                  { key: "left-header", fontWeight: "lighter" },
                  translateComponent("Login.welcomeHeader"),
                ),
                React.createElement(
                  Text,
                  { key: "left-message", fontWeight: "lighter", mt: "default" },
                  translateComponent("Login.welcomeMessage"),
                ),
              ],
            ),
          ],
        ),
        React.createElement(
          Box,
          {
            key: "form-panel",
            as: "form",
            action,
            method: "POST",
            p: "x3",
            flexGrow: 1,
            width: ["100%", "100%", "480px"],
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          },
          [
            React.createElement(
              FormContent,
              { key: "form-content" },
              [
                message
                  ? React.createElement(MessageBox, {
                      key: "error-message",
                      my: "lg",
                      message: message.split(" ").length > 1 ? message : translateMessage(message),
                      variant: "danger",
                    })
                  : null,
                React.createElement(
                  FormGroup,
                  { key: "email-group" },
                  [
                    React.createElement(
                      Label,
                      { key: "email-label", required: true },
                      translateComponent("Login.properties.email"),
                    ),
                    React.createElement(Input, {
                      key: "email-input",
                      name: "email",
                      placeholder: translateComponent("Login.properties.email"),
                    }),
                  ],
                ),
                React.createElement(
                  FormGroup,
                  { key: "password-group" },
                  [
                    React.createElement(
                      Label,
                      { key: "password-label", required: true },
                      translateComponent("Login.properties.password"),
                    ),
                    React.createElement(Input, {
                      key: "password-input",
                      type: "password",
                      name: "password",
                      placeholder: translateComponent("Login.properties.password"),
                      autoComplete: "new-password",
                    }),
                  ],
                ),
                React.createElement(
                  Box,
                  { key: "submit-wrapper", mt: "xl", textAlign: "center" },
                  React.createElement(
                    Button,
                    { variant: "contained", style: { width: "100%" } },
                    translateComponent("Login.loginButton"),
                  ),
                ),
              ],
            ),
          ],
        ),
      ],
    ),
  );
};

export default allowOverride(Login, "Login");
