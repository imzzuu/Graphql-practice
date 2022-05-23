import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { LAUNCH_TILE_DATA } from "./launches";
import { Loading, Header, LaunchDetail } from "../components";
import { ActionButton } from "../containers";
import { RouteComponentProps } from "@reach/router";
import * as LaunchDetailsTypes from "./__generated__/LaunchDetails";

// 쿼리문
export const GET_LAUNCH_DETAILS = gql`
  # id 를 넣어서 사이트, 기타 내용들을 가져옴
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  # launches에서 이미 만들어둔 거 import
  ${LAUNCH_TILE_DATA}
`;

interface LaunchProps extends RouteComponentProps {
  launchId?: any;
}
// launchId 를 받아서 해당 내용을 조회
const Launch: React.FC<LaunchProps> = ({ launchId }) => {
  const { data, loading, error } = useQuery<
    LaunchDetailsTypes.LaunchDetails,
    LaunchDetailsTypes.LaunchDetailsVariables
    // variables 로 launchId 를 전달
  >(GET_LAUNCH_DETAILS, { variables: { launchId } });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header
        image={
          data.launch && data.launch.mission && data.launch.mission.missionPatch
        }
      >
        {data && data.launch && data.launch.mission && data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
};

export default Launch;
