import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserLoginContext";
import { ring } from "ldrs";

export default function Home({
	handleAuthentication,
	user,
	setUser,
	authType,
	setAuthType,
	isLoading,
}) {
	const navigate = useNavigate();
	const loggeduser = useContext(UserContext);
	useEffect(() => {
		if (loggeduser) {
			navigate("/todolist");
		}
	}, [loggeduser]);
	ring.register();
	return (
		<>
			<h3 className="text-2xl font-bold mt-8">{authType.toUpperCase()}</h3>
			<div className="auth-options ">
				{authType === "login" && (
					<button
						onClick={() => setAuthType("signup")}
						className="border p-2 rounded-lg border-orange-300 hover:border-orange-900"
					>
						Don't Have an account?
					</button>
				)}
				{authType === "signup" && (
					<button
						onClick={() => setAuthType("login")}
						className="border p-2 rounded-lg border-orange-300 hover:border-orange-900"
					>
						Already Have an account?
					</button>
				)}
			</div>

			<article className="flex flex-col justify-center items-center bg-orange-200 border-none rounded-lg py-8 px-4 w-3/5 drop-shadow-lg">
				{isLoading && (
					<l-ring
						size="120"
						stroke="5"
						bg-opacity="0"
						speed="2"
						color="orange"
					></l-ring>
				)}
				{!isLoading && (
					<form
						action=""
						className="flex flex-col gap-4 w-full"
						onSubmit={handleAuthentication}
					>
						<label htmlFor="username" className="font-semibold">
							Enter Username
						</label>
						<input
							className="border border-gray-400 rounded-md text-lg px-2 py-1 outline-orange-500"
							type="text"
							id="username"
							name="username"
							value={user.username}
							onChange={(evt) => {
								setUser((curUser) => {
									return { ...curUser, username: evt.target.value };
								});
							}}
							required
						/>
						<label htmlFor="password" className="font-semibold">
							Enter Password
						</label>
						<input
							className="border border-gray-400 rounded-md text-lg px-2 py-1 outline-orange-500"
							type="password"
							id="password"
							name="password"
							value={user.password}
							onChange={(evt) => {
								setUser((curUser) => {
									return { ...curUser, password: evt.target.value };
								});
							}}
							required
						/>
						<button className="border rounded-md border-orange-500 text-orange-500 hover:border-none hover:bg-orange-500 hover:text-orange-100 p-2">
							{authType.toUpperCase()}
						</button>
					</form>
				)}
			</article>
		</>
	);
}
