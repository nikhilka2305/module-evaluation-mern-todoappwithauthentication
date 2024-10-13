import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userLoginContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import Form from "./Form";

export default function ToDo() {
	const modal = useRef();
	const navigate = useNavigate();
	const todoId = useParams().todoid;
	const loggeduser = useContext(UserContext);
	const getToDoUrl = `https://todoappwithauthentication.onrender.com/todo/${todoId}`;
	const [error, setError] = useState();
	const [todo, setToDo] = useState();
	const userToken = loggeduser ? loggeduser.token : undefined;

	useEffect(() => {
		if (loggeduser && loggeduser.token) {
			async function fetchTodo() {
				const options = {
					method: "GET",
					headers: { authorization: `Bearer ${userToken}` },
				};
				try {
					const response = await fetch(getToDoUrl, options);
					const responseData = await response.json();

					if (!response.ok) {
						setError(responseData.message);
					} else {
						setError("");
						setToDo(responseData);
					}
				} catch (err) {
					setError("Error fetching Todo");
				}
			}

			fetchTodo();
		} else {
			setError("You Need to Login");
			modal.current.close();
			navigate("/");
		}
	}, [loggeduser]);

	async function handleDeleteTodo() {
		const options = {
			method: "DELETE",
			headers: { authorization: `Bearer ${userToken}` },
		};

		try {
			const response = await fetch(getToDoUrl, options);

			if (!response.ok) {
				setError("Error deleting data");
			} else {
				modal.current.close();
				navigate("/todolist");
			}
		} catch (err) {
			setError("Error deleting Todo");
		}
	}

	const handleModalDelete = () => {
		modal.current.open();
	};
	const handleModalCancel = () => {
		modal.current.close();
	};

	return (
		<section className="w-full pt-4 mx-auto flex flex-col items-center">
			{error && (
				<h6 className="text-center text-red-600 mt-4 p-2 border-2 border-red-500 rounded-md w-5/6 mx-auto">
					{error}
				</h6>
			)}
			<h1 className="text-center text-4xl font-bold mt-16">View Single Todo</h1>
			<NavLink
				className=" w-4/12 mt-8 bg-transparent text-stone-200 hover:text-black p-2 text-center"
				to={"/todolist"}
			>
				View All To Dos
			</NavLink>
			{loggeduser && (
				<h2 className="text-center text-2xl font-bold mt-8">
					{loggeduser.user}
				</h2>
			)}
			{loggeduser && todo && (
				<div className="drop-shadow-xl w-3/4 border border-orange-600 rounded-md p-4 my-2 hover:text-orange-600 hover:bg-orange-200 text-center flex justify-between align-items-center">
					<div className="content flex flex-col gap-4">
						<h3 className="text-3xl font-semibold">Title: {todo.title}</h3>
						<p className="text-3xl font-semibold">
							Completed: {todo.completed.toString()}
						</p>
					</div>
					<div className="modify my-auto flex items-center gap-4">
						<NavLink to={`/todo/${todo._id}/edit`}>
							<p className="text-lg font-semibold hover:text-red-700 ">Edit</p>
						</NavLink>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="size-10 hover:text-red-700 "
							// onClick={handleDeleteTodo}
							onClick={handleModalDelete}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
							/>
						</svg>
					</div>
				</div>
			)}
			{loggeduser && (
				<NavLink
					className=" w-4/12 mt-8 border border-orange-200 rounded-md bg-orange-400 text-orange-200 hover:text-orange-400 hover:bg-orange-200 p-2 text-center drop-shadow-md"
					to={"/addtodo"}
				>
					Add To Do
				</NavLink>
			)}
			<Modal
				ref={modal}
				handleModalStateClose={() => {
					modal.current.close();
				}}
			>
				<aside className="w-full flex flex-col">
					<h3 className="w-full">Are you sure to delete this todo?</h3>
					<div className="button-group flex justify-between items-center mt-4">
						<button
							className="p-2 border rounded-md hover:text-orange-500 hover:bg-orange-50 min-w-24 drop-shadow-md"
							onClick={handleDeleteTodo}
						>
							Ok
						</button>
						<button
							onClick={handleModalCancel}
							className="p-2 border rounded-md hover:text-orange-500 hover:bg-orange-50 min-w-24 drop-shadow-md"
						>
							Cancel
						</button>
					</div>
				</aside>
			</Modal>
		</section>
	);
}
