import { useState, useEffect } from 'react';

const Library = () => {
    const [favorites, setFavorites] = useState([]);

    // Remplacez par l'ID de l'utilisateur actuel
    const userId = 'USER_ID';

    useEffect(() => {
        fetch(`/api/library/${userId}`)
            .then(response => response.json())
            .then(data => setFavorites(data))
            .catch(error => console.error(error));
    }, []);

    const deleteFavorite = (manwhaId) => {
        fetch(`/api/library/${userId}/${manwhaId}`, { method: 'DELETE' })
            .then(() => setFavorites(favorites.filter(id => id !== manwhaId)))
            .catch(error => console.error(error));
    };

    return (
        <div className="flex flex-col w-full   rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <h1 className="text-2xl font-semibold  text-white mb-1">Library</h1>
            <p className='text-white'>You can save a list of manga titles here.</p>
            <ul>
                {favorites.map(manhwa => (
                    <li key={manhwa.id} className="mb-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <img src={manhwa.thumbnail} alt={manhwa.name} />
                                <span>{manhwa.name}</span>
                                <p>Chapter {manhwa.latestChapter}</p>
                            </div>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => deleteFavorite(manhwa.id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Library;
