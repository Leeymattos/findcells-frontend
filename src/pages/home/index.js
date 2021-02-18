import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'



export default function Home() {
  return (
    <div className="home-container">
      
      <div className="ilustration">
      </div>
     



      <div className="content">

        <h1 className='home-title'>Bem vindo!</h1>

        <div className="description-container">
          <p className='home-description'>Aqui você pode cadastrar sua célula em nosso sistema de busca.</p>
        </div>


        <Link to='register' className='home-link'>Cadastrar</Link>
      </div>



    </div>



  )
}