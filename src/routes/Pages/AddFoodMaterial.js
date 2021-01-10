import React from 'react'
import * as Http from 'utils/http.helper'

class AddFoodMaterial extends React.Component {

  constructor() {
    super();

    this.state = {
      foodMaterial: "",
      hasError: false,
      hasSuccess: false,
      errorMessage: "",
      SuccessMessage: "Yemek malzemesi başarıyla eklendi!"
    }
  }

  onInputChanged(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onAddFoodMaterial(e) {
    e.preventDefault();

    if (this.state.foodMaterial === "") {
      this.setState({
        hasError: true,
        errorMessage: "Lütfen tüm alanları doldurunuz!"
      });

      return;
    }

    Http.post('FoodMaterial/addFoodMaterial', this.state)
      .then(res => {

        if (!res.durum) {

          this.setState({
            hasSuccess: res.durum,
            hasError: !res.durum,
            errorMessage: res.error.code === 11000 ? "Bu yemek malzemesi zaten sistemde kayıtlı" : "Beklenmeyen bir hata oluştu!"
          })
        }

        if (res.durum) {
          this.setState({
            hasError: !res.durum,
            hasSuccess: res.durum,
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
      <div className="home-container" style={{ marginTop: "-10%" }}>
        <div className="container">
          <form onSubmit={this.onAddFoodMaterial.bind(this)}>
            <h1>Yemek Malzemesi Ekle</h1>
            <div className="form-group">
              <label>Malzeme Adı</label>
              <input className="form-control" placeholder="örn:domates" name="foodMaterial"  value={this.state.foodMaterial} onChange={this.onInputChanged.bind(this)}/>
            </div>
            {this.state.hasError ? <Error /> : null}
            {this.state.hasSuccess ? <Success /> : null}
            <button type="submit" className="btn btn-primary">Yemek Malzemesi Ekle</button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddFoodMaterial;
