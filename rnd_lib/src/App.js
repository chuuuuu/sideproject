import React from 'react';
import './App.css';
// import {Link} from "react-router-dom";

class App extends React.Component {
  render(){
    return(
      <div className="user-bar">
        <div className="user-btn">
          <div className="user-btn-btn" to="/home">Random Restaurant</div>
        </div>

        <div className="user-btn">
          <div className="user-btn-btn" to={"/profile/id/"+this.props.userId}>{this.props.userName}</div>
          <div className="user-btn-btn" to="/logout">Logout</div>
        </div>
      </div>
    );
  }
}

export default App;
