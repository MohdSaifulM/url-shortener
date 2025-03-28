import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import PopModal from "../components/PopModal";

function Register() {
    const [toggleModal, setToggleModal] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [user, setUser] = useState({ username: '', email: '', password: '', confirmPassword: '' });

    const { register, error, userAuthenticated } = useRegister();

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!termsChecked) toast("Please accept the terms and conditions");
        try {
            await register(user.username, user.email, user.password, user.confirmPassword);
            if (userAuthenticated) {
                toast("Successfully registered");
                navigate('/');
            } else {
                toast.error(error);
            }
        } catch (err) {
            console.error("Error registering user ::", error);
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div
                className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
                style={{ height: "calc(100vh - 60px)" }}
            >
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register as a new user
                        </h1>
                        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your username
                                </label>
                                <input
                                    type="username"
                                    id="username"
                                    name="username"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="username"
                                    onChange={handleChange}
                                    value={user.username}
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="name@email.com"
                                    onChange={handleChange}
                                    value={user.email}
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    onChange={handleChange}
                                    value={user.password}
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="repeat-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Repeat password
                                </label>
                                <input
                                    type="password"
                                    id="repeat-password"
                                    name="confirmPassword"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    onChange={handleChange}
                                    value={user.confirmPassword}
                                    required
                                />
                            </div>
                            <div className="flex items-start mb-5">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        checked={termsChecked}
                                        onChange={() => setTermsChecked(!termsChecked)}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                        required
                                    />
                                </div>
                                <label
                                    htmlFor="terms"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    I agree with the{" "}
                                    <button
                                        onClick={() => setToggleModal(true)}
                                        className="text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        terms and conditions
                                    </button>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Register new account
                            </button>
                            {
                                error &&
                                <p className="text-sm font-light text-red-500 dark:text-red-400">
                                    {error}
                                </p>
                            }
                        </form>
                    </div>
                </div>
            </div>
            <PopModal toggleModal={toggleModal} closeModal={() => setToggleModal(false)} modalType="terms" acceptTerms={() => setTermsChecked(true)} declineTerms={() => setTermsChecked(false)}/>
        </section>
    );
}

export default Register;
