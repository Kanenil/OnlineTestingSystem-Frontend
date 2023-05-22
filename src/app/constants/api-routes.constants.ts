import {environment} from "../../environments/environment";

const base = environment.apiUrl;

export const ApiRouteKeys = {
  Base: base,
  Account: {
    profile: `${base}/account`,
    logout: `${base}/account/logout`
  },
  Auth: {
    login: `${base}/auth/login`,
    register: `${base}/auth/register`,
    google: {
      login: `${base}/auth/google/login`,
      register: `${base}/auth/google/register`,
    },
    refreshToken: `${base}/auth/refresh-token`
  },
  Courses: {
    base: `${base}/courses`,
    id: `${base}/courses/id`,
    slug: `${base}/courses/slug`,
    join: `${base}/courses/join`,
    leave: `${base}/courses/leave`,
  },
  Users: {
    base: `${base}/users`,
    id: `${base}/users/id`,
    slug: `${base}/users/slug`
  },
};
