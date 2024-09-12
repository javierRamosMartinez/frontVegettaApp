import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';

export default function GamesPage() {

    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState(games);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const getGames = async () => {
            const { data } = await axios.get('http://localhost:3000/games');
            setGames(data.data);
            setFilteredGames(data.data);
        }
        getGames();

    }, [])


    const handleSearch = (query) => {
        const filtered = games.filter(game =>
            game.name.toLowerCase().includes(query.toLowerCase())
        );
        applySorting(filtered);
    };


    const handleSort = (option) => {

        setSortOption(option);
        applySorting(filteredGames); // Aplica el ordenamiento basado en la opción seleccionada
    };

    const applySorting = (gamesToSort) => {
        let sortedGames = [...gamesToSort];
        // console.log('Before sorting:', sortedGames);

        console.log('After sorting:', sortedGames, sortOption);
        if (sortOption === 'alphabetical') {
            sortedGames.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        } else if (sortOption === 'votes') {
            // sortedGames.sort((a, b) => b.votes - a.votes);
        }

        setFilteredGames(sortedGames);
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} onSort={handleSort} />
            <div>
                {filteredGames.length > 0 ? (
                    <GameCard games={filteredGames} />
                ) : (
                    <p>No se encontraron juegos</p>
                )}
            </div>


        </>
    )

}