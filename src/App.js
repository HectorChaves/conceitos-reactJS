import React, { useState, useEffect } from "react";

import api from "./services/api"

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get("/repositories").then(response => {
      setRepositories(response.data);
      console.log(response.data);
      console.log(repositories);
    })
  }
    ,[])

  async function handleAddRepository() {
    
    const response = await api.post("/repositories",{
    title: `titleTest ${Date.now()}`,
    url: "urlTest",
    techs: ["techTest1", "techTest2"],
    }
    );

    const repository = response.data;
    console.log(response.data);

    setRepositories([...repositories , repository])
    console.log(repositories);


  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository)=>{
      return repository.id !== id;
    }));

    // const repositoryIndex = repositories.findIndex((rep) => {
    //   return rep.id === id});

    // console.log(repositoryIndex);

    // const aux = repositories;
    // aux.splice(repositoryIndex, 1);

    // console.log(aux);

    // setRepositories([...aux]);

    console.log(repositories);

    console.log(response);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        })}

{/* 
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li> */}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
