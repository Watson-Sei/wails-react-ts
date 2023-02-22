import {useEffect, useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { GetBreedList, GetRandomImageUrl, GetImageUrlsByBreed } from '../wailsjs/go/main/App.js';

function App() {
    const [randomImageUrl, setRandomImageUrl] = useState<string>("");
    const [breeds, setBreeds] = useState<string[]>([]);
    const [photos, setPhotos] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const [showRandomPhoto, setShowRandomPhoto] = useState(false);
    const [showBreedPhotos, setShowBreedPhotos] = useState(false);

    useEffect(() => {
        getBreedList();
    }, []);

    const getRandomImageUrl = () => {
        setShowRandomPhoto(false);
        setShowBreedPhotos(false);
        GetRandomImageUrl().then((result) => setRandomImageUrl(result));
        setShowRandomPhoto(true);
    };

    const getBreedList = () => {
        GetBreedList().then((result) => setBreeds(result));
    };

    const getImageUrlsByBreed = () => {
        setShowRandomPhoto(false);
        setShowBreedPhotos(false);
        GetImageUrlsByBreed(selectedBreed).then((result) => setPhotos(result));
        setShowBreedPhotos(true);
    };

    return (
        <div>
        <h3>Dogs API</h3>
        <div>
            <button className="btn" onClick={getRandomImageUrl}>
            Fetch a dog randomly
            </button>
            Click on down arrow to select a breed
            <select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
            {breeds.map((breed) => (
                <option key={breed} value={breed}>
                {breed}
                </option>
            ))}
            </select>
            <button className="btn" onClick={getImageUrlsByBreed}>
            Fetch by this breed
            </button>
        </div>
        <br />
        {showRandomPhoto && (
            <img id="random-photo" src={randomImageUrl} alt="No dog found" />
        )}
        {showBreedPhotos &&
            photos.map((photo) => (
            <img key={photo} id="breed-photos" src={photo} alt="No dog found" />
            ))}
        </div>
        );
}

export default App
