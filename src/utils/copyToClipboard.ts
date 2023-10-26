import React from "react";

export const copyToClipboard = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
            // Show that url is copied and revert after 5 seconds
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000)
        })
        .catch((err) => {
            console.error('Unable to copy text: ', err);
        });
}