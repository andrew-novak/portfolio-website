# My portfolio website

[Link to the portfolio](https://andrewnovak.co.uk)

Consisting of an API and a client interface complete with an admin panel, this web application is designed to allow visitors to delve into project insights managed by the site's admin and to facilitate direct communication via an integrated email form.

<img src="https://github.com/andrew-novak/portfolio-website/raw/main/forReadme/creating-project.gif" alt="GIF presenting creation of a project in the portfolio web app" width="512" height="512">

On the administrative side, this platform offers comprehensive project customization features, with customized elements stored in both a MongoDB database and as static files.

- **Title**
- **Rich Text Format Description**
- **Position**: arrangement of a project in the desired sequence within the project grid.
- **Colors**
- **Media**: insertion and rearrangement of images, GIFs, and videos effortlessly using convenient drag-and-drop controls.
- **Interactive Buttons**: designed for actions such as opening a URL in a new window or file downloads.

## To run in development:

1. Clone the project:

```
git clone https://github.com/andrew-novak/portfolio-website cloned-portfolio-website
```

where `cloned-portfolio-website` represents the name of the destination directory where the repository will be cloned.

2. Navigate to the project root directory `cd ./cloned-portfolio-website`.

3. Install dependencies `npm run install:all`

4. Create `api/.env` file based on `api/example.env`. Replace `<values>` with your own.

5. Run `npm run start:all`

## To deploy for production:

Note that the following instructions do not include configuring standalone web servers like Nginx, Apache, etc.

1. Clone the project:

```
git clone https://github.com/andrew-novak/portfolio-website cloned-portfolio-website
```

where `cloned-portfolio-website` represents the name of the destination directory where the repository will be cloned.

2. Navigate to the project root directory `cd ./cloned-portfolio-website`.

3. Install dependencies: `npm run install:all`

### API:

4. Set variables on your server based on `api/example.env` with your own production variables, e.g., in the default `~/.bashrc` or your custom `~/.bashrc.d` directory.

5. Rename and move `api` subdirectory to a desired location.

6. Start server using PM2:

```
NODE_ENV=production pm2 start YOUR_API_DIRECTORY/server.js --name YOUR_PM2_APP_NAME
```

### Client:

7. Navigate back to the project's root directory and then go to the `/client` subdirectory.

8. To set the homepage, use the command:

```
json -I -f package.json -e "this.homepage="<your-homepage-here>"
```

If the website is located in the root location, you can set it as the current directory with:

```
json -I -f package.json -e "this.homepage="."
```

For websites in sublocations, specify the full URL like:

```
json -I -f package.json -e "this.homepage="https://example.com/apps/task-diary"
```

9. Build with environment variables, e.g.:

```
export REACT_APP_API_URL="https://example.com/api"
export REACT_APP_STATIC_URL="https://example.com/static"
export REACT_APP_GITHUB_URL="https://github.com/example"
npm run build
```

Note: `REACT_APP_STATIC_URL` does not relate to static files like website's HTML files, but to user-uploaded static files.

7. Rename and move `client/build` directory to a desired location (e.g. somewhere in `/usr/share/nginx`).

### Clean up

8. After excluding both `api` and `client/build` directories, you can remove the rest of the cloned project.
