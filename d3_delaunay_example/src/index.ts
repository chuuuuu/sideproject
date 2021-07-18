import Sampler from "poisson-disk-sampling"; 
import { Delaunay } from "d3-delaunay";

const boundary = [50, 20];

const sampler = new Sampler({
  shape: boundary,
  minDistance: 10,
  maxDistance: 20,
  tries: 30,
});

const pd_points = sampler.fill();
console.log("pd_points", pd_points.length);
console.log("pd_points", pd_points);

const delaunay = Delaunay.from(pd_points);
const {points, halfedges, triangles} = delaunay;
console.log("points", points.length);
console.log("points", points);
console.log("halfedges", halfedges.length);
console.log("halfedges", halfedges);
console.log("triangles", triangles.length);
console.log("triangles", triangles);

const voronoi = delaunay.voronoi([0, 0, boundary[0], boundary[1]]);
const {circumcenters, vectors} = voronoi;
console.log("circumcenters", circumcenters.length);
console.log("circumcenters", circumcenters);
console.log("vectors", vectors.length);
console.log("vectors", vectors);
