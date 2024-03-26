import { useContext, useState } from "react";
import axios from "../api/axios";
import { UserContext } from "../context/UserContext";
import useRefreshToken from "../hooks/useRefreshToken";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const {setUser} = useContext(UserContext)

	const googleLogin = async (e) => {
		e.preventDefault();
		const handleMessage = (event) => {
			console.log(event);
			if (event.origin !== "http://localhost:4000") {
				return;
			}

			if (event.data.userToken) {
				console.log("User login success");
				console.log("User token", event.data.userToken);
			} else {
				console.log("User login failed");
			}
			window.removeEventListener("message", handleMessage);
		};

		window.addEventListener("message", handleMessage, { once: true });
		window.open("http://localhost:4000/auth/google", "_blank");
	};

	const login = async (e) => {
		e.preventDefault();

		const userData = {
							username,
							password,}

		await axios.post("/login", userData, {withCredentials: true})
		.then(res => {
			setUser(res.data)
			console.log(res.data)
		})
		.catch(err => {
			console.log(err.response.data)
		})

	};

	return (
		<>
			<h1>Login</h1>
			<button onClick={googleLogin}>Login with Google</button>

			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="text"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={login}>Login</button>
			<button onClick={useRefreshToken}>refresh</button>
		</>
	);
}
