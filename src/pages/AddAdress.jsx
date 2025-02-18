import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { BASE_HEADERS, baseFetch } from "../APIController";

function AddAddress() {
  const history = useHistory();

  const [creds, setCreds] = useState({
    address: "",
    subdistrict: "",
    district: "",
    regency: "",
    province: "",
    postal_code: "",
    country: "",
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: null,
  });

  // const [errors, setErrors] = useState({
  //   passwordErr: "",
  //   usernameErr: "",
  // });

  function addAddress(params) {
    const done = (cock) => {
      history.push("/user");
    };
    baseFetch(
      "address",
      done,
      "POST",
      {
        ...BASE_HEADERS,
        Authorization: "Bearer " + user.token,
      },
      params
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Sign in to your account
        </h2>
        <div className="space-y-6" action="#">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="address"
              required
              onChange={handleChange}
              value={creds.address}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="subdistrict"
              className="block text-sm font-medium text-gray-700"
            >
              Subdistrict
            </label>
            <input
              id="subdistrict"
              name="subdistrict"
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={creds.subdistrict}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              District
            </label>
            <input
              id="district"
              name="district"
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={creds.district}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="regency"
              className="block text-sm font-medium text-gray-700"
            >
              Regency
            </label>
            <input
              id="regency"
              name="regency"
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={creds.regency}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700"
            >
              Province
            </label>
            <input
              id="province"
              name="province"
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={creds.province}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="postal_code"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              id="postal_code"
              name="postal_code"
              type="number"
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={creds.postal_code}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              id="country"
              name="country"
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={creds.country}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              id="phone"
              name="phone"
              type="phone"
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={creds.phone}
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
          </div>
          <div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                addAddress(creds);
              }}
            >
              Add Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
