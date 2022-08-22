import React from 'react';
import { Form } from 'react-bootstrap';
import './Search.css';

const Search = props => {
    const handleInputChange = (e) => {
        e.preventDefault();
        props.onSearchChange(e.target.value);
    }

    return (
        <Form>
            <Form.Group>
                <Form.Control type="text" onChange={handleInputChange} placeholder="Enter user name" />
            </Form.Group>
        </Form>
    )
}

export default Search;