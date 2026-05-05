# Instructions Claude

## Workflow git

Après chaque commit sur la branche feature désignée :
1. `git checkout main`
2. `git merge --ff-only <branche-feature>` (l'historique doit rester linéaire ; si le fast-forward échoue, demander avant de faire autre chose)
3. `git push origin main`
4. Revenir sur la branche feature

Pas besoin de demander confirmation à chaque fois — c'est le comportement par défaut souhaité pour que les modifs soient immédiatement publiées via GitHub Pages.

## Service Worker

À chaque modif visible côté UI (`index.html`, CSS, JS shell), bumper la constante `CACHE` dans `sw.js` (ex. `voyage-slovenie-vN` → `vN+1`). Sans ça l'app PWA installée sur l'iPhone garde l'ancien shell en cache.
