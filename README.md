# My portfolio website

Explore my projects, skills, and expertise in web and mobile app development. Discover how I build robust applications and APIs to power seamless user experiences and unlock innovative features and functionalities.

Tested on Linux.

## To run in development:

1. Clone the project `git clone https://github.com/andrew-novak/portfolio-website cloned-portfolio-website`, where `cloned-portfolio-website` represents the name of the destination directory where the repository will be cloned.

2. Navigate to the project root directory `cd ./cloned-portfolio-website`.

3. Install dependencies `npm run install:all`

4. Create `api/.env` file based on `api/example.env`. Replace `<values>` with your own.

5. Run `npm run start:all`

## To deploy for production:

Note that the following instructions do not include configuring standalone web servers like Nginx, Apache, etc.

1. Clone the project `git clone https://github.com/andrew-novak/portfolio-website cloned-portfolio-website`, where `cloned-portfolio-website` represents the name of the destination directory where the repository will be cloned.

2. Navigate to the project root directory `cd ./cloned-portfolio-website`.

3. Install dependencies: `npm run install:all`

### API:

4. Set variables on your server based on `api/example.env` with your own production variables, e.g., in the default `~/.bashrc` or your custom `~/.bashrc.d` directory.

5. Rename and move `api` subdirectory to a desired location.

6. Start server using PM2: `NODE_ENV=production pm2 start YOUR_API_DIRECTORY/server.js --name YOUR_PM2_APP_NAME`

### Client:

7. Navigate back to the project's root directory and then go to the `/client` subdirectory.

8. To set the homepage, use the command `npm set homepage <YourHomepageHere>`. If the website is located in the root location, you can set it as the current directory with `npm set homepage .`. For websites in sublocations, specify the full URL like `npm set homepage "https://example.com/apps/task-diary"`.

9. Build with environment variables, e.g.:

```
npm run
  REACT_APP_API_URL="https://host.ext/api" \
  REACT_APP_STATIC_URL="https://host.ext/static" \
  npm run build
```

Note: `REACT_APP_STATIC_URL` does not relate to static files like website's HTML files, but to user-uploaded static files.

7. Rename and move `client/build` directory to a desired location (e.g. somewhere in `/usr/share/nginx`).

### Clean up

8. After excluding both `api` and `client/build` directories, you can remove the rest of cloned project.
