import React from 'react';

function NumberList(props) {
    return (
        <ul>
            {props.numbers.map((num, index) => <li key={index}>{num}</li>)}
        </ul>
    );
}

export default NumberList;
