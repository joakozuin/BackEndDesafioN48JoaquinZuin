import { User } from "../types/user.ts";

import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} rom "https://deno.land/x/djwt/create.ts";


import { key } from "../config.ts";

//Array users
let users: Array<User> = [
  {
    id: "1",
    username: "jdoe@example.com",
    password: "1234",
  },
  {
    id: "2",
    username: "jdae@example.com",
    password: "4321",
  },
];

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

//login user
const login = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  //get values from body request
  const { value } = await request.body();
  //iterate array users
  for (const user of users) {
    if (value.username === user.username && value.password === user.password) {
      const payload: Payload = {
        iss: user.username,
        exp: setExpiration(new Date().getTime() + 50000),
      };

      //create jwt prvious condition ok
      const jwt = makeJwt({ key, header, payload });

      if (jwt) {
        // response jwt
        response.status = 200;
        response.body = {
          id: user.id,
          username: user.username,
          jwt,
        };
      } else {
        // if error, response code 500
        response.status = 500;
        response.body = {
          message: "Internal error server",
        };
      }
      return;
    }
  }

  //credentials wrong
  response.status = 422;
  response.body = {
    message: "Invalid username or password",
  };
};

export { login };
