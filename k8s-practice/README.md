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

## `Minikube` and `kubectl`

### `Minikube`

problem: it's not practical to run k8s cluster on local.

- it is used for development or testing
- master and worker processes both run on one `Node`
- it will create a virtual box on your laptop
- Node runs in that virtual box

### `kubectl`

there are 3 different ways to communicate with `API Server`: UI (such as a dashboard), API, or CLI (which is `kubectl`)

Moreover, `kubectl` is not only for `Minikube`, but also for cloud cluster

### scripts

```bash
# this will also install kubectl for you
brew install minimkube

# start minikube
minikube start --driver=docker

# lookup the docker contrainer id
docker ps

# get into the shell of minikube container
docker exec -it <mycontainer> bash
```

- kubectl CLI
  - for configuring the minikube cluster
- minikube CLI
  - for start up or deleting the cluster

## Main Kubectl command

```bash
# checkout minikube status
minikube status

# checkout nodes status
kubectl get nodes

# check pods
kubectl get pod

# check services
kubectl get services

# list create related usages
kubectl create -h
```

you wont manipulate pod directly, you will work with the abstraction over pod which is deployment

```bash
# create a deployment
kubectl create deployment $NAME --image=$IMAGE_NAME
# for example
kubectl create deployment nginx-deployment --image=nginx
# and you can find your deployment
kubectl get deployment
```

after you create a deployment, you can check out the replica set and pod created by k8s

```bash
kubectl get replicaset
kubectl get pod
```

the name of `deployment`, `replica set`, and `pod` would be
| component | name |
|-------------|-----------------------------------|
| deployment | nginx-deployment |
| replica set | nginx-deployment-84cd76b964 |
| pod | nginx-deployment-84cd76b964-w8m9l |

hence, you can discover that name of `deployment` is the prefix of `replica set`
and the name of `replica set` is the prefix of `pod`

you can also edit the auto-generated configuration of the `deployment`

```bash
kubectl edit deployment $DEPLOYMENT_NAME
```

after you edit some configurations, k8s would automatically update the changes. Hence, you will see that the name of `replica set` and name of `pod` would changed

we can create more deployment, for example a deployment for mongodb

```
kubectl create deployment mongo-deployment --image=mongo
```

and you can see the more information by running

```bash
# see the logs
kubectl logs $POD_NAME
# see the description
kubectl describe pod $POD_NAME
```

or you can get into the shell of container by running

```bash
# -it means iteractive terminal
kubectl exec -it $POD_NAME -- bin/bash
```

to delete the deployment, run

```bash
kubectl delete deployment $DEPLOYMENT_NAME
```

notice that, all CRUD happens on deployment level, replica set and pod will run automatically.

### kubectl create deployment workflow

1. run the creation command
2. k8s will create a deployment
3. the deployment will create a replica set
4. the replicaset will create a pod

### replicaset

deployment manage replica set
replica set manage pods

## configuration file

problem: you can do all setup by using cli. however, that's not practical.

you can write a configuration file and ask k8s to read it

```bash
kubectl apply -f $configuration_file
```

if you want to update the configuration, simply modify the configuration file and re-run the apply command.

each configuration file has 3 parts:

- metadata
- specification
- status
  - which will be generated and added by k8s automatically
  - k8s will compare the status and the specfication
    - if status is not correct, k8s will try to fix it
  - will store in `etcd`

in this example, we create two configuration file

```yaml
# nginx-deployment.yaml
# sepcify which api are you using
apiVersion: apps/v1
# the category of component
kind: Deployment
# every configuration file need to have a metadata and spec field
# metadata for deployment
metadata:
  name: nginx-deployment
  # Unlike names and UIDs, labels do not provide uniqueness. In general, we expect many objects to carry the same label(s).
  # the set of pods that a service targets is defined with a label selector
  labels:
    app: nginx
# spec for deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  # template for pod
  template:
    # template should also have a metadata and spec field
    # metadata for pod
    metadata:
      labels:
        app: nginx
    # spec for pod
    spec:
      containers:
        # `-` indicate item of array
        - name: nginx
          image: nginx:1.16
          ports:
            - containerPort: 8080
          resources:
            limits:
              memory: 512Mi
              cpu: "1"
            requests:
              memory: 256Mi
              cpu: "0.2"
```

```yaml
# nginx-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      # port for outside world
      port: 80
      # port of pod
      targetPort: 8080
```

and we apply two configuration files, we can see the deployment, replica set, pod, and service are all created.

notice that you may see two service

```
NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
kubernetes      ClusterIP   10.96.0.1      <none>        443/TCP   9h
nginx-service   ClusterIP   10.111.219.3   <none>        80/TCP    2m34s
```

`kubernetes` service is created by default, and `nginx-service` service is the one we create

to check if service do the right port forwarding, run

```
kubectl describe service nginx-service
```

to check the ip address of pod, you can simply run

```
kubectl get pod -o wide
```

to check if the status is generated correctly, run

```
kubectl get deployment nginx-deployment -o yaml > nginx-deployment-result.yaml
```

and you can see the status part is added

finally, you can delete all of them by running

```bash
kubectl delete -f nginx-deployment.yaml
kubectl delete -f nginx-service.yaml
```
