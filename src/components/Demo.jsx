import React from 'react';
import { Link } from 'react-router-dom';

const Demo = () => {
    return (
        <div>
            <Link to={"/"}>Home</Link>
            <Link to={"counter"}>Counter</Link>
            <Link to={"product"}>Product</Link>
        </div>
    );
}

export default Demo;
