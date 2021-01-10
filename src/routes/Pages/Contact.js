import React from 'react'
import * as Http from 'utils/http.helper'

class Contact extends React.Component {


  constructor() {
    super();

    this.state = {
      name: "",
      mail:"",
      message: "",
      hasError: false,
      hasSuccess: false,
      errorMessage: "",
      SuccessMessage: "Geribildirim başarıyla gönderildi!"
    }
  }

  onInputChanged(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSendFeedBack(e) {
    e.preventDefault();

    if (this.state.name === "" || this.state.mail === "" || this.state.message === "") {
      this.setState({
        hasError: true,
        errorMessage: "Lütfen tüm alanları doldurunuz!"
      });

      return;
    }

    Http.post('feedBack/addfeedBack', this.state)
      .then(res => {

        if (!res.durum) {

          this.setState({
            hasError: !res.durum,
            hasSuccess: res.durum,
            errorMessage: res.error.code === 11000 ? "" : "Beklenmeyen bir hata oluştu!"
          })
        }

        if (res.durum) {
          this.setState({
            hasSuccess: res.durum,
            hasError: !res.durum,
          })
        }

      });
  }

  renderError() {
    return <div className="alert alert-danger" style={{ width: "516px", "marginLeft": "auto", marginRight: "auto", "marginTop": "20px" }}>{this.state.errorMessage}</div>;
  }

  renderSuccess() {
    return <div className="alert alert-success" style={{ width: "516px", "marginLeft": "auto", marginRight: "auto", "marginTop": "20px" }}>{this.state.SuccessMessage}</div>;
  }


  render() {
    const Error = this.renderError.bind(this);
    const Success = this.renderSuccess.bind(this);
    return (
      <div className="home-container">
        <div className="container" style={{ marginTop: "-8%" }}>
          <form onSubmit={this.onSendFeedBack.bind(this)}>
            <h1>İletişim</h1>
            <div className="form-group">
              <label>İsim</label>
              <input className="form-control" placeholder="İsim" name="name"  value={this.state.name} onChange={this.onInputChanged.bind(this)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" placeholder="örn:abc@gmail.com" name="mail" value={this.state.mail} onChange={this.onInputChanged.bind(this)} />
            </div>
            <div className="form-group">
              <label>Mesaj</label>
              <textarea type="password" className="form-control" id="exampleInputPassword1" placeholder="Mesajınız" name="message" value={this.state.message} onChange={this.onInputChanged.bind(this)}></textarea>
            </div>
            {this.state.hasError ? <Error /> : null}
            {this.state.hasSuccess ? <Success /> : null}
            <button type="submit" className="btn btn-primary">Gönder</button>
          </form>
        </div>
      </div>
    )}
}

export default Contact;
