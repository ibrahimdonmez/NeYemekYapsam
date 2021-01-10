import React from 'react'
import { browserHistory } from 'react-router';
import * as Http from 'utils/http.helper'

class FoodMaterials extends React.Component {

  constructor() {
    super();

    this.state = {
      FoodMaterialList: [],
      hasError: false,
      errorMessage: ""
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

  onDeleteFoodMaterialClick(_id, message) {
    const FoodMaterial = {
      _id: _id,
      message: message
  }

    Http.post('FoodMaterial/deleteFoodMaterial', FoodMaterial).then(res => {
      if (res.durum) {
        window.location.reload(false);
      }

      if (!res.durum) {
        this.setState({
          hasError: !res.durum,
          errorMessage: res.message
        })
      }

    });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "-10%" }}>
        <h1>Yemek Malzemeleri</h1>
        <div className="table-responsive">
          <table className="table col-md-12" id="myTable" >
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Malzeme Adı</th>
                <th>Eklenme Tarihi</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody className="table-success">

              {this.state.FoodMaterialList.map((FoodMaterials, index) => {
                return (
                  <tr key={FoodMaterials._id}>
                    <td>{FoodMaterials._id}</td>
                    <td>{FoodMaterials.foodMaterial}</td>
                    <td>{FoodMaterials.dateCreated.substr(0, 10)}</td>
                    <td><img src={require("../../styles/images/delete.png")} width="30px" onClick={this.onDeleteFoodMaterialClick.bind(this, FoodMaterials._id, FoodMaterials.foodMaterial)} /> </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}


export default FoodMaterials;
