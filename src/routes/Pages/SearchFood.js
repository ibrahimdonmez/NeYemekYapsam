import React from 'react'
import { Link } from 'react-router';
import * as Http from 'utils/http.helper'

class SearchFood extends React.Component {

    constructor() {
        super();

        this.state = {
            FoodMaterialList: [],
            materials: [],
            filterInput: '',
            hasError: false,
            errorMessage: ""
        }
    }

    onChangeFilterInput(e) {
        this.setState({
            filterInput: e.target.value,
        })
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

    render() {
        return (
            <div className="home-container">
                <div className="container">
                    <h2> elindeki tüm malzemeleri Gir </h2>
                </div>
                <div className="container">
                    <input maxLength="35" type="text" className="form-control" placeholder="Filtrele" style={{ width: "50%", marginLeft: "25%" }} value={this.state.filterInput} onChange={this.onChangeFilterInput.bind(this)} />
                    <ul className="ks-cboxtags" style={{ paddingLeft: "10%" }} >
                        {this.state.FoodMaterialList
                            .filter(FoodMaterials => FoodMaterials.foodMaterial.toUpperCase().includes(this.state.filterInput.toUpperCase()))
                            .map((FoodMaterials, index) => {
                                return (
                                    <li key={FoodMaterials._id}>
                                        <input type="checkbox" id={FoodMaterials._id} onChange={this.oncheckboxClick.bind(this, FoodMaterials.foodMaterial, FoodMaterials._id)} checked= {this.state.materials.includes(FoodMaterials.foodMaterial) ? true : null }></input>
                                        <label htmlFor={FoodMaterials._id}> {FoodMaterials.foodMaterial} </label>
                                    </li>
                                );
                            })}
                    </ul>
                    <div className="d-flex justify-content-center">
                        {/* <Link to={(window.location.pathname) == "/Admin/Yemekler" ? "/Admin/YemekListesi" : "/YemekListesi"} style={{ textDecoration: 'none' }}> */}
                        <Link to={{
                            pathname: (window.location.pathname) == "/Admin/YemekAra" ? "/Admin/YemekListesi" : "/YemekListesi",
                            state: {
                                materials: this.state.materials,
                            }
                        }}>
                            <button type="button" className="btn btn-primary" > SANA EN UYGUN YEMEĞİ BUL </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchFood;
