import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userLoginContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function ViewToDo() {
	const navigate = useNavigate();
	const loggeduser = useContext(UserContext);
	const getToDoUrl = "https://todoappwithauthentication.onrender.com/todo";
	const [error, setError] = useState();
	const [todolist, setToDoList] = useState([]);

	useEffect(() => {
		if (loggeduser && loggeduser.token) {
			const userToken = loggeduser.token;
			const options = {
				method: "GET",
				headers: { authorization: `Bearer ${userToken}` },
			};

			async function fetchTodo() {
				try {
					const response = await fetch(getToDoUrl, options);
					const responseData = await response.json();
					if (!response.ok) {
						setError(responseData.message);
					} else {
						setError("");
						setToDoList(responseData);
					}
				} catch (err) {
					setError("Error fetching Todos");
				}
			}

			fetchTodo();
		} else {
			setError("You Need to Login");

			navigate("/");
		}
	}, [loggeduser]);
	return (
		<section className="w-full pt-4 mx-auto flex flex-col items-center">
			{error && (
				<h6 className="text-center text-red-600 mt-4 p-2 border-2 border-red-500 rounded-md w-5/6 mx-auto">
					{error}
				</h6>
			)}
			<h1 className="text-center text-4xl font-bold mt-16">View ToDos</h1>
			{loggeduser && (
				<h2 className="text-center text-2xl font-bold mt-16">
					{loggeduser.user}
				</h2>
			)}
			{!todolist.length && (
				<h3 className="text-xl p-4 font-semibold">You don't have any ToDos</h3>
			)}
			{!error && loggeduser && todolist.length > 0 && (
				<ul className="mx-auto border p-4 rounded-lg border-orange-700 bg-orange-200 w-4/6 mt-8 drop-shadow-md">
					{todolist.map((todo) => {
						return (
							<li
								key={todo._id}
								className="w-100 border border-orange-600 rounded-md p-2 my-2 hover:text-orange-600 hover:bg-stone-300 text-center"
							>
								<NavLink to={`/todo/${todo._id}`}>
									<h3>Title: {todo.title}</h3>
									<p>Completed: {todo.completed.toString()}</p>
								</NavLink>
							</li>
						);
					})}
				</ul>
			)}
			{!error && loggeduser && (
				<NavLink
					className=" w-4/12 mt-8 border rounded-md bg-orange-400 text-orange-200 hover:text-orange-400 hover:bg-orange-200 p-2 text-center drop-shadow-md"
					to={"/addtodo"}
				>
					Add To Do
				</NavLink>
			)}
		</section>
	);
}
