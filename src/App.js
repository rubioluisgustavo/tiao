import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [albums, setAlbums] = useState([]);
  // const albumdata = { name: "Luis Rubio album 2 AXIOS", year: "1996" };
  const token = 'rubioluisgustavo@gmail.com';
  const url = 'https://tiao.supliu.com.br/api/album';

  const configs = {
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    }
  };

  const searchAlbum = ((value) => {
      const urlbuscaralbum = `https://tiao.supliu.com.br/api/album?keyword=${value}&limit=1000&page=1`;
      axios.get(urlbuscaralbum, configs).then((response) => {
        setAlbums(response.data.data);
      })
  })

  // const createAlbum = (() => {
  //   axios.post(url, albumdata, configs).then((response) => {
  //     alert("Álbum cadastrado com sucesso!")
  //   }).catch((error) => {
  //     alert("Erro ao cadastrar!");
  //   })
  // })

  const deleteAlbum = ((id) => {
    axios.delete(`${url}/${id}`, configs).then((response) => {
      alert("Álbum excluído com sucesso!");
    }).catch((error) => {
      alert("Erro ao excluir o álbum!")
    })
  })

  useEffect(() => {
    searchAlbum();
  }, [])

  return (
    <div className="App">
      <h1 className='title'>Tião Carreiro & Pardinho</h1>
      <main className="container">
        <div>
          <h2 className="title">Buscar Álbum</h2>
          <input type="text" placeholder="Nome do Álbum" onChange={(e) => searchAlbum(e.target.value)} />
        </div>
        <h2 className="title">Álbuns</h2>
        <div className="albums-grid">
          {albums.map((item) => {
            return (
              <div key={item.id} className="album-card">
                <p className="album-title">{item.name}</p>
                <span className="album-year">{item.year}</span>
                <button type="button" className="btn btn-success" onClick={() => deleteAlbum(item.id)}>Excluir Álbum</button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
