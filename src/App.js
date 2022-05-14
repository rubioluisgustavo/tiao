import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import logo from '../src/logo.png'

export const App = () => {
  // ALBUMS STATES
  const [albums, setAlbums] = useState([]);
  const [nameAlbum, setNameAlbum] = useState("");
  const [yearAlbum, setYearAlbum] = useState("");
  const [nameTrack, setNameTrack] = useState("");
  const [numberTrack, setNumberTrack] = useState("");
  const [durationTrack, setDurationTrack] = useState("");
  const token = "rubioluisgustavo@gmail.com";
  const url = "https://tiao.supliu.com.br/api/album";
  const urlTrack = "https://tiao.supliu.com.br/api/track";
  const configs = { headers: { "Content-type": "application/json", Authorization: token, } };

  const searchAlbum = (value) => {
    axios
      .get(
        `${url}?keyword=${value}&limit=1000&page=1`,
        configs
      )
      .then((response) => {
        setAlbums(response.data.data);
      });
  };

  const createAlbum = () => {
    var time = new Date();
    var currentyear = time.getFullYear();

    const data = { name: nameAlbum, year: yearAlbum };

    if (data.name === "") {
      alert("Digite o nome do álbum!")
      return false;
    }

    if (data.year.length < 4) {
      alert("O ano deve ter 4 dígitos!");
      return false;
    }

    if (data.year > currentyear) {
      alert("O ano não pode ser maior que o ano atual!");
      return false;
    }

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
    if (data.title === "") {
      alert("Digite o nome da faixa!");
      return false;
    }
    if (data.number === "") {
      alert("Digite o número da faixa!");
      return false;
    }
    if (data.duration === "") {
      alert("Digite a duração da faixa!");
      return false;
    }
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
      <img src={logo} alt='Logo da aplicação' />
        discografia<h1 className="title">TIÃO CARREIRO E PARDINHO</h1>
        <div className="buscadastro">
          <h2 className="title align-text-left">Olá, usuário! Qual álbum você quer escutar hoje?</h2>
          <input type="text" placeholder="Nome do Álbum" onChange={(e) => searchAlbum(e.target.value)} />
          <div>
            <h2 className="title">Cadastrar Álbum</h2>
            <input onChange={(e) => setNameAlbum(e.target.value)} placeholder="Nome do Álbum" />
            <input onChange={(e) => setYearAlbum(e.target.value)} style={{ marginLeft: 20 }} placeholder="Ano (4 dígitos)" />
            <button type="button" className="create" onClick={() => { createAlbum(); }}>CRIAR</button>
          </div>
        </div>

        <h2 className="title">Álbuns Cadastrados</h2>
        <div className="albums-grid">
          {albums.map((item) => {
            return (
              <div key={item.id} className="album-card">
                <div className="nome-album">
                  <div className="d-flex flex-column">
                    <p className="album-title">{item.name}</p>
                    <span className="album-year">{item.year}</span>
                  </div>
                  <button type="button" className="remove" onClick={() => deleteAlbum(item.id)}>EXCLUIR</button>
                </div>

                <div>
                  <h2 className="title">Faixas</h2>
                  <input onChange={(e) => setNameTrack(e.target.value)} placeholder="Nome da faixa" />
                  <input onChange={(e) => setNumberTrack(e.target.value)} placeholder="Número da faixa" />
                  <input onChange={(e) => setDurationTrack(e.target.value)} placeholder="Duração da faixa (segundos)" />
                  <div className="criarfaixa">
                    <button type="button" className="create" onClick={() => { createTrack(item.id); }}>CRIAR</button>
                  </div>
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
                              <button type="button" className="remove" onClick={() => deleteTrack(track.id)}>EXCLUIR</button>
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