import React from 'react';
import { Link45deg, Layers, House, GeoAlt, Clock, Tags } from 'react-bootstrap-icons';
const axios = require('axios');

class Gen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      addr: null,
      bh: null,
      tags: [],
      gmap_href: '#',
      is_load: false,
      is_open: false,
    }

  }

  componentDidMount() {
    this.get_rnd_rest.bind = this.get_rnd_rest.bind(this);
    this.get_bh = this.get_bh.bind(this);
  }

  get_bh(){
    if(this.state.bh == null){
      return (
        <div className="p-1 ">
          <Clock className="mx-2 text-primary" />
          <span>無資料</span>
        </div>
      )
    }
    if(this.state.is_open){
      return(
      <div className="p-1 ">
        <Clock className="mx-2 text-primary" />
        <span className='text-success'>營業中</span>
        <span>: {this.state.bh}</span>
      </div>
      )
    }

    return(
      <div className="p-1 ">
        <Clock className="mx-2 text-primary" />
        <span className='text-danger'>休息中。</span>
        <span>營業時間: {this.state.bh}</span>
      </div>
    )
  }

  get_is_open(bh){
    // bh: " 11:00-15:00, 17:00-21:30"
    // bh: "休息"
    // bh: "24小時營業"
    // bh: null
    if(bh == null || bh == "休息"){
      return false;
    }

    if(bh.match('24小時營業')){
      return true;
    }
    
    let date = new Date();
    let [h, m] = [date.getHours(), date.getMinutes()];
    let time = h*60+m;

    let time_intervals = bh.match(/[0-9]+:[0-9]+-[0-9]+:[0-9]+/g);
    if(time_intervals == null){
      return false;
    }

    for(let i=0; i<time_intervals.length; i++){
      let [h0, m0, h1, m1] = time_intervals[i].match(/[0-9]+/g).map(s => {return parseInt(s);});
      let [time0, time1] = [h0*60+m0, h1*60+m1];

      if(time0 < time && time < time1){
        return true;
      }
    }

    return false;
  }

// addr: "臺北市大安區新生南路三段20之3號"
// bh: " 11:00-15:00, 17:00-21:30"
// ctgs: (2) ["晚餐", "午餐"]
// d: "2021-04-28T08:08:23.719Z"
// href: "href: "http://maps.google.com/?q=埃及口味沙威瑪 台北市大安區羅斯福路三段325號""
// idx: "308"
// title: "翠園越南餐廳"
  async get_rnd_rest() {
    this.setState({
      is_load: true,
    });

    const res = await axios.get('/.netlify/functions/get_rnd_rest');
    // const res = await axios.get('http://localhost:9000/.netlify/functions/get_rnd_rest');
    const rest = res.data.rest
    console.log(rest)

    let is_open = this.get_is_open(rest.bh);

    this.setState({
      is_load: false,
      title: rest.title,
      addr: rest.addr,
      bh: rest.bh,
      tags: rest.ctgs,
      gmap_href: rest.href,
      is_open: is_open,
    });
  }

  get_btn(){
    if(this.state.is_load){
      return(
        <button className="btn btn-primary btn-lg col-4" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
      )
    }
    return <button onClick={()=>{this.get_rnd_rest()}} type="button" className="btn btn-primary btn-lg col-4">Get</button>
  }

  get_card(){
    if(this.state.title == null){
      return;
    }

    return (
      <div className="card">
        <div className="card-header">
          <Layers className="mx-2 text-primary" />
          <span>Info</span>
        </div>
        <div className="card-body">
          <div className="p-1">
            <House className="mx-2 text-primary" />
            <span>{this.state.title}</span>
          </div>
          <div className="p-1">
            <GeoAlt className="mx-2 text-primary" />
            <span>{this.state.addr}</span>
          </div>
          {this.get_bh()}
          <div className="p-1">
            <Tags className="mx-2 text-primary" />
            {this.state.tags.map((tag, i) => {
              return <span key={i} className="badge rounded-pill bg-secondary mx-1">{tag}</span>
            })}
          </div>
          <div className="p-1">
            <Link45deg className="mx-2 text-primary" />
            <span className="text-decoration-underline" role="button" onClick={(e) => {
                e.preventDefault();
                window.open(this.state.gmap_href);
              }}
              href={this.state.gmap_href}>Google Map</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container text-left">
        <div className="row p-4">
          <h5 className="col-sm">
            This website help people choose restaurant around NTU randomly.
          </h5>
          <div className="row p-4 d-grid mx-auto">
            <div className="col-sm">
              {this.get_card()}
            </div>
          </div>
          <div className="row p-4 text-center d-grid mx-auto">
            <div className="col-sm">
              {this.get_btn()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gen;
