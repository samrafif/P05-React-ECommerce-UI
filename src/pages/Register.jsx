import { React, useEffect, useState } from "react";
import { register } from "../authController";
import { useHistory } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

function Register() {
  const history = useHistory();

  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log([name, value]);
    setCreds((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: null,
  });

  const [errors, setErrors] = useState({
    passwordErr: "",
    nameErr: "",
    emailErr: "",
  });

  function validate() {
    if (creds.password != creds.confirmPassword)
      setErrors({
        ...errors,
        passwordErr: "Passwords do not match",
      });
    return creds.password == creds.confirmPassword;
  }

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Register your account
        </h2>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              onChange={handleChange}
              value={creds.name}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p>{errors.nameErr}</p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleChange}
              value={creds.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p>{errors.emailErr}</p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={handleChange}
              value={creds.password}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p>{errors.passwordErr}</p>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              onChange={handleChange}
              value={creds.confirmPassword}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div> */}
            <div className="text-sm">
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Login
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                if (validate()) register(creds, setUser, setErrors);
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
