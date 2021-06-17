// maybe it'll be more intuitive if I draw after finishing the algorithm (I can store every state when running the algorithm).
class Mazz{
  constructor(m, n, w, h){
    this.m = m;
    this.n = n;
    this.w = w;
    this.h = h;

    this.seen = [];
    for(let i=0; i<m; i++){
      this.seen.push([])
      for(let j=0; j<n; j++){
        this.seen[i].push(false);
      }
    }

    this.edges = [];
    for(let i=0; i<m; i++){
      this.edges.push([])
      for(let j=0; j<n; j++){
        this.edges[i].push([])
        for(let k=0; k<4; k++){
          this.edges[i][j].push(false);
        }
      }
    }
  }

  draw(){
    push();
    let scl_x = this.w / this.m;
    let scl_y = this.h / this.n;
    let scl = min(scl_x, scl_y);
    translate(-scl*this.m/2, -scl*this.n/2);
    for(let i=0; i<this.m; i++){
      for(let j=0; j<this.n; j++){
        stroke(255);
        fill(255);
        if(this.seen[i][j]){
          stroke('#00ff00');
          fill('#00ff00');
        }
        if(this.crnt_pos[0] == i && this.crnt_pos[1] == j){
          stroke('#0000ff');
          fill('#0000ff');
        }
        rectMode(CENTER)
        rect(i*scl, j*scl, scl, scl);
      }
    }

    // if not an edge, draw a line between them
    stroke('#000000');
    for(let i=0; i<this.m; i++){
      for(let j=0; j<this.n; j++){
        for(let k=0; k<4; k++){
          if(!this.edges[i][j][k]){
            let [di, dj] = this.dec_k(k);
            if(di == 0){
              line((i-0.5)*scl, (j+dj/2)*scl, (i+0.5)*scl, (j+dj/2)*scl);
            }
            if(dj == 0){
              line((i+di/2)*scl, (j-0.5)*scl, (i+di/2)*scl, (j+0.5)*scl);
            }
          }
        }
      }
    }

    pop();
  }

  async build_road(pos, res){
    this.crnt_pos = pos;
    this.draw()
    let [x, y] = pos;
    this.seen[x][y] = true;

    let ds = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    ds = this.shuffle(ds);
    for(let i=0; i<4; i++){
      let [dx, dy] = ds[i];
      if(x+dx < 0 || x+dx==this.m || y+dy < 0 || y+dy == this.n){
        continue;
      }

      if(this.seen[x+dx][y+dy]){
        continue;
      }
      this.edges[x][y][this.enc_dir([dx, dy])] = true;
      this.edges[x+dx][y+dy][this.enc_dir([-dx, -dy])] = true;
      await new Promise((res)=>{
        setTimeout(()=>{
          this.build_road([x+dx, y+dy], res);
        }, 50);
      })
    }

    res();
  }

  shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  enc_dir(dir){
    let [dx, dy] = dir;
    if(dx == -1){
      return 0;
    }
    if(dx == 1){
      return 1;
    }
    if(dy == -1){
      return 2;
    }
    if(dy == 1){
      return 3;
    }
  }

  dec_k(k){
    if(k==0){
      return [-1, 0]
    }
    if(k==1){
      return [1, 0]
    }
    if(k==2){
      return [0, -1]
    }
    if(k==3){
      return [0, 1]
    }
  }
}