# rarimo.com

This repository contains the source code for the [rarimo.com](https://rarimo.com) website.

## Tech Stack

* **Next.js & React**: Server-side rendering and static-site generation for optimal performance
* **TypeScript**: Fully typed codebase for maintainability and developer confidence
* **Tailwind CSS**: Utility-first styling for rapid UI development
* **Yarn 4.7.0**: Package management with zero-install support
* **Dockerized**: Container-ready with a `Dockerfile` for easy deployments
* **Env Management**: Separate `.env-staging` and `.env-production` configs
* **CI/CD**: GitHub Actions workflows in `.github/workflows/`

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/rarimo/rarimo.com.git
   cd rarimo.com
   ```
2. Install dependencies and launch the dev server:

   ```bash
   yarn
   yarn dev
   ```
3. Open `http://localhost:3000` in your browser.

## Environment Variables

* `.env-staging` – Staging environment settings
* `.env-production` – Production environment settings

## Deployment

### Docker

```bash
# Build
docker build -t rarimo.com .

# Run
docker run -p 3000:3000 rarimo.com
```

## CI/CD

Continuous integration and deployment are managed via GitHub Actions. See `.github/workflows/` for build, test, and deployment pipelines.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Open a pull request
4. We’ll review and merge!

## License

MIT © 2025 Rarimo
