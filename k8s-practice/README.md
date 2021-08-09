# k8s

This is the notes taken from [course](https://www.youtube.com/watch?v=X48VuDVv0do&ab_channel=TechWorldwithNana)

## Good Articles

https://www.redhat.com/en/topics/containers/kubernetes-architecture

## k8s components

### `Pod`

- the smallest unit of k8s
- abstraction of container
- you may run many container in one `Pod`, but we usually run one container in one `Pod`
- every `Pod` have a unique ip address
  - the ip address is reachable from all other `Pods` in the k8s cluster
- when `Pod` crash, k8s will create a new `Pod`, however the ip address will be changed

### `Service`

problem: after `Pod` crash, the ip address will be re-created

- permanent ip address
- after `Pod` re-create, the `Service` will be the same
- is also a load balancer
  - see deployment

### `Ingress`

problem: app should be accessible through browser

- have a domain name
- use secure protocal
- request which goes to the ingress will be forwarding to the `Service`

### `Config Map`

problem: you need different configuration for production mode and development mode

- you can set configuration of your app
  - for example: DB_URL

### `Secret`

problem: you want to store secret configuration

- you can store secret
  - for example: username and password for your database

### `Volumes`

problem: after `Pod` get restarted, the data stored will be gone

- persist data in long-term
- it will attach a physical hard drive to your `Pod`
- the physical hard drive can be on local machine (inside k8s) or remote (outside k8s)
- k8s doesn't manage data persistance
  - which means you take the resposiblity to manage data

### `Deployment`

problem: one `Pod` is not enough, you may want replica of `Pod`

- is blueprint for `Pods`
- you can specify how many replica do you want
- all of the replica share the same `Service`
- after the `Service` receive the request, it will decide which replica is the destination
- abstraction of `Pods`
- you cannot replica database `Pod` since database has state
  - which is their data

### `StatefulSet`

problem: you still need replica of stateful `Pod`

- is like `Deployment` but for stateful `Pod`
  - for example database `Pod`
- it is hard to deploy `StatefulSet`, hence it is easier to host database outside k8s cluster

## Artitecture

### `Node` / `Worker Node`

- each `Node` has multiple `Pods` on it
  - for example you have and api server Pod and database Pod
- 3 processes must be installed on every `Node`
  - `container runtime`
    - You need to install a `container runtime` into each node in the cluster so that `Pods` can run there.
    - Docker is one example
  - `kubelet`
    - Each compute node contains a `kubelet`, a tiny application that communicates with the control plane. The `kubelet` makes sure containers are running in a `Pod`. When the control plane needs something to happen in a `Node`, the `kubelet` executes the action.
  - `kube proxy`
    - forwards the requests smartly
- usually, you will run multiple `Nodes`
- `Nodes` communicate via `Services`

### `Master Node`

problem: how do you interact with k8s cluster?

- there are 4 processs run on every `Master Node`
  - `API Server`
    - develpoer can call the api to interact with k8s cluster
    - it owns a gateway to route the request
    - it do authenticate
  - `Scheduler`
    - `API Server` will route the schedule request to `Scheduler`
    - with `Scheduler`, we can append new `Pod` easily
    - `Scheduler` will lookup the resource used in every `Worker Node` and decide how to allocate the `Pods`
    - `Scheduler` will ask `kubelet` of the `Worker Node` to start the `Pod`
  - `Controller Manager`
    - it deteect if a `Pod` is died, and reschedule them as soon as possible
    - if some `Pods` are died, it will ask `Scheduler` to rescheduler them
  - `etcd`
    - a key value store
    - like a cluster brain
    - cluster changes get stored in the key value store
    - the other three service, `API Server`, `Scheduler`, `Controller Manager`, all depends on `etcd`
- usually, we have multiple `Master Node`
  - the `API Server` is load balanced
  - `etcd` is distributed across all `Master Node`