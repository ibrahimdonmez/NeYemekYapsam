import React from 'react'
import { browserHistory } from 'react-router';
import * as Http from 'utils/http.helper'

class FeedBacks extends React.Component {

  constructor() {
    super();

    this.state = {
      feedBackList: [],
      hasError: false,
      errorMessage: ""
    }
  }

  componentDidMount() {
    // HTTP Call
    Http.post('feedBack/getFeedBacks', null).then(res => {
      if (res.durum) {
        res.data.forEach(element => {
          this.setState(res => {
            const feedBackList = res.feedBackList.push(element);
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

  onDeleteFeedBackClick(_id, message) {
    const feedBack = {
      _id: _id,
      message: message
  }

    Http.post('feedBack/deleteFeedBack', feedBack).then(res => {
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
        <h1>Geri Bildirimler</h1>
        <div className="table-responsive">
          <table className="table col-md-12" id="myTable" >
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>İsim</th>
                <th>Mail</th>
                <th>Mesaj</th>
                <th>Tarih</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody className="table-success">

              {this.state.feedBackList.map((feedBacks, index) => {
                return (
                  <tr key={feedBacks._id}>
                    <td>{feedBacks._id}</td>
                    <td>{feedBacks.name}</td>
                    <td>{feedBacks.mail}</td>
                    <td>{feedBacks.message}</td>
                    <td>{feedBacks.dateCreated.substr(0, 10)}</td>
                    <td><img src={require("../../styles/images/delete.png")} width="30px" onClick={this.onDeleteFeedBackClick.bind(this, feedBacks._id, feedBacks.message)} /> </td>
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


export default FeedBacks;
