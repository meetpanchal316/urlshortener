# URL Shortener

Frontend/Backend structure with Node.js/Express (no React!)

## Run Locally

Terminal 1:
cd backend && npm install && npm run dev

Terminal 2:
cd frontend && npm install && npm start

Visit http://localhost:3000

## Deploy

docker-compose up

OR

cd backend && docker build -t panchalmeet/urlshortener-backend:v1 . && docker push panchalmeet/urlshortener-backend:v1
cd frontend && docker build -t panchalmeet/urlshortener-frontend:v1 . && docker push panchalmeet/urlshortener-frontend:v1
kubectl apply -f k8s/