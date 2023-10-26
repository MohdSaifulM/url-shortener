import { useState } from "react";
import { toast } from 'react-toastify';
import { Card, Tooltip } from 'flowbite-react';
import { UrlInterface } from "../interfaces/Url";
import { copyToClipboard } from "../utils/copyToClipboard";
import link_icon from '../assets/link.svg';
import web_icon from '/web-internet.svg'
import axios from "axios";

function URLInput() {
    const api_url = import.meta.env.VITE_API_URL;
    const domain = import.meta.env.VITE_DOMAIN_URL;

    const [inputURL, setInputURL] = useState('');
    const [isValidURL, setIsValidURL] = useState(true);
    const [showOutputCard, setShowOutputCard] = useState(false);
    const [outputURL, setOutputURL] = useState<UrlInterface | null>(null);
    const [copied, setCopied] = useState(false);

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
                const response = await axios.post(`${api_url}/url/create`, { original_url: inputURL, domain: domain });
                if (response) {
                    // Show success toast
                    toast("Successfully shorten URL ✅");
                    // Clear input box
                    setInputURL('');
                    // Set output URL
                    setOutputURL(response.data);
                    // Show output card
                    setShowOutputCard(true);
                }
            } else {
                setIsValidURL(false);
            }
        } catch (error) {
            console.error("Error shortening URL", error);
        }
    }

    return (
        <>
            {
                showOutputCard ?
                    <Card className="dark:bg-gray-700 absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center font-light">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-1">
                                <img src={link_icon} alt="link icon" className="w-[14px]" />
                                <label htmlFor="long-url" className="text-sm text-left text-gray-500 dark:text-white">Your original URL</label>
                            </div>
                            <Tooltip
                                animation="duration-1000"
                                content={copied ? "Copied" : "Click here to copy"}
                                onClick={() => copyToClipboard(outputURL ? outputURL.original_url : "", setCopied)}
                                className="cursor-pointer"
                            >
                                <input
                                    type="text"
                                    id="long-url"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white cursor-copy"
                                    value={outputURL?.original_url}
                                    disabled
                                    readOnly
                                />
                            </Tooltip>
                            <div className="flex gap-1">
                                <img src={web_icon} alt="link icon" className="w-[14px]"/>
                                <label htmlFor="long-url" className="text-sm text-left text-gray-500 dark:text-white">sURL</label>
                            </div>
                            <Tooltip
                                animation="duration-1000"
                                content={copied ? "Copied" : "Click here to copy"}
                                onClick={() => copyToClipboard(outputURL ? `${domain}/${outputURL?.short_url}` : "", setCopied)}
                                className="cursor-pointer"
                            >
                                <input
                                    type="text"
                                    id="long-url"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={`${domain}/${outputURL?.short_url}`}
                                    disabled 
                                    readOnly
                                />
                            </Tooltip>
                            <div 
                                className="text-right cursor-pointer hover:text-blue-500"
                                onClick={() => setShowOutputCard(false)}
                            >
                                👈 Go Back
                            </div>
                        </div>
                    </Card> :
                    <Card className="dark:bg-gray-700 absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center font-light">
                        <div className="flex flex-col gap-5">
                            <label htmlFor="url-input" className="text-xl text-left text-gray-500 dark:text-white">Shorten URL 👇</label>
                            <input
                                type="text"
                                id="url-input"
                                className={`w-full bg-gray-50 border ${isValidURL ? 'border-gray-300' : 'border-red-500'
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                value={inputURL}
                                placeholder="Enter your looong URL"
                                onChange={handleInputChange}
                            />
                            {!isValidURL && inputURL.trim() !== '' && (
                                <p className="text-red-400 text-sm">Please enter a valid URL</p>
                            )}
                        </div>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handleClick}
                        >
                            Submit
                        </button>
                        <div 
                            className="text-xs cursor-pointer hover:text-blue-500"
                        >
                            More Options
                        </div>
                    </Card>
            }
        </>
    );
}

export default URLInput;