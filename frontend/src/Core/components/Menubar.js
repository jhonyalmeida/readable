import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link" to="/">All Posts</Link>
            </li>
            {props.categories.map(c => (
                <li className="nav-item" key={c.name}>
                    <Link className="nav-link" to={`/${c.path}`}>{c.name}</Link>
                </li>
            ))}
        </ul>
    )
}