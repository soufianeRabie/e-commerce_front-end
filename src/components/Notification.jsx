import React, { useState, useEffect } from 'react';

const Notification = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 5000); // Adjust the duration (in milliseconds) the notification is visible

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-0 right-0 m-4 p-4 bg-green-500 text-white ${visible ? '' : 'hidden'}`}>
            {message}
        </div>
    );
};

export default Notification;
