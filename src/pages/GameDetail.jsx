import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/games/${id}`);
                setGame(response.data.data);
            } catch (error) {
                console.error("Error fetching game details:", error);
            }
        };

        fetchGameDetails();
    }, [id]);

    if (!game) return <p>Loading...</p>;
    console.log(game);

    return (
        <div className="game-detail">
            <h1>{game.name}</h1>
            <img src={game.image} alt={game.name} className='image' />
            <p>{game.description}</p>
            <span className='category'>Categoría: {game.category}</span>
            <span className='votes'>Total Votos: {game.votes}</span>
        </div>
    );
};

export default GameDetail;
