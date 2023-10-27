# 🌐 URL Shortener
An application which allows users to easily create new shortened URLs and when a user looks up short URL, it will redirect them to the original URL

## 🛠️ Setup Instructions
  1. Run `npm install` in the root directory of project ➡ This will install the packages to run frontend application
  2. Run `npm install` in the [Backend folder](server) ➡ This will install the packages to run the backend operations
## 💻 Technologies Used
### Frontend Development
   1. [React](react.dev)
   2. [TypeScript](https://www.typescriptlang.org/)
   3. [Vite](https://vitejs.dev/)
   4. [Tailwindcss](https://tailwindcss.com/)
   5. [Flowbite](https://flowbite.com/)
### Backend Development
   1. [NodeJs](https://nodejs.org/en)
   2. [Express](https://expressjs.com/)
   3. [MongoDB](https://www.mongodb.com/docs/)
### Deployment
   1. [Vercel](https://vercel.com/docs)
   2. [AWS-EC2](https://docs.aws.amazon.com/ec2/)
   3. [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
   4. [NGINX](https://docs.nginx.com/)
## 🏃🏽 Running The Application in Development mode
- From the root directory run `npm run dev` to start the frontend application.
- (OPTIONAL) If working on the tailwindcss run `npm run tailwindcss:watch` to build and apply changes.
- From the [server](server) directory run `npm run dev` to start the backend server.
- Frontend application uses an [.env.development](url-shortener-server.saifm.io/RZuMvm) which needs to be placed in the root directory.
- Backend application uses a [development.json](url-shortener-server.saifm.io/HP4Svh) which needs to be placed in [config](server/config).
## 🌊 Flow of the application
- Enter the long URL, hit submit and then the URL will be shortened.
- Access the dashboard to see the URLs that are being shortened and how many clicks from them.
- Short URLs are being used for the environment files ☝🏾
## ⚙️ Automated Deployment
- Have added a workflow, to update EC2 instance on every push to `main` branch and reload server with PM2.
- Vercel will also deploy changes on every push to `main`.
## 🚀 Further Improvements
- User authentication -> have started on it but did not have enough time to complete it
- Per click analytics -> have obtained geolocation and also device type, browser and operating system from the click analytics but not enough time to complete it

