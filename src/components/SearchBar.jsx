import React, { useState } from 'react';
import './SearchBar.css';
import { Link } from 'react-router-dom';





const SearchBar = ({ onSearch, onSort }) => {
    const [query, setQuery] = useState('');
    const [sortOption, setSortOption] = useState('default')

    const handleChange = (e) => {
        setQuery(e.target.value);
        console.log(query)
    };

    const handleSearchClick = () => {
        onSearch(query);
    };

    const handleSortChange = (e) => {
        console.log('sort option -->', e.target.value)
        setSortOption(e.target.value);
        onSort(e.target.value);
    };

    // const handleKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         handleSearch();
    //     }
    // };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className='row'>
                <div className="col-2 d-flex justify-content-around mt-3">
                    <Link to="/login" className="btn btn-info">Login</Link>
                    <Link to="/register" className="btn btn-outline-secondary">Register</Link>
                </div>
                <div className='col-8'>
                    <input
                        className='searchInput'
                        type="text"
                        value={query}
                        onChange={handleChange}
                        // onKeyPress={handleKeyPress}
                        placeholder='Busqueda por nombre'
                    />
                </div>
                <div className='col-2'>
                    <button onClick={handleSearchClick} className='searchButton '>Search</button>
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="default">Ordenar por</option>
                        <option value="alphabetical">Alfabético</option>
                        <option value="votes">Número de Votos</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
