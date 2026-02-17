# AvalynxSimpleAdmin

Beispielseiten für Login, Toolwechsel und Dashboard sind im Ordner `examples/` enthalten.

## Beispiele lokal testen

1. Voraussetzungen
   - Ein beliebiger statischer Webserver oder das Öffnen der HTML-Dateien direkt im Browser
   - Internetzugang für Bootstrap 5.3 und Font Awesome CDN

2. Dateien
   - `examples/login.html` – Gast-/Login-Seite mit Darkmode-Umschalter
   - `examples/dashboard.html` – Admin-Dashboard mit Sidenav, Suche und Inhaltsbereich
   - `examples/tool-switch.html` – Beispiel zum Wechsel zwischen Tools/Modulen

3. Assets
   - Die Beispiele binden die vorhandenen Styles und Skripte aus `src/` ein:
     - CSS: `src/css/avalynx-simpleadmin*.css` und `src/css/avalynx-simpleadmin*.vars.css`
     - JS: `src/js/avalynx-simpleadmin*.js`
   - Bootstrap und Font Awesome werden via CDN geladen.

4. Hinweise
   - Der Darkmode wird über `data-bs-theme` und den Umschalter `avalynx-simpleadmin-toggler-darkmode` gesteuert.
   - Das Sidenav-Verhalten passt sich am Breakpoint aus `--avalynx-simpleadmin-breakpoint` an (Mobil/Offcanvas vs. Desktop).
   - Für produktive Nutzung empfehlen wir, die Dateien aus `dist/` zu verwenden und lokale CDNs/Assets zu hosten.

