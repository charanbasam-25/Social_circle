import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        console.log(data,":data--------")
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        if(res.ok){
          console.log("login--bapge")
          navigate("/")
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      // refetch the authUser
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="350"
          height="350"
        >
          <circle cx="30" cy="30" r="10" fill="#4CAF50" />
          <circle cx="70" cy="30" r="10" fill="#4CAF50" />
          <circle cx="30" cy="70" r="10" fill="#4CAF50" />
          <circle cx="70" cy="70" r="10" fill="#4CAF50" />
          <line
            x1="30"
            y1="30"
            x2="70"
            y2="30"
            stroke="#4CAF50"
            stroke-width="3"
          />
          <line
            x1="30"
            y1="30"
            x2="30"
            y2="70"
            stroke="#4CAF50"
            stroke-width="3"
          />
          <line
            x1="70"
            y1="30"
            x2="70"
            y2="70"
            stroke="#4CAF50"
            stroke-width="3"
          />
          <line
            x1="30"
            y1="70"
            x2="70"
            y2="70"
            stroke="#4CAF50"
            stroke-width="3"
          />
          <text
            x="50%"
            y="50%"
            font-family="Arial"
            font-size="24"
            text-anchor="middle"
            fill="#4CAF50"
            dy="5"
            className="text-white"
          >
            c
          </text>
        </svg>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white"> Let's connect</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isPending ? "Loading..." : "Login"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
