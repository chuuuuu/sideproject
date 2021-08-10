# K8s-mongo-express-practice

In this practice, I follow the [video](https://www.youtube.com/watch?v=X48VuDVv0do&t=4576s&ab_channel=TechWorldwithNana) to create a k8s project with two deployments, mongo-express and mongo.

## Request Flow

1. user open the browser and visit the website
2. browser send a request to `express external service`
3. `express external service` forwarding the request to `express pod`
4. `express pod` send request to `mongodb internal service`
5. `mongodb internal service` forwarding the request to `mongodb pod`

## Setup

to ensure k8s cluster is empty, run

```bash
kubectl get all
```

you should only see `service/kubernetes`

## MongoDB

Our first step is to create the mongo deployment

### environment variable

you can visit the [dockerhub](https://hub.docker.com/_/mongo) to see what environment variable we need to setup

and we can know that we need three environment variable

- port
  - default: 27017
- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD

notice that, we should store sensitive data in secret.

### mongo-secret

the secret configurate file store the value in base64
you can get the base64 simply run

```bash
echo -n "username" | base64
```

and the `mongo-secret.yaml` would looks like

```yaml
# mongo-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongodb-secret
# default type, for key-value pairs
type: Opaque
data:
  # it's not plain text, it's base64
  mongo-root-username: dXNlcm5hbWU=
  mongo-root-password: cGFzc3dvcmQ=
```

now you can apply this to k8s

```bash
# apply the mongo-secret.yaml file
kubectl apply -f mongo-secret.yaml

# check if secret is setup
kubectl get secret
```

### mongo.yaml

with the secret, you can now setup your `mongo.yaml`

```yaml
# mongo.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb-deployment
  labels:
    app: mongodb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb
          image: mongo
          resources:
            limits:
              memory: 512Mi
              cpu: "1"
            requests:
              memory: 256Mi
              cpu: "0.2"
          ports:
            - containerPort: 27017
          env:
            - name: MONGO_INITDB_ROOT_USERNAME
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongo-root-username
            - name: MONGO_INITDB_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongo-root-password
```

### mongo-service

next, we are going to create mongo-service. notice that, we can create multiple documents in 1 yaml file. hence, it will be good to create multiple documents in 1 file if it is possible.

```yaml
# mongo.yaml
# mongo deployemnt configuration is here...
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  selector:
    app: mongodb
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
```

and now you can apply this new mongo.yaml to k8s

## Mongo-Express

Again you visit the dockerhub to know that we need these environment variables

- port
  - default: 8081
- ME_CONFIG_MONGODB_ADMINUSERNAME
- ME_CONFIG_MONGODB_ADMINPASSWORD
- ME_CONFIG_MONGODB_SERVER

### mongo-configmap

we want to make the url of mongo be accessible by other components and managed centralized. Hence, we create a configmap for it.

```yaml
# mongo-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
data:
  database_url: mongodb-service
```

and now you can apply mongo-configmap to k8s

### mono-express.yaml

```yaml
# mono-express.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo-express
  labels:
    app: mongo-express
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo-express
  template:
    metadata:
      labels:
        app: mongo-express
    spec:
      containers:
        - name: mongo-express
          image: mongo-express
          resources:
            limits:
              memory: 512Mi
              cpu: "1"
            requests:
              memory: 256Mi
              cpu: "0.2"
          ports:
            - containerPort: 8081
          env:
            - name: ME_CONFIG_MONGODB_ADMINUSERNAME
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongo-root-username
            - name: ME_CONFIG_MONGODB_ADMINPASSWORD
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongo-root-password
            - name: ME_CONFIG_MONGODB_SERVER
              valueFrom:
                configMapKeyRef:
                  name: mongodb-configmap
                  key: database_url
```

to see the logs, run

```bash
kubectl logs $MONGO_EXPRESS_POD_NAME
```

### monog-express-service

you need to enable the external service. With the same reason above, we create it inside mongo-express.yaml

to enable the service become external, you should add `type: LoadBalancer` in the spec field. notice that this might be a bad name since internal service is also a loadbalancer


```yaml
# mongo-express.yaml
# mongo-express deployemnt configuration is here...
---
apiVersion: v1
kind: Service
metadata:
  name: mongo-express-service
spec:
  selector:
    app: mongo-express
  # specify this service become external service
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 8081
      targetPort: 8081
      # port for external ip address
      # must between 30000 ~ 32767
      nodePort: 30000
```

to check the service, run

```bash
kubectl get service
# you should see something like:
# NAME                    TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
# kubernetes              ClusterIP      10.96.0.1       <none>        443/TCP          11h
# mongo-express-service   LoadBalancer   10.105.97.157   <pending>     8081:30000/TCP   34s
# mongodb-service         ClusterIP      10.106.1.219    <none>        27017/TCP        22m
```

you can see that the external ip of `mongo-express-service` is still pending. to give an external address, run
```bash
minikube service mongo-express-service
```

now you can access the server!