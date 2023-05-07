import { useState } from "react";
import "./CreateSpot.css"
export default function CreateSpot() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [currency, setCurrency] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [exactAddress, setExactAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [maxGuests, setMaxGuests] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [beds, setBeds] = useState(0);
    const [baths, setBaths] = useState(0);
    const [address, setAddress] = useState('');
    const [spotName, setSpotName] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const formData = {
            title,
            description,
            category,
            price,
            previewImage,
            images: [image1, image2, image3, image4, image5],
            address: {
                exactAddress,
                city,
                state,
                country,
                latitude,
                longitude
            }
        };

        console.log(formData); // This will log the form data object to the console

        // Reset the form values to their initial state
        // setTitle("");
        // setDescription("");
        // setCategory("");
        // setPrice("");
        // setPreviewImage("");
        // setImage1("");
        // setImage2("");
        // setImage3("");
        // setImage4("");
        // setImage5("");
        // setExactAddress("");
        // setCity("");
        // setState("");
        // setCountry("");
        // setLatitude("");
        // setLongitude("");
    }


    return (
        <form onSubmit={handleSubmit} className='create-spot'>
            <h2>Create a new Spot</h2>

            <h3>Create Spot</h3>

            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Street Address"
                    required
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </div>

            <div className="form-row">
                <div className="city-state">

                    <div className="form-group city-create">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        ></input>
                    </div>
                    <div className="form-group">
                        <p id="create-spot-comma">,</p>
                    </div>

                    <div className="form-group state-create">
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            required
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                        />
                    </div>
                </div>
            </div>


            <div className="form-group">
                <label htmlFor="spot-name">Name of your spot</label>
                <input
                    type="text"
                    id="spot-name"
                    name="spot-name"
                    required
                    value={spotName}
                    onChange={(event) => setSpotName(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price per night (USD)</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Please write at least 30 characters</label>
                <textarea
                    id="description"
                    name="description"
                    minLength="30"
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="preview-image">Preview Image URL</label>
                <input
                    type="url"
                    id="preview-image"
                    name="preview-image"
                    required
                    value={previewImage}
                    onChange={(event) => setPreviewImage(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="image1">Image URL</label>
                <input
                    type="url"
                    id="image1"
                    name="image1"
                    required
                    value={image1}
                    onChange={(event) => setImage1(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="image2">Image URL</label>
                <input
                    type="url"
                    id="image2"
                    name="image2"
                    value={image2}
                    onChange={(event) => setImage2(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="image3">Image URL</label>
                <input
                    type="url"
                    id="image3"
                    name="image3"
                    value={image3}
                    onChange={(event) => setImage3(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="image4">Image URL</label>
                <input
                    type="url"
                    id="image4"
                    name="image4"
                    value={image4}
                    onChange={(event) => setImage4(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="image5">Image URL</label>
                <input
                    type="url"
                    id="image5"
                    name="image5"
                    value={image5}
                    onChange={(event) => setImage5(event.target.value)}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="exact-address">Street Address</label>
                    <input
                        type="text"
                        id="exact-address"
                        name="exact-address"
                        required
                        value={exactAddress}
                        onChange={(event) => setExactAddress(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        id="latitude"
                        name="latitude"
                        step="0.000001"
                        required
                        value={latitude}
                        onChange={(event) => setLatitude(parseFloat(event.target.value))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        id="longitude"
                        name="longitude"
                        step="0.000001"
                        required
                        value={longitude}
                        onChange={(event) => setLongitude(parseFloat(event.target.value))}
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price per night</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    value={price}
                    onChange={(event) => setPrice(parseFloat(event.target.value))}
                />
            </div>
            <div className="form-group">
                <label htmlFor="max-guests">Max Guests</label>
                <input
                    type="number"
                    id="max-guests"
                    name="max-guests"
                    required
                    value={maxGuests}
                    onChange={(event) => setMaxGuests(parseInt(event.target.value))}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bedrooms">Number of Bedrooms</label>
                <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    required
                    value={bedrooms}
                    onChange={(event) => setBedrooms(parseInt(event.target.value))}
                />
            </div>
            <div className="form-group">
                <label htmlFor="beds">Number of Beds</label>
                <input
                    type="number"
                    id="beds"
                    name="beds"
                    required
                    value={beds}
                    onChange={(event) => setBeds(parseInt(event.target.value))}
                />
            </div>
            <div className="form-group">
                <label htmlFor="baths">Number of Baths</label>
                <input
                    type="number"
                    id="baths"
                    name="baths"
                    required
                    value={baths}
                    onChange={(event) => setBaths(parseInt(event.target.value))}
                />
            </div>
            <button type="submit">Submit</button>

        </form>)
}
