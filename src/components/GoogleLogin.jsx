import React from "react";
import { GoogleLogin } from "@react-oauth/google";

import { httpService } from "../httpService";

export default function GoogleLoginComponent() {
  const handleGoogleLogin = async (token) => {
    const { data } = await httpService.post(`mestore/googleAccount`, { token });

    if (data) {
      localStorage.setItem(
        process.env.REACT_APP_PROJECT_USER,
        JSON.stringify(data)
      );
      window.location.assign("/");
    }
  };
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        handleGoogleLogin(credentialResponse.credential);
      }}
      onError={(e) => {
        console.log(e);
      }}
    />
  );
}
