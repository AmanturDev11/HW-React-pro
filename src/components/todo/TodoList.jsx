import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./TodoList.css";
const url =
	"https://elchocrud.pro/api/v1/9dfe572764cf2e82f16756ef46b7caa9/todo";

const TodoList = () => {
	const [todo, setTodo] = useState([]);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [isEdit, setIsEdit] = useState(false);
	const [editId, setEditId] = useState("");
	const [editTitle, setEditTitle] = useState("");
	const [editImage, setEditImage] = useState("");
	const [editDescription, setEditDescription] = useState("");

	const handleAdd = async () => {
		const newData = {
			title: title,
			image: image,
			description: description,
		};
		const response = await axios.post(url, newData);
		setTodo(response.data);
	};

	const getTodos = async () => {
		const response = await axios.get(url);
		setTodo(response.data);
	};

	const deleteTodo = async (id) => {
		const response = await axios.delete(`${url}/${id}`);
		console.log(response.data);
		setTodo(response.data);
	};

	const updateTodo = async (id) => {
		const updatedData = {
			title: editTitle,
			image: editImage,
			description: editDescription,
		};

		const response = await axios.put(`${url}/${id}`, updatedData);
		console.log(response.data);
		setTodo(response.data);
		setIsEdit(false);
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			<div className="container1">
				<div className="content1">
				<h1>TodoList</h1>
				</div>
				<div className="contentinput">
				<input
					type="text"
					placeholder="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type="text"
					placeholder="image"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<input
					type="text"
					placeholder="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button onClick={handleAdd}>Add</button>
				</div>
			</div>

			{todo.map((item) => (
				<div key={item._id}>
					{isEdit && editId === item._id ? (
						<>
							<div className="container2">
								<input
									type="text"
									placeholder="title"
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
								/>
								<input
									type="text"
									placeholder="image"
									value={editImage}
									onChange={(e) => setEditImage(e.target.value)}
								/>
								<input
									type="text"
									placeholder="description"
									value={editDescription}
									onChange={(e) => setEditDescription(e.target.value)}
								/>
								<button onClick={() => updateTodo(item._id)}>Save</button>
							</div>
						</>
					) : (
						<>
							<div className="container2">
								<h1>{item.title}</h1>
								<img className="img2" src={item.image} alt={item.title} />
								<p>{item.description}</p>
							</div>
							<button
								onClick={() => {
									setEditId(item._id);
									setEditTitle(item.title);
									setEditImage(item.image);
									setEditDescription(item.description);
									setIsEdit(true);
								}}>
								Edit
							</button>
						</>
					)}
					<button
						onClick={() => {
							deleteTodo(item._id);
						}}>
						Delete
					</button>
				</div>
			))}
		</div>
	);
};

export default TodoList;
