import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import useLocalStorageState from "use-local-storage-state";
import {
  BASE_HEADERS,
  BASE_URL,
  baseFetch,
  getAssetUrl,
} from "../APIController";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { fetchUser } from "../authController";
import swal from "sweetalert";

// NOTE: UWU AI GENERATED CODE ALL OF IT :3 rawr, x3 nuzzles pounces on you uwu you so warm
const UserProfile = () => {
  const history = useHistory();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // HACK: MUAHAHAHAHAHAHA BREAKING CONVENTION CUZ IM LAAAZZZ(holy crap zzz reference)YYYYY, sorry.
  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("photo", selectedFile);

    // Update user profile photo here with data.url
    fetch(`${BASE_URL}/user/profile-photo`, {
      method: "POST",
      headers: {
        "x-api-key": BASE_HEADERS["x-api-key"],
        Authorization: "Bearer " + user.token,
      },
      body: formData,
    }).then((res) => swal("Profile image changed!", `yay :3`, "success"));
  };

  // useEffect(() => {
  //   if (!user) history.push("/login");
  // }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchUser(user.token, setUser);

    baseFetch("address", setAddresses, "GET", {
      ...BASE_HEADERS,
      Authorization: "Bearer " + user.token,
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="flex items-center p-6">
          {user.profile_photo ? (
            <img
              className="w-16 h-16 rounded-full mr-4"
              src={previewUrl || getAssetUrl(user.profile_photo)}
              alt={`${user.name} avatar`}
            />
          ) : (
            <div className="mr-4">
              <FaUserCircle size={54} />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        {/* Upload Section */}
        <div className="px-6 pb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Upload New Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          />
          {selectedFile && (
            <button
              onClick={handleUpload}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Upload Photo
            </button>
          )}
        </div>

        {/* Bio Section
      <div className="px-6 pb-4">
        <p className="text-gray-700">{user.bio}</p>
      </div> */}
        {/* Stats Section */}
        {/* <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-gray-600">Followers</span>
          <span className="font-bold text-gray-800">{user.followers}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Following</span>
          <span className="font-bold text-gray-800">{user.following}</span>
        </div>
      </div> */}
      </div>
      <Tabs>
        <div className="flex flex-col items-center">
          <TabList>
            <Tab>Account</Tab>
            <Tab>Address Information</Tab>
          </TabList>

          <TabPanel>
            <div className="px-32">
              <br />
              <br />
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                venenatis nibh. Sed vitae rutrum erat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Donec vitae metus eget erat
                mattis mattis at ut dolor. Cras condimentum enim quam. Praesent
                turpis diam, placerat eu velit ac, iaculis condimentum velit.
                Maecenas et eros ac lectus vulputate blandit id in orci. Nulla
                justo ipsum, condimentum quis vestibulum ac, iaculis nec metus.
                In et sem odio. Nullam tristique sapien lobortis, pretium leo
                vitae, pharetra lorem. Nullam at rhoncus neque. Sed sed
                ultricies magna. Fusce ultrices consectetur massa vitae aliquam.
                Sed molestie mauris ligula, quis tincidunt nisl elementum vel.
                Quisque magna massa, malesuada quis tristique in, consectetur
                nec odio.
              </h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="ml-16 px-32">
              <br />
              <br />
              <h2 className="text-2xl font-bold mb-2">Your Addresses</h2>
              <a href="/address" className="underline">
                Add an address
              </a>
              <div className="m-8">
                {addresses.map((v, i) => (
                  <div className="flex flex-col p-8 mb-8 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                    <p>
                      <span className="font-bold">
                        {" "}
                        {v.address}, {v.district}, {v.subdistrict}, {v.regency},{" "}
                        {v.province}, {v.country} {v.postal_code}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Phone:</span> {v.phone}
                    </p>
                    {/* TODO: JAHANAM */}
                    <button
                      onClick={() => {
                        baseFetch(
                          "address",
                          (a) => {
                            swal("Address deleted", `yay :3`, "success").then(
                              (a) => {
                                location.reload();
                              }
                            );
                          },
                          "DELETE",
                          {
                            ...BASE_HEADERS,
                            Authorization: "Bearer " + user.token,
                          },
                          { addressId: v.id }
                        );
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 rounded self-end"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default UserProfile;
