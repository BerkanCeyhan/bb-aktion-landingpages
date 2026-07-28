const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Ensure dist folder exists
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Generate a simple index.html for the root
const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Pages</title>
  <style>
    body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #000; color: #fff; }
    ul { list-style: none; padding: 0; }
    li { margin: 10px 0; }
    a { color: #C8FF00; text-decoration: none; font-size: 1.2rem; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>BrustBizeps Landing Pages</h1>
  <ul>
    <li><a href="/creatin-hcl-1/">Creatin HCL 1</a></li>
    <li><a href="/creatin-hcl-light/">Creatin HCL Light</a></li>
    <li><a href="/creatin-hcl-pro/">Creatin HCL Pro</a></li>
    <li><a href="/mystery-box-1/">Mystery Box 1</a></li>
    <li><a href="/mystery-box-light/">Mystery Box Light</a></li>
    <li><a href="/mystery-box-summer/">Mystery Box Summer</a></li>
    <li><a href="/quiz-creatin-hcl/">Quiz · Creatin HCL</a></li>
    <li><a href="/quiz-mystery-box/">Quiz · Mystery Box</a></li>
    <li><a href="/quiz-eaa/">Quiz · EAA</a></li>
  </ul>
</body>
</html>
`;

fs.writeFileSync(indexPath, htmlContent);
console.log('Root index.html generated successfully.');

/* Statische Assets nach dist/assets kopieren.
 *
 * Werbemotive gehoeren zum Kunden, nicht zum Werkzeug, mit dem sie entstanden
 * sind. Sie lagen vorher im Wellenpuls-Repo und wurden von dort ausgeliefert;
 * das ist eine Mandantenverletzung. try.brustbizeps.de ist der Ort von
 * BrustBizeps, also liegen sie hier.
 *
 * Meta laedt Bilder ueber eine oeffentliche URL hoch (ads_creative_upload_image
 * nimmt nur image_url, keine Bytes) und braucht diesen Weg deshalb. Google Ads
 * nimmt die Bytes direkt und braucht ihn nicht.
 */
const assetsSrc = path.join(__dirname, 'assets');
if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, path.join(distPath, 'assets'), { recursive: true });
  console.log('Assets copied to dist/assets.');
}

/* Statische Seiten nach dist/ kopieren.
 *
 * Fuer eine Artikelseite braucht es keine Vite-App: ein index.html unter
 * static/<pfad>/ landet unverandert unter try.brustbizeps.de/<pfad>/.
 * Netlify liefert vorhandene Dateien aus, bevor die Catch-all-Weiterleitung
 * greift — der Artikel bleibt also erreichbar.
 */
const staticSrc = path.join(__dirname, 'static');
if (fs.existsSync(staticSrc)) {
  for (const eintrag of fs.readdirSync(staticSrc)) {
    fs.cpSync(path.join(staticSrc, eintrag), path.join(distPath, eintrag), { recursive: true });
    console.log(`Static page copied: /${eintrag}/`);
  }
}
