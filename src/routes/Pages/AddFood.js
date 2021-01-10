import React from 'react'
import { browserHistory } from 'react-router';
import * as Http from 'utils/http.helper'

class AddFood extends React.Component {

  constructor() {
    super();

    this.state = {
      foodName: "",
      category: "",
      calories: "",
      time: "",
      image: "",
      portion: "",
      recipe: "",
      materials: [],
      FoodMaterialList: [],
      hasError: false,
      hasSuccess: false,
      errorMessage: "",
      SuccessMessage: "Yemek başarıyla eklendi!"
    }
  }

  componentDidMount() {
    // HTTP Call
    Http.post('FoodMaterial/getFoodMaterial', null).then(res => {
      if (res.durum) {
        res.data.forEach(element => {
          this.setState(res => {
            const FoodMaterialList = res.FoodMaterialList.push(element);
          })
        });
      }

      if (!res.durum) {
        this.setState({
          hasError: !res.durum,
          errorMessage: res.message
        })
      }

    });
  }

  onInputChanged(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  oncheckboxClick(foodmaterial, _id) {
    var checkBox = document.getElementById(_id);
    if (checkBox.checked == true) {
      const materials = this.state.materials.push(foodmaterial);
    } else {
      var array = [...this.state.materials]; // make a separate copy of the array
      var index = array.indexOf(foodmaterial)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({
          materials: array
        }, () => {
        });
      }
    }

  }

  onAddFood(e) {
    e.preventDefault();

    if (this.state.foodName === "" || this.state.category === "" || this.state.calories === "" || this.state.time === "" || this.state.image === "" || this.state.portion === "" || this.state.recipe === "" || this.state.materials === "") {
      this.setState({
        hasError: true,
        errorMessage: "Lütfen tüm alanları doldurunuz!"
      });

      return;
    }

    Http.post('Foods/addFood', this.state)
      .then(res => {

        if (!res.durum) {

          this.setState({
            hasError: !res.durum,
            hasSuccess: res.durum,
            errorMessage: res.error.code === 11000 ? "Bu yemek zaten sistemde kayıtlı" : "Beklenmeyen bir hata oluştu!"
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
      <div className="add-food-container" style={{ marginTop: "-10%" }}>
        <div className="container">
          <form onSubmit={this.onAddFood.bind(this)}>
            <h1>Yemek Ekle</h1>

            <div className="row">
              <div className="form-group col-md-6">
                <label>Yemek Adı</label>
                <input className="form-control" name="foodName" placeholder="örn: Makarna" value={this.state.foodName} onChange={this.onInputChanged.bind(this)} />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="FoodCategory">Yemek Kategorisi</label>
                <select className="form-control" name="category" id="FoodCategory" value={this.state.category} onChange={this.onInputChanged.bind(this)}>
                  <option value=""></option>
                  <option value="Kahvaltı">Kahvaltı</option>
                  <option value="Akşam Yemeği">Akşam Yemeği</option>
                  <option value="Ara Öğün">Ara Öğün</option>
                  <option value="Tatlı">Tatlı</option>
                  <option value="İçecek">İçecek</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label>Kalori</label>
                <input className="form-control" name="calories" placeholder="örn: 50 Kalori" value={this.state.calories} onChange={this.onInputChanged.bind(this)} />
              </div>

              <div className="form-group col-md-6">
                <label>Hazırlama Süresi</label>
                <input className="form-control" name="time" placeholder="örn: 30 Dakika" value={this.state.time} onChange={this.onInputChanged.bind(this)} />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label>Resim</label>
                <input className="form-control" name="image" placeholder="Url bırakınız..." value={this.state.image} onChange={this.onInputChanged.bind(this)} />
              </div>

              <div className="form-group col-md-6">
                <label>Porsiyon</label>
                <input className="form-control" name="portion" placeholder="örn:4 Kişilik" value={this.state.portion} onChange={this.onInputChanged.bind(this)} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="FoodRecipe">Tarif</label>
              <textarea className="form-control" id="FoodRecipe" name="recipe" rows="3" value={this.state.recipe} onChange={this.onInputChanged.bind(this)}></textarea>
            </div>

            <div className="form-group">
              <label>Yemek Malzemeleri</label>
              <ul className="ks-cboxtags" style={{ paddingLeft: "10%" }} >
                {this.state.FoodMaterialList.map((FoodMaterials, index) => {
                  return (
                    <li key={FoodMaterials._id}>
                      <input type="checkbox" id={FoodMaterials._id} value="Rainbow Dash" onClick={this.oncheckboxClick.bind(this, FoodMaterials.foodMaterial, FoodMaterials._id)}></input>
                      <label htmlFor={FoodMaterials._id}> {FoodMaterials.foodMaterial} </label>
                    </li>
                  );
                })}
              </ul> 
            </div>
            {this.state.hasError ? <Error /> : null}
            {this.state.hasSuccess ? <Success /> : null}
            <button type="submit" className="btn btn-primary" style={{ marginBottom: "15%" }}>Yemek Ekle</button>
          </form>

        </div>
      </div>
    )
  }
}

export default AddFood;