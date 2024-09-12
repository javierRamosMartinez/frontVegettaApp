import React from "react";
import { Link } from "react-router-dom";
import "./GameCard.css";

export default function GameCard({ games }) {
    console.log(games)
    return (
        <div className="container text-center">
            <div className="row">
                {games.map((game, i) =>
                    <div key={i} className="col-6">
                        <div className="card">
                            <Link to={"/games/" + game._id}>
                                <h2>{game.name}</h2>
                                <img src={game.image} alt={game.name} className='image' />
                                <div className='content'>
                                    <p className='description'>{game.description}</p>
                                    <span className='category'>Categoría: {game.category}</span>
                                    <br />
                                    <span className="votos">Total Votos: {game.votes}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}