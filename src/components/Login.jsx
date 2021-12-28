import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo2.png";

import { client } from "../client";
import { registeredUsersQuery } from "../utils/data";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const test = () => {
    localStorage.clear();
    const testProfileObj = {
      email: "testuser@email.com",
      surName: "user",
      givenName: "test",
      password: "123",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3_qIHtXBZ7vZeMQhyD8qLC1VRB9ImHadL09KET_iSQEX6ags4ICknfmqEKz8Nf6IOsA&usqp=CAU",
      name: "test user",
      _id: "ac92b1cd-499c-41de-8a28-0347a1ef807f",
    };

    localStorage.setItem("user", JSON.stringify(testProfileObj));

    const { email, _id, imageUrl } = testProfileObj;
    const doc = {
      _id: _id,
      _type: "user",
      email: email,
      password: "123",
      image: imageUrl,
      surName: "user",
      givenName: "test",
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  const login = (e) => {
    e.preventDefault();

    const query = registeredUsersQuery(email, password);
    client.fetch(query).then((data) => {
      if (data.length > 0) {
        localStorage.clear();

        const loginObj = {
          email: data[0].email,
          surName: data[0].surName,
          givenName: data[0].givenName,
          name: data[0].givenName + " " + data[0].surName,
          _id: data[0]._id,
          imageUrl: data[0].image,
        };

        localStorage.setItem("user", JSON.stringify(loginObj));

        const { email, _id, imageUrl, surName, givenName } = loginObj;
        const doc = {
          _id: _id,
          _type: "user",
          email: email,
          password: password,
          image: imageUrl,
          surName: surName,
          givenName: givenName,
        };
        client.createIfNotExists(doc).then(() => {
          navigate("/", { replace: true });
        });
      } else {
        setError(true);
        setErrorMessage("Please check your login details and try again!");
      }
    });
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          playsInline
          className="w-full h-full object-cover bg-white"
        />

        <div
          className="absolute flex flex-col justify-center items-center
        top-0 right-0 left-0 bottom-0 bg-blackOverlay"
        >
          <div className="p-5 bg-mainColor rounded-lg cursor-pointer outline-none">
            <img src={logo} alt="logo" />
          </div>

          <div
            className="p-5 bg-mainColor rounded-lg mt-10
          flex flex-col justify-center items-center min-w-350"
          >
            <h2 className="font-bold text-gray-700 text-lg">Login</h2>
            <form className="w-full my-2" onSubmit={login}>
              <div className="flex justify-around">
                <label className="font-semibold text-gray-700 w-32">
                  Email:
                </label>
                <input
                  className="rounded-md border-2
                  text-sm  border-gray-100 w-40"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-around mt-2">
                <label className="font-semibold text-gray-700 w-32">
                  Password:
                </label>
                <input
                  className="rounded-md border-2 border-gray-100 w-40"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-rose-500 my-3">{errormessage}</p>}
              <div className="flex justify-evenly mt-2">
                <button
                  type="submit"
                  className="font-semibold hover:text-gray-700 hover:bg-emerald-200
              p-2 rounded-lg cursor-pointer outline-none  text-white bg-emerald-500"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={register}
                  className="font-semibold hover:text-gray-700 hover:bg-emerald-200
              p-2 rounded-lg cursor-pointer outline-none  text-white bg-emerald-500"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-5 text-lg text-gray-700 font-bold">Or</p>

            <button
              className="mt-5 font-bold hover:text-gray-700 md:text-lg  hover:bg-emerald-200
              p-3 rounded-lg cursor-pointer outline-none w-28 text-white bg-emerald-500"
              type="button"
              onClick={test}
            >
              Try First!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
