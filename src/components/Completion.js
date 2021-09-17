import React from "react";

export default function Completion ({details}) {
    if(!details){
        return <h3>Loading your order&apos;s details...</h3>;
    }

    return (
        <div className='review'>
            <h2>{details.name}'s Order Details</h2>
            <p>Pizza Size: {details.size}</p>
            {
                !!details.toppings && !!details.toppings.length &&
                <div>
                    Toppings:
                    <ul>
                        {details.toppings.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </div>
            }
            <p> Instructions: {details.instructions}</p>
        </div>
    );
}