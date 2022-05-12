import './App.css';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

function App() {
  const [albums, setAlbums] = useState([]);

  const token = 'rubioluisgustavo@outlook.com';
  const url = 'https://tiao.supliu.com.br/api/album';

  const configs = {
    headers: {
      'Content-type': 'application/json',
      Authorization: token
    }
  };

  const deleteAlbum = ((id) => {
    // axios.delete(`${url}/${id}`, configs).then((response) => {
    //   alert(response.data);
    // })
    axios.post(url, configs, { name: "As melhores", year: "1949" }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  })

  useEffect(() => {
    axios.get(url, configs).then((response) => {
      setAlbums(response.data.data);
    })
  }, [])

  return (
    <>
      <div className="App">
        {albums.map((item) => {
          return (
            <div key={item.id}>
              <p>
                {item.name}
              </p>
              <span>
                {item.year}
              </span>
              <button type='button' onClick={() => deleteAlbum(item.id)}>Excluir</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
