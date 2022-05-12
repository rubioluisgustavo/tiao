import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  const token = 'rubioluisgustav@outlook.com';
  const url = 'https://tiao.supliu.com.br/api/album';

  const configs = {
    headers: {
      'Content-type': 'application/json',
      Authorization: token
    }
  };

  const timeConvert = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const fill = ('00' + minutes).slice(2);
    const time = hours + ":" + fill;
    return time;
  };

  const createTrack = ((id) => {
    axios.post(url, configs, { album_id: 1, number: 123, title: "Track nova", duration: 130 }).then((response) => {
    }).catch((error) => {
      alert(error);
    })
  })

  const deleteTrack = ((id) => {
    axios.delete(`${url}/${id}`, configs).then((response) => {
      alert(response.data);
    })
  })

  const createAlbum = ((id) => {
    axios.post(url, configs, { name: "As melhores", year: "1949" }).then((response) => {
      alert(response);
    }).catch((error) => {
      alert(error);
    })
  })

  const deleteAlbum = ((id) => {
    axios.delete(`${url}/${id}`, configs).then((response) => {
      alert(response.data);
    })
  })

  useEffect(() => {
    axios.get(url, configs).then((response) => {
      setAlbums(response.data.data);
      setTracks(response.data.data[0].tracks);
    })
  }, [])

  return (
    <div className="App">

      <h1 className='title'>Tião Carreiro & Pardinho</h1>

      <main className="container">
        <h2 className="title">Álbuns</h2>
        <div className="albums-grid">
          {albums.map((item) => {
            return (
              <div key={item.id} className="album-card">
                <p className="album-title">{item.name}</p>
                <span className="album-year">{item.year}</span>
              </div>
            );
          })}
        </div>

        <h2 className="title">Faixas</h2>
        <div className="tracks">
          {tracks.map((track) => {
            return (<div key={track.id} className="track-wrapper">
              <div className="track-details">
                <span className="track-number">{track.number}</span>
                <div className="track">
                  <p className="name">{track.title}</p>
                </div>
              </div>
              <div className="track-play">
                <span className="track-time">{timeConvert(track.duration)}</span>
              </div>
            </div>);
          })}
        </div>
        <button onClick={createTrack()} className='btn btn-success'>Cadastrar Faixa</button>
      </main>
    </div>
  );
}

export default App;
