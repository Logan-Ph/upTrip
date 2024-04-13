import { Link } from "react-router-dom";
import Logo from "../components/images/UptripLogo.png";
import failedNotify from "../utils/failedNotify";
import successNotify from "../utils/successNotify";
import useAuth from "../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import googleAxios from "../api/googleAxios";
import axios from "../api/axios";
import useHandleNavigate from "../utils/useHandleNavigate";
import { useState } from "react";

export default function SignUp() {
    const { setAuth } = useAuth(); // get the setAuth function
    const handleNavigate = useHandleNavigate();

    const signIn = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const googleRes = await googleAxios.get("/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`,
                    },
                });
                const serverRes = await axios.post(
                    "/google/auth/login",
                    googleRes.data,
                    { withCredentials: true }
                );
                const { accessToken, roles } = serverRes?.data;
                setAuth({ roles, accessToken });
                handleNavigate();
            } catch (err) {
                failedNotify(err.response.data);
            }
        },
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [checked, setChecked] = useState(false);

    const data = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
    };

    async function axiosPostData() {
        try {
            const passwordPattern =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!(email && password && firstName && lastName && checked)) {
                failedNotify("The field is empty");
                return;
            }

            if (!passwordPattern.test(password)) {
                failedNotify(
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
                );
                return;
            }

            await axios
                .post("/signup", data, { withCredentials: true })
                .then((res) => {
                    successNotify(res.data);
                })
                .catch((er) => {
                    failedNotify(er.response.data);
                });
        } catch (error) {
            console.error("Registration failed", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosPostData();
    };

    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center bg-loginbackground bg-cover bg-center">
                <header className="absolute top-0 left-0 mx-auto p-8">
                    <a href="/">
                        <img src={Logo} className="w-32 h-auto" alt="logo" />
                    </a>
                </header>

                <div className="w-full max-w-sm md:max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                    <div class="md:grid grid-cols-3">
                        <div className="p-6 md:col-span-2 my-auto">
                            <div>
                                <h1 class="text-center md:text-start text-2xl font-extrabold text-gray-900">
                                    Sign Up
                                </h1>
                                <p class="text-center md:text-start text-md font-light text-gray-600 mt-2">
                                    Join to elevate your travel experience.
                                </p>
                                {/* Sign Up Form */}

                                <form
                                    name="SignUpForm"
                                    className="mt-5 space-y-3"
                                >
                                    <div className=" grid grid-cols-1 gap-x-6 space-y-3 sm:space-y-0 sm:gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="first-name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    onChange={(e) =>
                                                        setFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-3 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="last-name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    onChange={(e) =>
                                                        setLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input
                                                id="terms"
                                                type="checkbox"
                                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                                                checked={checked}
                                                onChange={(e) =>
                                                    setChecked(e.target.checked)
                                                }
                                                required
                                            />
                                        </div>
                                        <label
                                            for="terms"
                                            class="ms-2 text-sm font-medium text-gray-900 "
                                        >
                                            I agree with the{" "}
                                            <span
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "my_modal_3"
                                                        )
                                                        .showModal()
                                                }
                                                class="text-blue-600"
                                            >
                                                terms and conditions
                                            </span>
                                        </label>
                                        {/* <!-- Main modal --> */}
                                        <dialog
                                            id="my_modal_3"
                                            className="modal"
                                        >
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                        ✕
                                                    </button>
                                                </form>
                                                <h3 className="font-bold text-lg">
                                                    Terms and Conditions
                                                </h3>
                                                <p className="py-4">
                                                    Welcome to Uptrip! These
                                                    terms and conditions govern
                                                    your use of our website and
                                                    services. By accessing or
                                                    using Uptrip, you agree to
                                                    abide by these terms. Please
                                                    read them carefully. <br />
                                                    <br />
                                                    <b>
                                                        Use of Services:{" "}
                                                    </b>{" "}
                                                    Uptrip provides a platform
                                                    for users to compare prices
                                                    of hotels, flights, tours,
                                                    and experiences from various
                                                    travel platforms. You may
                                                    use our services for
                                                    personal, non-commercial
                                                    purposes only.
                                                    <br />
                                                    <br />
                                                    <b>User Accounts:</b> To
                                                    access certain features of
                                                    Uptrip, you may need to
                                                    create a user account. You
                                                    are responsible for
                                                    maintaining the
                                                    confidentiality of your
                                                    account credentials and for
                                                    all activities that occur
                                                    under your account. <br />
                                                    <br />
                                                    <b>Content: </b>The content
                                                    provided on Uptrip,
                                                    including but not limited to
                                                    hotel listings, flight
                                                    details, and tour
                                                    information, is for
                                                    informational purposes only.
                                                    We do not endorse or
                                                    guarantee the accuracy of
                                                    any third-party content.{" "}
                                                    <br />
                                                    <br />
                                                    <b>
                                                        Intellectual Property:
                                                    </b>{" "}
                                                    All intellectual property
                                                    rights related to Uptrip,
                                                    including trademarks, logos,
                                                    and content, are owned by
                                                    Uptrip or its licensors. You
                                                    may not use our intellectual
                                                    property without prior
                                                    written consent. <br />
                                                    <br />
                                                    <b>
                                                        Prohibited Conduct:
                                                    </b>{" "}
                                                    You agree not to engage in
                                                    any conduct that violates
                                                    these terms or infringes
                                                    upon the rights of others.
                                                    Prohibited conduct includes
                                                    but is not limited to
                                                    unauthorized access to our
                                                    systems, interference with
                                                    our services, and misuse of
                                                    user data.
                                                    <br />
                                                    <br />
                                                    <b>Privacy:</b> We respect
                                                    your privacy and are
                                                    committed to protecting your
                                                    personal information. Please
                                                    review our Privacy Policy to
                                                    understand how we collect,
                                                    use, and disclose your data.{" "}
                                                    <br />
                                                    <br />
                                                    <b>Changes to Terms:</b> We
                                                    reserve the right to update
                                                    or modify these terms and
                                                    conditions at any time. Any
                                                    changes will be effective
                                                    immediately upon posting to
                                                    our website. It is your
                                                    responsibility to review
                                                    these terms periodically.{" "}
                                                    <br />
                                                    <br /> If you have any
                                                    questions or concerns about
                                                    these terms and conditions,
                                                    please contact us at{" "}
                                                    <i>
                                                        levelupyourtrip@gmail.com
                                                    </i>
                                                </p>
                                            </div>
                                        </dialog>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="mt-5 group relative flex w-full justify-center rounded-md border-[#8DD3BB] border-transparent bg-[#8DD3BB] py-2 px-4 text-sm font-medium text-white hover:bg-[#CDEAE1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDEAE1] hover:text-black"
                                        >
                                            Create account
                                        </button>
                                    </div>
                                </form>

                                <div className="text-center mt-4">
                                    <p>
                                        Already have an account?
                                        <Link to="/login" className="font-bold">
                                            {" "}
                                            Login
                                        </Link>
                                    </p>
                                </div>

                                <div className="divider my-6">Or</div>
                                <div
                                    onClick={signIn}
                                    className="group relative flex w-full justify-center rounded-md border-[#8DD3BB] border-2 bg-white py-2 px-4 text-sm font-medium text-black hover:bg-[#CDEAE1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDEAE1] hover:text-black hover:border-[#CDEAE1]"
                                >
                                    <img
                                        className="w-5 h-5"
                                        src="https://ik.imagekit.io/Uptrip/google.png?updatedAt=1711371495172"
                                        alt="Sing in with Google"
                                    />
                                    <div
                                        type="submit"
                                        target="_blank"
                                        className="ml-2"
                                    >
                                        Sign in with Google
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block col-span-1 h-full my-auto justify-center items-center p-4 ">
                            <img
                                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2755&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="decorative"
                                className="h-full object-cover rounded-xl"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
