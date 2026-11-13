# Atifa Khan — Portfolio Website

A responsive, futuristic portfolio built with plain HTML, CSS and JavaScript. It is designed for GitHub Pages.

## 1. Preview locally
1. Download or clone this repository.
2. Open the folder in VS Code.
3. Open `index.html` in your browser. For a better development experience, use the VS Code Live Server extension.

## 2. Personalize your details
Open `script.js` and update:
- `email`
- `github`
- `linkedin`

Also edit the introduction and biography in `index.html` if you want to change the wording.

## 3. Add graphic designs
1. Export your design as JPG, PNG or WebP.
2. Put the image in `assets/designs/`.
3. Open `script.js` and find the `designs` array.
4. Add an object, for example:

```js
{ title: "My New Poster", category: "poster", label: "Poster design", image: "assets/designs/my-new-poster.png", symbol: "✳" }
```

Available categories: `social`, `poster`, `logo`, `branding`.

Use lowercase file names without spaces, such as `summer-campaign.png`.

## 4. Add development projects
In `script.js`, add or edit objects in the `projects` array. Replace `link: "#"` with the real GitHub repository or live demo URL.

## 5. Publish with GitHub Pages
1. Create a public GitHub repository named `atifa-portfolio` (or another name you prefer).
2. Upload all files and folders from this project. Make sure `index.html` is in the repository's root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then click **Save**.
6. Wait a few minutes. Your site should appear at:
   `https://YOUR-GITHUB-USERNAME.github.io/atifa-portfolio/`

If you name the repository `YOUR-GITHUB-USERNAME.github.io`, the site can instead use the root URL:
`https://YOUR-GITHUB-USERNAME.github.io/`

## 6. Update the live site
Whenever you add or edit files:
1. Save the changes.
2. Commit and push them to the `main` branch (or upload through GitHub's website).
3. GitHub Pages will publish the changes automatically.

## Notes
- Replace all placeholder links and sample project descriptions before sharing your portfolio professionally.
- The page uses Google Fonts; if a visitor is offline or the font service is unavailable, fallback fonts will be used.
- Do not upload private keys, passwords, API tokens or confidential project data to a public repository.
