import React from 'react'

export const AboutUs = () => (
  <div className="home-container">
    <div className="aboutus-section">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="aboutus">
              <h2>
                Hakkımızda
              </h2>
              <p className="aboutus-text">
                Siteyi her geçen gün dahada güncelleyerek daha fazla yemek tarifine ulaşmanızı ve hoşlandığınız yemekleri karşınıza çıkarmaya çalışıyoruz.
              </p>
              <p className="aboutus-text">
                Elinizdeki malzemelerle ne harikalar yaratabileceğinizi gösteriyoruz.
              </p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="aboutus-banner">
              <img src={require("../../styles/images/chef.png")} width="350px" alt=""></img>
            </div>
          </div>
          <div className="col-md-5 col-sm-6 col-xs-12">
            <div className="feature">
              <div className="feature-box">
                <div className="clearfix">
                  <div className="iconset">
                    <img src={require("../../styles/images/fridge.png")} width="60px"></img>
                  </div>
                  <div className="feature-content">
                    <h4>
                      Elindeki yemek malzemelerini gir
                    </h4>
                    <p>
                      Şuanda bulunduğun yerde hangi yemek malzemeleri varsa hepsini sisteme gir. 
                    </p>
                  </div>
                </div>
              </div>
              <div className="feature-box">
                <div className="clearfix">
                  <div className="iconset">
                    <img src={require("../../styles/images/search.png")} width="50px"></img>
                  </div>
                  <div className="feature-content">
                    <h4>
                      Yapılabilecek yemekler
                    </h4>
                    <p>
                      Elindeki malzemelerle yapabileceğin yemekler arasından sana en uygun yemeği seç
                   </p>
                  </div>
                </div>
              </div>
              <div className="feature-box">
                <div className="clearfix">
                  <div className="iconset">
                    <img src={require("../../styles/images/food.png")} width="50px"></img>
                  </div>
                  <div className="feature-content">
                    <h4>
                      Yemek Detayı
                    </h4>
                    <p>
                      Yemek tarifini ve malzemelerini detaylı incele ve yemeğini yapmaya başla :)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AboutUs;
