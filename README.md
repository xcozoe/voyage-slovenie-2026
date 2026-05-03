# Voyage Slovénie 2026 — App de voyage

App web immersive pour notre voyage en Slovénie du 7 au 24 juillet 2026.
Hébergée sur GitHub Pages, accessible depuis iPhone et Android.

## Démarrage rapide avec Claude Code

### 1. Pré-requis

```bash
# Installer Claude Code (une seule fois)
npm install -g @anthropic-ai/claude-code
# OU via Homebrew sur macOS
brew install claude-code
```

### 2. Structure du projet

```
voyage-slovenie/
├── CONTEXT.md              # ← Mémoire complète du projet, à lire EN PREMIER
├── README.md               # Ce fichier
├── index.html              # App v1 (rejetée, à refaire en v2)
├── data/
│   └── stays.json          # Hébergements structurés (4 confirmés + 5 TBD)
├── photos/                 # 57 photos optimisées (3 formats × 19 entrées)
│   ├── cover-hero.jpg
│   ├── cover-mobile.jpg
│   ├── cover-thumb.jpg
│   ├── j01-nice-hero.jpg
│   ├── j01-nice-mobile.jpg
│   ├── j01-nice-thumb.jpg
│   └── ... (j01 à j18)
└── uploads/                # Documents source (mails Airbnb, PDF, xlsx)
    ├── He_bergements.xlsx
    ├── my_pdf.pdf
    └── *.eml
```

À toi d'**ajouter** les fichiers dans `uploads/` (mails .eml, PDF Palazzo Odoni, xlsx) si tu les as.
Les photos dans `photos/` sont déjà fournies.

### 3. Lancer Claude Code

```bash
cd voyage-slovenie
claude
```

### 4. Premier prompt à donner

```
Lis CONTEXT.md en entier puis explore le dossier (data/, photos/, index.html, uploads/).
Ne code rien encore.
Propose-moi un plan d'attaque pour refaire l'app v2 immersive selon les préférences décrites
dans CONTEXT.md (fond turquoise sombre, photos hero plein écran, style éditorial Cereal Magazine).
```

## Travailler sur le projet

### Tester l'app en local

```bash
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000 dans un navigateur
```

### Déployer sur GitHub Pages

1. Créer un dépôt public sur GitHub (ex: `voyage-slovenie`)
2. Initialiser le repo localement :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[ton-pseudo]/voyage-slovenie.git
   git push -u origin main
   ```
3. Sur GitHub : Settings → Pages → Source : `main` / root → Save
4. URL publique : `https://[ton-pseudo].github.io/voyage-slovenie/`

### Mettre à jour l'app

```bash
# Modifier les fichiers...
git add .
git commit -m "Description du changement"
git push
# GitHub Pages se met à jour en 1-2 min
```

### Ajouter à l'écran d'accueil (iPhone / Android)

- **iPhone Safari** : bouton partage ⎙ → "Sur l'écran d'accueil"
- **Android Chrome** : menu ⋮ → "Ajouter à l'écran d'accueil"

## Configuration Firebase

Voir `CONTEXT.md` section "Configuration Firebase".

Le projet Firebase `voyage-slovenie-2026` est déjà créé avec Firestore en mode test (région eur3).
Les clés sont dans `index.html` et dans `CONTEXT.md`.

## Workflow recommandé avec Claude Code

1. **Toujours commencer une session** par : *"Lis CONTEXT.md et fais-moi un point sur l'état actuel"*
2. **Mettre à jour CONTEXT.md** au fur et à mesure des décisions importantes
3. **Tester en local** avant de pousser sur GitHub
4. **Commiter souvent** avec des messages clairs

## État actuel du projet (à mettre à jour au fur et à mesure)

- ✅ Itinéraire 18 jours validé
- ✅ 4 hébergements confirmés (Venise, Piran, Postojna, Ljubljana)
- ❌ 5 hébergements à réserver (Nice, Bled, Tolmin, Zelenci, Laigueglia)
- ✅ Firebase configuré
- ✅ 57 photos optimisées prêtes
- ❌ App v1 rejetée (fond pas immersif, sans photos)
- 🚧 App v2 immersive à coder
- ❌ Pas encore déployé sur GitHub Pages
- ❌ Règles Firestore à durcir
