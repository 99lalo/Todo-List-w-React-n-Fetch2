import React, { useState, useEffect } from "react";

//include images into your bundle
//create your first component
export function List() {
	const [isShown, setIsShown] = useState(false);
	const [task, setTask] = useState([]);
	const [userInput, setInput] = useState("");
	useEffect(() => {
		fetch("https://3000-chocolate-beetle-xhfmdj1t.ws-us03.gitpod.io/todos")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function(responseAsJson) {
				// Do stuff with the JSON
				setTask(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);
	const handleRemoval = taskid => {
		fetch(
			`https://3000-chocolate-beetle-xhfmdj1t.ws-us03.gitpod.io/todos/${taskid}`,
			{
				method: "DELETE"
			}
		)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(response => {
				console.log("Success:", response);
				fetch(
					"https://3000-chocolate-beetle-xhfmdj1t.ws-us03.gitpod.io/todos"
				)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json(); // Read the response as json.
					})
					.then(function(responseAsJson) {
						setTask(responseAsJson); // Set json into list
					})
					.catch(function(error) {
						console.log(
							"Looks like there was a problem: \n",
							error
						);
					});
			})
			.catch(error => console.error("Error:", error));
	};
	const handleKeyDown = e => {
		if (e.keyCode == 13 && userInput != "") {
			fetch(
				"https://3000-chocolate-beetle-xhfmdj1t.ws-us03.gitpod.io/todos",
				{
					method: "POST",
					body: JSON.stringify({
						label: userInput,
						done: false,
						user: "Mikey"
					}),
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then(response => {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response.json();
				})
				.then(response => {
					console.log("Success:", response);
					fetch(
						"https://3000-chocolate-beetle-xhfmdj1t.ws-us03.gitpod.io/todos"
					)
						.then(function(response) {
							if (!response.ok) {
								throw Error(response.statusText);
							}
							return response.json(); // Read the response as json.
						})
						.then(function(responseAsJson) {
							setTask(responseAsJson); // Set json into list
						})
						.catch(function(error) {
							console.log(
								"Looks like there was a problem: \n",
								error
							);
						});
				})
				.catch(error => console.error("Error:", error));
			setInput("");
		}
	};
	const handleDone = taskid => {
		fetch(
			`https://3000-chocolate-beetle-xhfmdj1t.ws-us03.gitpod.io/todos/${taskid}`,
			{
				method: "PUT",
				body: JSON.stringify({
					done: true
				}),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(response => {
				console.log("Success:", response);
				fetch(
					"https://3000-chocolate-beetle-xhfmdj1t.ws-us03.gitpod.io/todos"
				)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json(); // Read the response as json.
					})
					.then(function(responseAsJson) {
						setTask(responseAsJson); // Set json into list
					})
					.catch(function(error) {
						console.log(
							"Looks like there was a problem: \n",
							error
						);
					});
			})
			.catch(error => console.error("Error:", error));
	};
	return (
		<div className="container">
			<div className="d-flex justifyg-content-center">
				<h1>todos</h1>
			</div>
			<ul className="list-group">
				<li className="list-group-item">
					<input
						onChange={event => setInput(event.target.value)}
						value={userInput}
						onKeyDown={handleKeyDown}
						placeholder="What needs to be done?"
						style={{ border: "none", width: "50em" }}
					/>
				</li>
				{task.length == 0 ? (
					<li className="list-group-item">No tasks, add a task</li>
				) : (
					task.map((t, index) => (
						<li
							className="list-group-item"
							key={index}
							onMouseEnter={() => setIsShown(t.label)}
							onMouseLeave={() => setIsShown(false)}>
							{t.label}
							{t.done == true && "(done)"}
							{isShown == t.label && (
								<span
									style={{ float: "right", color: "red" }}
									onClick={() => handleRemoval(t.id)}>
									X
								</span>
							)}
							{isShown == t.label &&
								t.done != true && (
									<i
										className="fas fa-check"
										style={{
											float: "right",
											color: "green"
										}}
										onClick={() => handleDone(t.id)}
									/>
								)}
						</li>
					))
				)}
				<li className="list-group-item disabled">
					{task.length} items left
				</li>
			</ul>
		</div>
	);
}
