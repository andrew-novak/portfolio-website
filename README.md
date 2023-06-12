# My portfolio website

Explore my projects, skills, and expertise in web and mobile app development. Discover how I build robust applications and APIs to power seamless user experiences and unlock innovative features and functionalities.

## To run in development:

1. Make sure you are in the project root directory.

2. Install dependencies `npm run install:all`

3. Create `api/.env` file based on `api/example.env`. Replace `<values>` with your own.

4. Run `npm run start:all`

## To deploy for production:

1. Clone project.

1. Make sure you are in the project root directory.

1. Install dependencies: `npm run install:all`

### API:

3. Set actual environment variables based on `api/example.env`

4. Rename and move `api` directory to a desired location.

5. Start server using PM2: `NODE_ENV=production pm2 start YOUR_API_DIRECTORY/server.js --name YOUR_PM2_APP_NAME`

### Client:

5. Go back to the project root directory.

6. Build with environment variables, e.g.:

```
npm run
  REACT_APP_API_URL="https://host.ext/api" \
  REACT_APP_STATIC_URL="https://host.ext/static" \
  npm run build
```

Note: `REACT_APP_STATIC_URL` does not relate to static files like website's HTML files, but to user-uploaded static files.

7. Rename and move `client/build` directory to a desired location (e.g. somewhere in `/usr/share/nginx`).

### Clean up

8. After removing both `api` and `client/build` directories, you can remove the rest of cloned project.
