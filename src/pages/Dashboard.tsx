import { useState, useEffect } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";
import { useAuthContext } from "../hooks/useAuthContext";
import { Table, Tooltip } from "flowbite-react";
import { UrlInterface } from "../interfaces/Url";
// import analytics_icon from "../assets/view_analytics.svg";
// import edit_url_icon from "../assets/url_edit.svg";
import delete_url_icon from "../assets/url_delete.svg";
import copy_url_icon from "../assets/copy.svg";
import axios from "axios";

function Dashboard() {
    const api_url = import.meta.env.VITE_API_URL;
    const domain = import.meta.env.VITE_DOMAIN_URL;
    const { user } = useAuthContext();

    const [copied, setCopied] = useState(false);
    const [urls, setUrls] = useState<UrlInterface[]>([]);

    const tableHeaders = [
        "title",
        "original url",
        "short url",
        "",
        "domain",
        "no of clicks",
        "actions"
    ]

    const actionsArray = [
        // {
        //     tooltip_content: "View Analytics",
        //     img: {
        //         src: analytics_icon,
        //          alt: "view analytics icon"
        //      }
        //  },
        //  {
        //      tooltip_content: "Edit",
        //      img: {
        //          src: edit_url_icon,
        //          alt: "edit url icon"
        //      }
        //  },
         {
             tooltip_content: "Delete",
            img: {
                 src: delete_url_icon,
                 alt: "delete url icon"
             }
         }
     ]

    const fetchAllURLs = async () => {
        try {
            //@ts-ignore
            const response = await axios.get(`${api_url}/url/all/${user?.logged_in_user._id}`);
            if (response && response.status === 200) setUrls(response.data);
        } catch (error) {
            console.error("Error fetching all urls ::", error);
        }
    }

    const deleteURL = async (url: UrlInterface) => {
        try {
            await axios.delete(`${api_url}/url/delete/${url._id}`);
            fetchAllURLs();
        } catch (error) {
            console.error("Error deleting url ::", error);
        }
    }

    const handleAction = async (url: UrlInterface, action: string) => {
        try {
            switch (action) {
                case "Delete":
                    await deleteURL(url);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Error deleting url ::", error);
        }
    }

    useEffect(() => {
        fetchAllURLs();
    }, [])

    return (
        <div className="md:flex md:w-full h-[90%] justify-center items-center">
            <Table>
                <Table.Head>
                    {
                        tableHeaders.map((header, index) => (
                            <Table.HeadCell key={index}>{header}</Table.HeadCell>
                        ))
                    }
                </Table.Head>
                <Table.Body className="divide-y overflow-auto">
                    {
                        urls.map((url, index) => (
                            <Table.Row key={url._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index + 1}</Table.Cell>
                                <Table.Cell className="truncate max-w-xs">{url.original_url}</Table.Cell>
                                <Table.Cell className="flex gap-3 items-center">
                                    {url.short_url}
                                </Table.Cell>
                                <Table.Cell>
                                    <Tooltip
                                        animation="duration-1000"
                                        content={copied ? "Copied" : "Copy URL"}
                                    >
                                        <img
                                            src={copy_url_icon}
                                            className="mr-3 h-2 sm:h-4 cursor-pointer"
                                            alt="copy url icon"
                                            onClick={() => copyToClipboard(`${domain}/${url.short_url}`, setCopied)}
                                        />
                                    </Tooltip>
                                </Table.Cell>
                                <Table.Cell>{url.domain}</Table.Cell>
                                <Table.Cell>{url.clicks.length}</Table.Cell>
                                <Table.Cell className="flex">
                                    {
                                        actionsArray.map((action, index) => (
                                            <Tooltip
                                                key={index}
                                                animation="duration-1000"
                                                content={action.tooltip_content}
                                            >
                                                <img 
                                                    src={action.img.src} 
                                                    className="mr-3 h-2 sm:h-4 cursor-pointer" 
                                                    alt={action.img.alt} 
                                                    onClick={() => handleAction(url, action.tooltip_content)}
                                                />
                                            </Tooltip>
                                        ))
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    );
}

export default Dashboard;
