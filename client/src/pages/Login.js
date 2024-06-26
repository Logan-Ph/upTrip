import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { useGoogleLogin } from '@react-oauth/google';
import failedNotify from '../utils/failedNotify'
import googleAxios from '../api/googleAxios';
import Logo from "../components/images/UptripLogo.png";
import useHandleNavigate from '../utils/useHandleNavigate';

const LOGIN_URL = '/login';

const Login = () => {
	const { setAuth } = useAuth(); // get the setAuth function
	const handleNavigate = useHandleNavigate()

	const [userEmail, setUserEmail] = useState(''); // create state for the username
	const [password, setPassword] = useState(''); // create state for the password

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(LOGIN_URL,
				JSON.stringify({ email: userEmail, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			);
			const { accessToken, roles, email, _id } = response?.data;
			setAuth({ roles, accessToken, email, _id });
			setUserEmail('');
			setPassword('');
			handleNavigate("/")
		} catch (err) {
			failedNotify(err.response.data)
		}
	}

	const signIn = useGoogleLogin({
		onSuccess: async (response) => {
			try {
				const googleRes = await googleAxios.get("/oauth2/v3/userinfo",
					{
						headers: {
							Authorization: `Bearer ${response.access_token}`
						},
					})
				const serverRes = await axios.post('/google/auth/login', googleRes.data, { withCredentials: true })
				const { accessToken, roles, email, _id } = serverRes?.data;
				setAuth({ roles, accessToken, email, _id });
				setUserEmail('');
				setPassword('');
				handleNavigate("/")
			} catch (err) {
				failedNotify(err.response.data)
			}
		}
	})

	return (
        <div className="flex h-screen w-screen items-center justify-center bg-loginbackground bg-cover bg-center">
            <header className="absolute top-0 left-0 mx-auto p-8">
                <a href="/">
                    <img src={Logo} className="w-32 h-auto" alt="logo" />
                </a>
            </header>

            <div className="flex flex-col md:flex-row w-full max-w-sm md:max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="hidden md:flex md:w-1/2 justify-center items-center p-4 ">
                    <div className="h-full">
                        <img
                            src="https://ik.imagekit.io/Uptrip/newdecorativeimg.jpg?updatedAt=1711383997767"
                            alt="decorative"
                            loading="lazy"
                            className="w-full h-full object-fill rounded-xl border-gray-600"
                        />
                    </div>
                </div>
                {/* <ToastContainer/> */}
                <div className="w-full md:w-1/2 p-6">
                    <div>
                        <p className="text-center md:text-start text-2xl font-extrabold text-gray-900">
                            Log in
                        </p>
                        <p className="text-center md:text-start text-md font-light text-gray-600 mt-2">
                            Get an account to level up your trip
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                        action="#"
                        method="POST"
                    >
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    onChange={(e) =>
                                        setUserEmail(e.target.value)
                                    }
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#8DD3BB] focus:outline-none focus:ring-[#8DD3BB] sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#8DD3BB] focus:outline-none focus:ring-[#8DD3BB] sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-black focus:ring-[#8DD3BB]border-gray-300 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link className="font-medium text-black hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border-[#8DD3BB] border-transparent bg-[#8DD3BB] py-2 px-4 text-sm font-medium text-white hover:bg-[#CDEAE1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDEAE1] hover:text-black"
                                onClick={handleSubmit}
                            >
                                Log in
                            </button>
                        </div>

                        <div className="flex">
                            <p className="mx-auto">
                                Don't have an account?{" "}
                                <Link
                                    className="items-center font-bold"
                                    onClick={() => handleNavigate("/signup")}
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        <div className="divider">Or</div>

                        <div
                            onClick={signIn}
                            className="group relative flex w-full justify-center rounded-md border-[#8DD3BB] border-2 bg-white py-2 px-4 text-sm font-medium text-black hover:bg-[#CDEAE1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDEAE1] hover:text-black hover:border-[#CDEAE1] cursor-pointer"
                        >
                            <img
                                className="w-5 h-5"
                                src="https://ik.imagekit.io/Uptrip/google.png?updatedAt=1711371495172"
                                alt="Google icon"
                            />
                            <div
                                type="submit"
                                target="_blank"
                                className="ml-2 cursor-pointer"
                            >
                                Login with Google
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login