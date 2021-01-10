import React from 'react'
import AuthView from './AuthView'
export const HomeView = () => (
  <div className="home-container">
    <div className="container">
      <h1>Giriş Yap <br /> </h1>
      <h3> Buzdolabındaki Malzemelerle Yapacağın Yemeği Bul </h3>
      <AuthView/>

    </div>
  </div>
)

export default HomeView;
