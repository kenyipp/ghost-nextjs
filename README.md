# Ghost NextJs

<p align="center">
	<a href="https://blog.kenyip.cc" target="_blank">
		<img src="./doc/demo.png" width="500" />
	</a>
</p>

This repository contains a blog created using the Next.js framework and the Ghost blogging platform. 

While Ghost offers an excellent content management system and a highly customizable frontend view, this project uses Ghost's APIs instead of the [Handlebars](https://ghost.org/docs/themes/#handlebars) templating language to customize the view. This approach eliminates the need to learn Handlebars and allows for a more streamlined development process. 

Additionally, [Ghost's APIs](https://ghost.org/docs/content-api/javascript) provide backend functionality, eliminating the need to write a custom backend server from scratch.

## Getting Started

### Setup the project and install dependencies
```
git clone https://github.com/kenyipp/ghost-nextjs.git
cd ghost-nextjs
yarn 
```

### Setup the environment variables

| Variables            | Description                                                                                               | Example                |
| -------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------- |
| GHOST_DOMAIN         | Your site domain                                                                                          | https://blog.kenyip.cc |
| GHOST_PUBLIC_API_KEY | Your ghost public API. Click [here](https://ghost.org/docs/content-api/#key) to check on how to create it | -                      |
| DB_DATABASE          | Blog's Database                                                                                           | blog                   |
| DB_HOST              | Blog's Host                                                                                               | 123.123.123.123        |
| DB_USERNAME          | Blog's Username                                                                                           | root                   |
| DB_PASSWORD          | Blog's Password                                                                                           | -                      |
| DB_PORT              | Blog's Port                                                                                               | 3306                   |

### Start the development or production server

Start development server:
```
yarn dev
```

Start production server:
```
yarn build
yarn start
```

## Todo list
 - [ ] Improve the SEO by optimizing meta tags, adding structured data, and improving the site's load speed
 - [ ] Refactor the code to create better APIs that are more intuitive and efficient
 - [ ] Write comprehensive test cases that cover all aspects of the application, including edge cases
 - [ ] Create code coverage reports to ensure that all parts of the code are being tested adequately and identify areas that need improvement

## Contributing
Please review the existing issues in this repository for areas that require improvement.
If you identify any missing or potential areas for improvement, feel free to open a new issue for them.

### Before commit
Before deploying and integrating the application, it is necessary to perform a series of validations such as testing, linting, and formatting. We recommend running cargo make pre-commit before making each commit to ensure compliance.
