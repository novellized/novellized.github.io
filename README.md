# Novellized Official Website

Official landing page and distribution hub for the **Novellized** organization.

- **Production URL**: [https://novellized.github.io](https://novellized.github.io)
- **Editor Repository**: [novellized-editor](https://github.com/novellized/novellized-editor)

## Local Preview

You can preview this static website locally using Python or any static HTTP server:

```bash
# Using Python 3
python3 -m http.server 8080

# Then open in browser:
# http://localhost:8080
```

## Deploying to GitHub Pages

1. Create a repository named `novellized.github.io` under the `novellized` organization.
2. Initialize and push this directory to `main`:

```bash
git init
git branch -M main
git remote add origin https://github.com/novellized/novellized.github.io.git
git add .
git commit -m "Initial release of Novellized official website"
git push -u origin main
```

GitHub Pages will automatically serve the website at `https://novellized.github.io`.

