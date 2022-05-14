import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

export const App = () => {
  // ALBUMS STATES
  const [albums, setAlbums] = useState([]);
  const [nameAlbum, setNameAlbum] = useState("");
  const [yearAlbum, setYearAlbum] = useState("");

  // TRACKS STATES
  const [nameTrack, setNameTrack] = useState("");
  const [numberTrack, setNumberTrack] = useState("");
  const [durationTrack, setDurationTrack] = useState("");

  //HEADERS 
  const token = "rubioluisgustavo@gmail.com";
  const url = "https://tiao.supliu.com.br/api/album";
  const urlTrack = "https://tiao.supliu.com.br/api/track";

  const configs = {
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  };

  const searchAlbum = (value) => {
    axios
      .get(
        `${url}?keyword=${value}&limit=1000&page=1`,
        configs
      )
      .then((response) => {
        setAlbums(response.data.data);
      });
    console.log(value);
  };

  const createAlbum = () => {
    const data = { name: nameAlbum, year: yearAlbum };

    axios
      .post(url, data, configs)
      .then((response) => {
        getAlbums();
      })
      .catch((error) => {
        alert("Erro ao cadastrar!");
      });
  };

  const createTrack = (id) => {
    const data = {
      album_id: id,
      title: nameTrack,
      number: numberTrack,
      duration: durationTrack,
    };
    axios
      .post(urlTrack, data, configs)
      .then((response) => {
        getAlbums();
      })
      .catch((error) => {
        alert("Erro ao cadastrar!");
      });
  };

  const deleteTrack = (id) => {
    axios
      .delete(`${urlTrack}/${id}`, configs)
      .then((response) => {
        getAlbums();
      })
      .catch((error) => {
        alert("Erro ao excluir a faixa!");
      });
  };

  const deleteAlbum = (id) => {
    axios
      .delete(`${url}/${id}`, configs)
      .then((response) => {
        getAlbums();
      })
      .catch((error) => {
        alert("Erro ao excluir o álbum!");
      });
  };

  const getAlbums = () => {
    axios.get(url, configs).then((response) => {
      setAlbums(response.data.data);
    });
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div className="App">
      <main className="container">
        <h1 className="title">Tião Carreiro & Pardinho</h1>
        <div>
          <h2 className="title">Buscar Álbum</h2>
          <input
            type="text"
            placeholder="Nome do Álbum"
            onChange={(e) => searchAlbum(e.target.value)}
          />

          <div>
            <h2 className="title">Cadastrar Álbum</h2>
            <input
              onChange={(e) => setNameAlbum(e.target.value)}
              placeholder="Nome do Álbum"
            />
            <input
              onChange={(e) => setYearAlbum(e.target.value)}
              style={{ marginLeft: 20 }}
              placeholder="Ano (4 dígitos)"
            />
            <button
              type="button"
              className="create"
              onClick={() => {
                createAlbum();
              }}
            >
              Criar
            </button>
          </div>
        </div>

        <h2 className="title">Álbuns</h2>
        <div className="albums-grid">
          {albums.map((item) => {
            return (
              <div key={item.id} className="album-card">
                <div className="nome-album">
                  <div className="d-flex flex-column">
                    <p className="album-title">{item.name}</p>
                    <span className="album-year">{item.year}</span>
                  </div>
                  <button
                    type="button"
                    className="remove"
                    onClick={() => deleteAlbum(item.id)}
                  >
                    Excluir Álbum
                  </button>
                </div>

                <div>
                  <h2 className="title">Cadastrar Faixa</h2>
                  <input
                    onChange={(e) => setNameTrack(e.target.value)}
                    placeholder="Nome da faixa"
                  />
                  <input
                    onChange={(e) => setNumberTrack(e.target.value)}
                    placeholder="Número da faixa"
                  />
                  <input
                    onChange={(e) => setDurationTrack(e.target.value)}
                    placeholder="Duração da faixa"
                  />
                  <button
                    type="button"
                    className="create"
                    onClick={() => {
                      createTrack(item.id);
                    }}
                  >
                    Criar
                  </button>
                </div>

                <div>
                  <div className="header">
                    <p className="tracks">Faixas</p>
                    <p className="tracks">Duração</p>
                  </div>

                  <ul className="tracks-list">
                    {item.tracks.map((track) => {
                      return (
                        <>
                          <li className="track" key={track.number}>
                            <div>
                              <span className="number">{track.number}</span>
                              &nbsp;-&nbsp;
                              <span className="title">{track.title}</span>
                            </div>
                            <div><span className="duration">{track.duration}</span>
                              <button
                                type="button"
                                className="remove"
                                onClick={() => deleteTrack(track.id)}
                              >
                                Excluir Faixa
                              </button>
                            </div>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;
