import { BASE_URL, BASE_HEADERS } from "./APIController";

export function login(params, setUser, setErrors) {
  fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email: params.email,
      password: params.password,
    }),
    headers: {
      ...BASE_HEADERS,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.status == "OK") fetchUser(json.data.token, setUser);
      else {
        let errors;
        if (json.message == "Incorrect Password") {
          errors = {
            passwordErr: json.message,
            usernameErr: "",
          };
        }
        if (json.message == "User not found") {
          errors = {
            passwordErr: "",
            usernameErr: json.message,
          };
        }
        setErrors(errors);
      }
    });
}

export function register(params, setUser, setErrors) {
  fetch(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify({
      email: params.email,
      password: params.password,
      name: params.name,
    }),
    headers: {
      ...BASE_HEADERS,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.status == "OK") fetchUser(json.data.token, setUser);
      else {
        let errors = {
          passwordErr: "",
          nameErr: "",
          emailErr: "",
        };
        if (json.message == "Email is already registered") {
          errors.emailErr = json.message;
        }
        setErrors(errors);
      }
    });
}

function fetchUser(token, callback) {
  fetch(`${BASE_URL}/user`, {
    method: "GET",
    headers: {
      ...BASE_HEADERS,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      callback({
        ...json.data,
        token: token,
      });
    });
}
// TODO: Make this whole file into a class, this shit is unacceptable.
export function user() {
  return JSON.parse(localStorage.getItem("user"));
}
