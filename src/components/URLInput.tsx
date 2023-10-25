import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function URLInput() {
    const api_url = import.meta.env.VITE_API_URL;

    const [inputURL, setInputURL] = useState('');
    const [isValidURL, setIsValidURL] = useState(true);

    // Regular expression for a URL pattern
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    const handleInputChange = (event: { target: { value: any; }; }) => {
        // Get value from url input
        const url = event.target.value;

        // Check if input is valid
        if (urlPattern.test(url)) setIsValidURL(true);

        // Update state with url value
        setInputURL(url);
    }

    const handleClick = async () => {
        try {
            // Check if input is valid
            if (urlPattern.test(inputURL)) {
                // Save shorten URL
                const response = await axios.post(`${api_url}/url/create`, { original_url: inputURL });
                if (response) {
                    // Show success toast
                    toast("Successfully shorten URL ✅");
                    // Clear input box
                    setInputURL('');
                }
            } else {
                setIsValidURL(false);
            }
        } catch (error) {
            console.error("Error shortening URL", error);
        }
    }

    return (
        <div className="dark:bg-gray-700 absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center font-light">
            <div className="mb-6">
                <label htmlFor="url-input" className="md:text-3xl block mb-2 text-2xl text-center text-gray-500 dark:text-white">Input URL to shorten</label>
                <input
                    type="text"
                    id="url-input"
                    className={`w-full bg-gray-50 border ${isValidURL ? 'border-gray-300' : 'border-red-500'
                        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    value={inputURL}
                    onChange={handleInputChange}
                />
                {!isValidURL && inputURL.trim() !== '' && (
                    <p className="text-red-400 text-sm mt-2">Please enter a valid URL</p>
                )}
            </div>
            <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                onClick={handleClick}
            >
                Submit
            </button>
        </div>
    );
}

export default URLInput;