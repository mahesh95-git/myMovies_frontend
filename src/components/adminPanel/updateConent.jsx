import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../header/header';
function UpdateConent() {
const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
    languages: [],
    duration: "",
    type: "",
    director: "",
    cast: [],
    genres: [],
    section: "",
  });

  const [inputFiles, setInputFile] = useState({
    poster: "",
    trailer: "",
    banner: "",
    fullMovie: "",
  });



  const [cast, setCast] = useState();
  const genres = ["Action", "Horror", "commedy", "Drama"];
  const languages = ["marathi", "hindi", "English", "Tamil"];

  const handleCheckBox = (e, field) => {
    const { checked, value } = e.target;

    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: [...prevFormData[field], value],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: prevFormData[field].filter((item) => item !== value),
      }));
    }
  };

  const handleCast = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      cast: [...prevFormData.cast, cast],
    }));
    setCast("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const newData = new FormData();
  const handleFiles = (e) => {
    let file = e.target.files[0];
    let name = e.target.name;
    setInputFile({ ...inputFiles, [name]: file });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in inputFiles) {
      newData.append(key, inputFiles[key]);
    }
    newData.append("contentInfo", JSON.stringify(formData));
   
    // dispatch(addContent(newData));
    
    newData.remove()
  };

  return (
<>

        <form className="form-container" >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <label htmlFor="title">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        id="description"
      ></textarea>

      <label htmlFor="year">Year</label>
      <input
        type="number"
        id="year"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
      />
      <label htmlFor="type">Type</label>
      <input
        type="text"
        name="type"
        id="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type"
      />

      <label htmlFor="section"> Movie Listing Section</label>
      <input
        type="text"
        name="section"
        id="section"
        value={formData.section}
        onChange={handleChange}
        placeholder="Section"
      />
      <label htmlFor="Direactor">Direactor Name</label>
      <input
        type="text"
        name="director"
        id="Direactor"
        value={formData.director}
        onChange={handleChange}
        placeholder="Direactor Name"
      />

      <div className="castName-container">
        {formData.cast.length > 0 ? (
          <div className="cast-container">
            {formData.cast.map((e, index) => {
              return <span key={index}>{e}</span>;
            })}
          </div>
        ) : (
          ""
        )}

        <label htmlFor="castName">Cast Name</label>
        <input
          type="text"
          name="castName"
          placeholder="Cast Name"
          id="castName"
          value={cast}
          onChange={(e) => {
            setCast(e.target.value);
          }}
        />
        <span onClick={handleCast} className="addCast">
          ADD
        </span>
      </div>
      <div className="genres">
        <span>Genres:</span>
        {genres.map((value, index) => {
          return (
            <div key={index} id="genre">
              <input
                type="checkbox"
                id={value}
                value={value}
                onChange={(e) => handleCheckBox(e, "genres")}
              />
              <label htmlFor={value}>{value}</label>
              <br />
            </div>
          );
        })}
      </div>

      <div className="languages">
        <span>languages:</span>
        {languages.map((value, index) => {
          return (
            <div key={index} id="language">
              <input
                type="checkbox"
                id={value}
                value={value}
                onChange={(e) => handleCheckBox(e, "languages")}
              />
              <label htmlFor={value}>{value}</label>
            </div>
          );
        })}
      </div>

      <label htmlFor="banner">Banner:Image</label>
      <input
        type="file"
        name="banner"
        id="banner"
        onChange={handleFiles}
        placeholder="Banner"
      />
      <label htmlFor="poster">Poster:Image</label>

      <input
        type="file"
        id="poster"
        name="poster"
        onChange={handleFiles}
        placeholder="Poster"
      />

      <label htmlFor="trailer">Trailer:Video</label>
      <input
        type="file"
        name="trailer"
        id="trailer"
        onChange={handleFiles}
        placeholder="Trailer"
      />
      <label htmlFor="fullMovie">FullMovie:Video</label>
      <input
        type="file"
        name="fullMovie"
        id="fullMovie"
        onChange={handleFiles}
        placeholder="fullMovie"
      />
      <br />
      <button className="addContent" onClick={handleSubmit}>
        ADD CONTENT
      </button>
    </form>
    </>
  )
}

export default UpdateConent
