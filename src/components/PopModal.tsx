import { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";

function PopModal({
    toggleModal,
    closeModal,
}: {
    toggleModal: boolean;
    closeModal: () => void;
}) {
    const [openModal, setOpenModal] = useState(false);

    const termsAndConditions = [
        {
            title: "Acceptance of Terms",
            description:
                "By accessing or using our URL shortener application, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access or use our services.",
        },
        {
            title: "Description of Service",
            description:
                "Our URL shortener application allows users to shorten long URLs into shorter, more manageable URLs. The shortened URL is then displayed on the web page and can be used to access the original URL.",
        },
        {
            title: "User Accounts",
            description:
                "Users can create user accounts to access and manage their own shortened URLs.",
        },
        {
            title: "User Conduct",
            description:
                "Users must comply with these terms and conditions to use our services.",
        },
        {
            title: "Privacy Policy",
            description:
                "Our privacy policy outlines how we collect, use, and disclose personal information. By using our services, you agree to the terms of our privacy policy.",
        },
        {
            title: "Limitation of Liability",
            description:
                "We are not responsible for any loss or damage that may occur as a result of using our services.",
        },
        {
            title: "Modication of Terms",
            description:
                "We may modify these terms and conditions at any time. Users are responsible for checking these terms and conditions periodically for any changes.",
        },
        {
            title: "Governing Law",
            description:
                "These terms and conditions are governed by and construed in accordance with the laws of Singapore.",
        },
        {
            title: "Contact Us",
            description:
                "If you have any questions or concerns about these terms and conditions, please contact us at admin@surl.com.",
        }
    ];

    useEffect(() => {
        setOpenModal(toggleModal);
    }, [toggleModal]);

    return (
        <Modal show={openModal} onClose={() => closeModal()}>
            <Modal.Header>Terms and Conditions</Modal.Header>
            <Modal.Body>
                <div className="max-w-2xl mx-auto p-4">
                    <div className="text-sm mb-4">
                        <p className="mb-2">
                            Welcome to sURL! Before using our services, please
                            read these Terms and Conditions carefully.
                        </p>
                    </div>
                    {termsAndConditions.map((term, index) => (
                        <div key={index} className="text-sm mb-4">
                            <p className="font-bold">{term.title}</p>
                            <p>{term.description}</p>
                        </div>
                    ))}
                    <p className="text-sm">
                        By using our URL shortener application, you agree to
                        abide by these Terms and Conditions. Thank you for using
                        sURL!
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm text-center" onClick={() => closeModal()}>Accept</Button>
                <Button color="gray" onClick={() => closeModal()}>
                    Decline
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopModal;
