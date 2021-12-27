import React from "react";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo2.png";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  // const test = () => {
  //   const testProfileObj = {
  //     email: "testuser@email.com",
  //     familyName: "user",
  //     givenName: "test",
  //     googleId: "ac92b1cd-499c-41de-8a28-0347a1ef807f",
  //     imageUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3_qIHtXBZ7vZeMQhyD8qLC1VRB9ImHadL09KET_iSQEX6ags4ICknfmqEKz8Nf6IOsA&usqp=CAU",
  //     name: "test user",
  //   };

  //   localStorage.setItem("user", JSON.stringify(testProfileObj));
  //   const { name, googleId, imageUrl } = testProfileObj;
  //   const doc = {
  //     _id: googleId,
  //     _type: "user",
  //     userName: name,
  //     image: imageUrl,
  //   };
  //   client.createIfNotExists(doc).then(() => {
  //     navigate("/", { replace: true });
  //   });
  // };

  const test = () => {
    localStorage.clear();
    const testProfileObj = {
      email: "testuser@email.com",
      familyName: "user",
      givenName: "test",
      googleId: "ac92b1cd-499c-41de-8a28-0347a1ef807f",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3_qIHtXBZ7vZeMQhyD8qLC1VRB9ImHadL09KET_iSQEX6ags4ICknfmqEKz8Nf6IOsA&usqp=CAU",
      name: "test user",
    };

    localStorage.setItem("user", JSON.stringify(testProfileObj));

    navigate("/");
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
            className="hover:bg-mainColor flex justify-center items-center
          mt-10 p-3 rounded-lg cursor-pointer outline-none w-28 bg-emerald-200"
          >
            <button
              className="font-bold text-gray-700 md:text-lg"
              type="button"
              onClick={test}
            >
              Try Me!
            </button>
          </div>
          <div
            className="bg-mainColor flex justify-center items-center
          mt-10 p-3 rounded-lg outline-none bg-rose-300 mx-3"
          >
            <p>
              <span className="font-bold text-base md:text-lg">Note:</span>
              Shareify is currently not working on mobile browsers! This will be
              resolved asap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
