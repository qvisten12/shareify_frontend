import React, { useState } from "react";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { registeredUsersQuery } from "../utils/data";
import { client } from "../client";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    const query = registeredUsersQuery(email, password);
    client.fetch(query).then((data) => {
      if (data.length > 0) {
        setError(true);
        setErrorMessage("User already exists!");
      } else {
        console.log(data);
        setError(false);

        const loginObj = {
          email: email,
          surName: surName,
          givenName: name,
          name: name + " " + surName,
          _id: uuidv4(),
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3_qIHtXBZ7vZeMQhyD8qLC1VRB9ImHadL09KET_iSQEX6ags4ICknfmqEKz8Nf6IOsA&usqp=CAU",
        };

        localStorage.setItem("user", JSON.stringify(loginObj));

        const { _id, imageUrl } = loginObj;
        const doc = {
          _id: _id,
          _type: "user",
          email: email,
          password: password,
          image: imageUrl,
          surName: surName,
          givenName: name,
        };
        client.createIfNotExists(doc).then(() => {
          navigate("/", { replace: true });
        });
      }
    });
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
            <h2 className="font-bold text-gray-700 text-lg">Register</h2>
            <form className="w-full my-2" onSubmit={register}>
              <div className="flex justify-around">
                <label className="font-semibold text-gray-700 w-32">
                  Name:
                </label>
                <input
                  className="rounded-md border-2
                  text-sm  border-gray-100 w-40"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex justify-around mt-2">
                <label className="font-semibold text-gray-700 w-32">
                  Family Name:
                </label>
                <input
                  className="rounded-md border-2
                  text-sm  border-gray-100 w-40"
                  type="text"
                  value={surName}
                  onChange={(e) => setSurName(e.target.value)}
                />
              </div>

              <div className="flex justify-around mt-2">
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
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-semibold hover:text-gray-700 hover:bg-emerald-200
              p-2 rounded-lg cursor-pointer outline-none  text-white bg-emerald-500"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
