import { useState } from "react";
import { Table, Tooltip } from "flowbite-react";
import analytics_icon from "../assets/view_analytics.svg";
import edit_url_icon from "../assets/url_edit.svg";
import delete_url_icon from "../assets/url_delete.svg";
import copy_url_icon from "../assets/copy.svg";

function Dashboard() {

    const [copied, setCopied] = useState(false);

    const tableHeaders = [
        "title",
        "original url",
        "short url",
        "domain",
        "no of clicks",
        "actions"
    ]

    const urls = [
        {
            title: "Emoji",
            original_url: "https://emojipedia.org/check-mark-button",
            short_url: "http://localhost:5000/D9VIQ3",
            domain: "http://localhost:5000",
            clicks: 42,
            _id: "65353d4ce2ae86066179b34c"
        }
    ]

    const actionsArray = [
        {
            tooltip_content: "View Analytics",
            img: {
                src: analytics_icon,
                alt: "view analytics icon"
            }
        },
        {
            tooltip_content: "Edit",
            img: {
                src: edit_url_icon,
                alt: "edit url icon"
            }
        },
        {
            tooltip_content: "Delete",
            img: {
                src: delete_url_icon,
                alt: "delete url icon"
            }
        }
    ]

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard');
                // Show that url is copied and revert after 5 seconds
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 5000)
            })
            .catch((err) => {
                console.error('Unable to copy text: ', err);
            });
    }

    return (
        <div className="m-10">
            <Table>
                <Table.Head>
                    {
                        tableHeaders.map((header, index) => (
                            <Table.HeadCell key={index}>{header}</Table.HeadCell>
                        ))
                    }
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        urls.map(url => (
                            <Table.Row key={url._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{url.title}</Table.Cell>
                                <Table.Cell>{url.original_url}</Table.Cell>
                                <Table.Cell className="flex gap-3 items-center">
                                    {url.short_url}
                                    <Tooltip
                                        animation="duration-1000"
                                        content={copied ? "Copied" : "Copy URL"}
                                    >
                                        <img
                                            src={copy_url_icon}
                                            className="mr-3 h-2 sm:h-4 cursor-pointer"
                                            alt="copy url icon"
                                            onClick={() => copyToClipboard(url.short_url)}
                                        />
                                    </Tooltip>
                                </Table.Cell>
                                <Table.Cell>{url.domain}</Table.Cell>
                                <Table.Cell>{url.clicks}</Table.Cell>
                                <Table.Cell className="flex">
                                    {
                                        actionsArray.map((action, index) => (
                                            <Tooltip
                                                key={index}
                                                animation="duration-1000"
                                                content={action.tooltip_content}
                                            >
                                                <img src={action.img.src} className="mr-3 h-2 sm:h-4 cursor-pointer" alt={action.img.alt} />
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