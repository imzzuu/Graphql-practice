const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here
  # 사용할 타입들을 미리 선언해둔다. (이 예제는 스칼라 타입(하위 요소 없는 것)이 없다. )
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  #쿼리
  type Query {
    launches(pageSize: Int, after: String): LaunchConnection! # 페이지네이션 구현 (너무 많은 정보가 한번에 오면 오래걸리니까)
    launch(id: ID!): Launch # id가 꼭 들어와야 발사 일정을 리턴
    me: User
  }

  # 페이지네이션 구현을 위한 셋팅
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  #뮤테이션
  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): User
  }
  #응답
  type TripUpdateResponse {
    success: Boolean!
    message: String # 왜 실패했는지
    launches: [Launch]
  }
`;

module.exports = typeDefs;
