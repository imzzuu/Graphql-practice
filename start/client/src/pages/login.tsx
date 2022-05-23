import React from "react";
import { gql, useMutation } from "@apollo/client";

import { LoginForm, Loading } from "../components";
import * as LoginTypes from "./__generated__/Login";
import { isLoggedInVar } from "../cache";

// email 을 받아 login 하는 뮤테이션 설정
export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;
// Login 페이지 컴포넌트 ( useMutation hook )
export default function Login() {
  const [login, { loading, error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
  >(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        // 로그인이라면, localStorage에 저장해둔다.
        localStorage.setItem("token", login.token as string);
        localStorage.setItem("userId", login.id as string);
        isLoggedInVar(true);
      }
    },
  });
  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
