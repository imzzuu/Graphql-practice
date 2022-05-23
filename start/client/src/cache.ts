import { InMemoryCache, Reference, makeVar } from "@apollo/client";

// localStorage 에 있는 토큰을 value 로 사용
// !! 는 불리언으로 바꿔서 실제 값을 판단하기 위해 사용
export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem("token"));

// Initializes to an empty array
export const cartItemsVar = makeVar<string[]>([]);

// 더 보기를 눌러도 계속 같은 화면이 나옴
// 캐싱을 통해서 이전 내용을 기억하고, 새로운 것을 추가한다.
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        launches: {
          keyArgs: false,
          merge(existing, incoming) {
            let launches: Reference[] = [];
            if (existing && existing.launches) {
              launches = launches.concat(existing.launches);
            }
            if (incoming && incoming.launches) {
              launches = launches.concat(incoming.launches);
            }
            return {
              ...incoming,
              launches,
            };
          },
        },
      },
    },
  },
});
