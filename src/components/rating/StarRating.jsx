import React from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({ rating }) => {
    return (
        <div className="star-rating ">
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    className={index < Math.floor(rating) ? 'active' : ''}
                />
            ))}
        </div>
    );
};

export default StarRating;
