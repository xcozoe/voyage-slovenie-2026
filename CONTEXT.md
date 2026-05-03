# Voyage Slovénie 2026 — Contexte projet

> Document à lire EN PREMIER par Claude Code pour reprendre le projet.

## Brief

App web immersive pour notre voyage en Slovénie du **7 au 24 juillet 2026** (18 jours).
Voyageurs : **2 adultes + 1 ado**. Départ depuis Toulouse.

L'app sert de compagnon pendant le voyage : programme jour par jour, hébergements avec liens cliquables (Maps, Téléphone, Airbnb), itinéraires entre étapes.

**Hébergement** : GitHub Pages (URL publique).
**Accès** : iPhone (Rémi) + Android (compagne) via favori d'écran d'accueil.
**Synchro données** : Firebase Firestore (mode test, région eur3).

## Itinéraire (18 jours)

| Jour | Date | Étape | Trajet | Nuits |
|------|------|-------|--------|-------|
| J1 | mar 7/7 | Toulouse → Nice | 564 km / 5h55 | 1 (Nice) |
| J2 | mer 8/7 | Nice → Venise | 570 km / 6h15 | (Venise n°1) |
| J3 | jeu 9/7 | Venise — Grand Canal & San Marco | sans voiture | (Venise n°2) |
| J4 | ven 10/7 | Venise → Piran | 202 km / 2h30 | (Piran n°1) |
| J5 | sam 11/7 | Vélo Parenzana Koper→Piran | sans voiture | (Piran n°2) |
| J6 | dim 12/7 | Marais salants matin + route Karst aprem + Predjama | 73 km / 1h | 1 (Postojna) |
| J7 | lun 13/7 | Škocjan matin + route Ljubljana | 53 km / 45 min | (Ljubljana n°1) |
| J8 | mar 14/7 | Ljubljana — paddle Ljubljanica | sans voiture | (Ljubljana n°2) |
| J9 | mer 15/7 | Ljubljana → Bled | 55 km / 50 min | (Bled n°1) |
| J10 | jeu 16/7 | Vintgar tôt + lac Bled | sans voiture | (Bled n°2) |
| J11 | ven 17/7 | Excursion Bohinj depuis Bled | 25 km A/R | (Bled n°3) |
| J12 | sam 18/7 | Rando Planina Zajamniki (Pokljuka) | sans voiture | (Bled n°4) |
| J13 | dim 19/7 | Bled → Tolmin via col Vršič | 110 km / 2h30 | (Tolmin n°1) |
| J14 | lun 20/7 | Rafting Soča matin + gorges Tolmin aprem | sans voiture | (Tolmin n°2) |
| J15 | mar 21/7 | Cascade Kozjak matin + route Zelenci aprem | 75 km / 1h30 | 1 (Zelenci/Kranjska Gora) |
| J16 | mer 22/7 | Zelenci → Laigueglia | 660 km / 7h30 | (Laigueglia n°1) |
| J17 | jeu 23/7 | Détente Laigueglia (Colla Micheri, Cervo, plage) | sans voiture | (Laigueglia n°2) |
| J18 | ven 24/7 | Laigueglia → Toulouse | 673 km / 7h05 | — |

**Total : ~2 962 km, 8 bases d'hébergement, 3 pays (France, Italie, Slovénie + Italie au retour).**
17 nuits d'hôtel/Airbnb.

### Notes importantes sur l'itinéraire
- **Pas de Dolomites ni de Cinque Terre** (rejetés car trop touristiques en juillet)
- **Canyoning abandonné** (initialement prévu J15, retiré)
- **Tolmin** est la base sud de la vallée de la Soča (et non Bovec)
- **Bled = camp de base unique** pour les Alpes Juliennes (Bohinj, Vintgar, Pokljuka en excursion)

## Hébergements

### Confirmés (4)

#### Venise — Palazzo Odoni
- **Type** : hôtel
- **Adresse** : Santa Croce 151, Fondamenta Minotto, 30135 Venezia
- **Téléphone** : +39 041 2759454
- **Email** : info@palazzoodoni.com
- **Site** : https://palazzoodoni.com
- **Confirmation** : MP79873933M-1
- **Chambre** : Junior Suite Familiale (rdc, 2 chambres communicantes, baignoire d'hydromassage)
- **Check-in** : mer 8/7 à partir de 14h00 (arrivée prévue ~16h)
- **Check-out** : ven 10/7 avant 10h30
- **Prix** : 516 € (258 €/nuit Special Discount) à payer sur place + taxe séjour 4 €/pers/jour
- **Annulation** : gratuite jusqu'à 7 jours avant
- **Réservé par** : Elsa (elsa.poixjover@gmail.com)
- **Coordonnées** : 45.4376, 12.3196

#### Piran — Mora Cantada Apartma za 4
- **Type** : Airbnb
- **Adresse** : Ulica Svobode 71, 6330 Piran-Pirano, Slovénie
- **Hôte** : Tanja
- **Téléphone** : +386 30 357 081
- **Confirmation** : HMJCHFSF48
- **Check-in** : ven 10/7 après 17h00
- **Check-out** : dim 12/7 avant 10h00
- **Prix** : 344 € (172 €/nuit)
  - **172 € payé** le 2/5/2026 (CB 0748)
  - **172 € à payer le 25 juin** (CB 0748)
- **Réservé par** : Rémi
- **Coordonnées** : 45.5286, 13.5683

#### Postojna — Spacious apartment in nature with Sauna
- **Type** : Airbnb
- **Adresse** : Bukovje, 6230 Postojna, Slovénie
- **Hôte** : Tamara
- **Téléphone** : +386 41 928 306
- **Confirmation** : HM2MRZRPRY
- **Check-in** : dim 12/7 après 16h00
- **Check-out** : lun 13/7 avant 10h00
- **Prix** : 228,04 € (195 € + 33,04 € frais Airbnb)
  - **130,54 € payé** le 2/5/2026 (CB 0748)
  - **97,50 € à payer le 27 juin** (CB 0748)
- **Notes** : sauna sur place, pas adapté aux enfants en bas âge mais OK pour ado
- **Réservé par** : Rémi
- **Coordonnées** : 45.7758, 14.2031

#### Ljubljana — « Unique » Apartment in the Heart of Ljubljana
- **Type** : Airbnb
- **Adresse** : Trubarjeva cesta 41, 1000 Ljubljana, Slovénie
- **Hôte** : Živa
- **Téléphone** : +386 51 669 846
- **Confirmation** : HMW335MTKT
- **Check-in** : lun 13/7 après 15h00 (arrivée autonome avec boîte à clé sécurisée)
- **Check-out** : mer 15/7 avant 10h00
- **Prix** : 327,44 € (140 €/nuit + 47,44 € frais Airbnb) — **intégralement payé** le 2/5/2026 (CB 0748)
- **Réservé par** : Rémi
- **Coordonnées** : 46.0508, 14.5074

### À réserver (5 — TBD)

| Ville | Nuits | Dates | Coordonnées |
|-------|-------|-------|-------------|
| Nice | 1 | 7→8/7 | 43.6968, 7.2839 |
| Bled | 4 | 15→19/7 | 46.3636, 14.0938 |
| Tolmin | 2 | 19→21/7 | 46.1837, 13.7340 |
| Zelenci/Kranjska Gora | 1 | 21→22/7 | 46.4885, 13.7344 |
| Laigueglia | 2 | 22→24/7 | 43.9750, 8.1631 |

### Bilan financier
- **Déjà payé** : 629,96 € (Piran 50% + Postojna acompte + Ljubljana intégral)
- **À payer le 25 juin** : 172 € (Piran solde)
- **À payer le 27 juin** : 97,50 € (Postojna solde)
- **À payer sur place Venise** : 516 € + taxe séjour
- **Restants à estimer** : Nice, Bled, Tolmin, Zelenci, Laigueglia

## Configuration Firebase

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBnI7hdhZd7yKCxen-c6GBfRu1Mn7iuClk",
  authDomain: "voyage-slovenie-2026.firebaseapp.com",
  projectId: "voyage-slovenie-2026",
  storageBucket: "voyage-slovenie-2026.firebasestorage.app",
  messagingSenderId: "411413122851",
  appId: "1:411413122851:web:014f6ab7758b3a90aec696"
};
```

- **Firestore** en mode test (règles ouvertes 30 jours)
- **Région** : eur3 (europe-west)
- **Règles à durcir** après MVP (cf v2)

### Règles Firestore actuelles (à durcir en v2)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /ping/{document=**} {
      allow read, write: if true;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Préférences design (validées par Rémi)

### Palette — Adriatique au crépuscule
- **Fond principal** : `#0a3a44` (turquoise sombre Adriatique) ou `#0e2a3a` (bleu nuit profond)
- **Accents** : `#e98d58` (corail tiède) + `#d4a574` (sable doré) pour les highlights
- **Texte** : `#fbf6e9` (crème chaude) sur fond sombre
- **Vert olive** : `#5e7642` pour le statut payé
- **Turquoise clair** : `#6cb6c4`

### Typographie
- **Display** : Fraunces (italic, opsz variable)
- **Body** : Inter

### Style général
- **Mobile-first**, ~540px max-width
- **Style éditorial** type Cereal Magazine / Wallpaper City Guide
- **Photos hero plein écran** avec gradient overlay sombre en bas pour lisibilité
- **Hiérarchie** dramatique : grands titres italic, beaucoup d'air, peu de chrome
- **Animations** subtiles : fade-in staggered au chargement, transitions douces

### Anti-patterns à éviter
- ❌ Fond crème/jaune pâle (rejeté par Rémi en v1)
- ❌ Aspect "AI slop" générique
- ❌ Trop de bords arrondis, ombres systématiques
- ❌ Photos absentes ou hors-sujet

## v1 livrée puis REJETÉE

L'app v1 (`index.html` actuel) est fonctionnelle :
- Timeline 18 jours avec couleurs par étape
- Vue détaillée jour avec stop programme/hébergement/boutons Maps/Tél/Airbnb
- Page hébergements centralisée
- Indicateur synchro Firebase
- Navigation hash-based
- Mobile-first 540px max-width
- Inter + Fraunces fonts

**Mais** : fond crème pâle pas immersif, **aucune photo de voyage**, attendu plus class/immersif.

**À refaire en v2** : design immersif turquoise sombre + photos hero plein écran + gradient overlay + style éditorial type Cereal Magazine.

## Photos disponibles

**57 fichiers** dans `photos/` (3 formats par jour) :
- `-hero.jpg` (1600×900) → arrière-plans pleine largeur des pages jour
- `-mobile.jpg` (800×600) → version compacte pour mobile
- `-thumb.jpg` (400×400) → vignettes carrées timeline

### Mapping jour → photo

| Clé | Sujet | Source |
|-----|-------|--------|
| `cover` | Lac de Bled | Pexels |
| `j01-nice` | Promenade des Anglais | Pexels |
| `j02-venise-arrivee` | Grand Canal | Pexels |
| `j03-venise-canal` | Pont des Soupirs | Pexels |
| `j04-piran` | Place Tartini aérienne | Pexels |
| `j05-parenzana` | Tunnel pierre + famille à vélo | **Photo Rémi** |
| `j06-predjama` | Château troglodyte | Pexels |
| `j07-skocjan` | Stalactites grotte | Pexels |
| `j08-ljubljana` | Triple Pont | Pexels |
| `j09-bled` | Lac et île de Bled | Pexels |
| `j10-vintgar` | Passerelles bois | **Photo Rémi** |
| `j11-bohinj` | Lac alpin | **Photo Rémi** |
| `j12-mostnica` | Cascade | Pexels |
| `j13-vrsic` | Route alpine sinueuse | Pexels |
| `j14-rafting` | Rafts rouges Soča | **Photo Rémi** |
| `j15-canyoning` | Saut falaise Soča | **Photo Rémi** |
| `j16-laigueglia` | Village ligure couleurs | Pexels |
| `j17-ligurie` | Plage Riviera parasols | Pexels |
| `j18-retour` | Route alpine (réutilisée) | Pexels |

## Préférences utilisateur (Rémi)

- **Travail itératif** : Rémi modifie souvent ses choix, exécuter sans refaire de PDF/app sans son OK explicite
- **Apprécie** : technique précise, livrables directement utilisables, photos justes
- **Déteste** : photos hors-sujet, propositions trop chargées, formats inadéquats, fond jaune
- **Mode de travail** : valide étape par étape, ne pas anticiper

## Tâches en attente

### v2 (priorité 1)
- Refaire l'app immersive : fond `#0a3a44`, photos hero plein écran, gradient overlay
- Garder toute la logique Firebase + données + liens cliquables de la v1
- Tester rendu mobile (iPhone Safari + Android Chrome)
- Intégrer un menu/swipe entre jours plus fluide
- Améliorer la page hébergements avec photos en arrière-plan

### v3 et suite
- Notes partagées entre les 2 téléphones (Firestore — règles à durcir d'abord)
- Checklists par jour
- Photos prises en cours de voyage attachées aux jours
- Mode hors-ligne complet (Service Worker)
- Carte interactive avec tous les points

### Réservations à finaliser (côté Rémi, hors app)
- Hôtel Nice (1 nuit du 7/7)
- Hôtel/AirBnB Bled (4 nuits du 15/7)
- Hébergement Tolmin (2 nuits du 19/7)
- Hébergement Zelenci/Kranjska Gora (1 nuit du 21/7)
- Hôtel Laigueglia (2 nuits du 22/7) — recommandés : Hotel Windsor, Hotel Splendid Mare, Hotel Villa Giulia
- Activités à réserver : vélo Parenzana (E-Bike Istria), rafting Soča (Bovec Sport Center), Vintgar (créneau en ligne), Škocjan (en ligne), spa Lepa Vida

## Stack technique cible v2

- HTML/CSS/JS vanilla (pas de framework lourd, app hébergée sur GitHub Pages)
- Firebase Modular SDK v12 via CDN ESM
- Polices : Google Fonts (Fraunces + Inter)
- Pas de build step (un seul fichier `index.html` ou structure simple)
- Service Worker pour cache offline (à venir)

## Déploiement

GitHub Pages depuis la branche `main`, dossier racine.
URL cible : `https://[ton-pseudo].github.io/voyage-slovenie/`

À ajouter à l'écran d'accueil iPhone (Safari) et Android (Chrome) pour expérience native.
