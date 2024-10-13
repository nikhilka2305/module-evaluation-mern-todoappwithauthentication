import React, { useContext, useEffect } from "react";
import { UserContext } from "./userLoginContext";

export default function Header({ logout }) {
	const loggeduser = useContext(UserContext);

	return (
		<div className="bg-gradient-to-r from-orange-300 to-orange-500 flex gap-8 h-28 w-screen items-center justify-between pl-10 md:pl-20 lg:pl-30 pr-32">
			<h1 className="sm:text-lg md:text-2xl lg:text-3xl font-bold">
				ToDo With Logins
			</h1>
			<div className="userDetails  font-semibold flex flex-col items-center gap-2">
				{loggeduser && (
					<h3 className="sm:text-md md:text-lg lg:text-xl">
						{loggeduser.user}
					</h3>
				)}
				{loggeduser && (
					<button
						className="border-none rounded-md p-2 text-md lg:text-lg text-orange-200 hover:text-orange-800"
						onClick={() => logout("user", { path: "/" })}
					>
						LogOut
					</button>
				)}
			</div>
		</div>
	);
}
