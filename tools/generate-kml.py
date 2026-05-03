#!/usr/bin/env python3
"""
Génère voyage-slovenie-2026.kml à partir de data/days.json + data/stays.json
+ une liste curatée de POI. Le KML s'importe dans Google My Maps via
« Importer » sur un calque, ou Google Maps en chargeant l'URL .kml.

Usage : python3 tools/generate-kml.py
"""

import json
import html
from pathlib import Path

ROOT = Path(__file__).parent.parent
DAYS = json.loads((ROOT / 'data' / 'days.json').read_text(encoding='utf-8'))
STAYS = json.loads((ROOT / 'data' / 'stays.json').read_text(encoding='utf-8'))

# --- POI curatés (lat, lng) ---
POIS = [
    # Côte d'Azur / Italie aller
    ("Promenade des Anglais", 43.6961, 7.2655, "Nice — soirée J1"),
    ("Pont du Rialto", 45.4380, 12.3358, "Venise — Grand Canal J3"),
    ("Place Saint-Marc", 45.4341, 12.3389, "Basilique San Marco — J3 matin"),

    # Côte slovène
    ("Place Tartini (Piran)", 45.5283, 13.5688, "Centre médiéval — J4 fin d'après-midi"),
    ("Vélo Parenzana — Strunjan", 45.5300, 13.6006, "Plage Bele Skale — J5"),
    ("Salines de Sečovlje", 45.4914, 13.6056, "Marais salants — J6 matin"),

    # Plateau du Karst
    ("Château de Predjama", 45.8156, 14.1981, "Forteresse troglodyte — J6 fin d'après-midi"),
    ("Grottes de Škocjan", 45.6633, 13.9919, "UNESCO, canyon souterrain — J7 matin"),

    # Ljubljana
    ("Triple Pont (Plečnik)", 46.0518, 14.5060, "Centre historique — J7 & J8"),
    ("Château de Ljubljana", 46.0488, 14.5085, "Funiculaire au coucher — J7 soir"),

    # Bled & Alpes Juliennes
    ("Île de Bled (église)", 46.3625, 14.0928, "Pletna + 99 marches — J10"),
    ("Château de Bled", 46.3700, 14.1064, "XIIᵉ s, vue carte postale — J10"),
    ("Gorges de Vintgar", 46.4006, 14.0817, "Passerelles bois — J10 8h impératif"),
    ("Lac de Bohinj", 46.2792, 13.8644, "Sauvage, baignade — J11"),
    ("Église Saint-Thomas (Bohinj)", 46.2839, 13.8253, "Spot photo coucher de soleil — J11"),
    ("Gorges de la Mostnica", 46.2933, 13.9011, "Marmites de géants — J12 option"),
    ("Planina Zajamniki (Pokljuka)", 46.3286, 13.9486, "Randonnée alpage — J12"),

    # Vallée de la Soča
    ("Lac de Jasna (Kranjska Gora)", 46.4842, 13.7656, "Statue Zlatorog — J13"),
    ("Col du Vršič", 46.4317, 13.7411, "1611m, 50 lacets — J13"),
    ("Gorges de Tolmin", 46.1944, 13.7344, "Pont du Diable — J14 après-midi"),
    ("Cascade Kozjak (Kobarid)", 46.2562, 13.5801, "Cathédrale d'eau — J15 matin"),
    ("Réserve de Zelenci", 46.4922, 13.7253, "Source Sava Dolinka — J15 fin d'après-midi"),

    # Italie retour
    ("Cervo", 43.9275, 8.1117, "Un des plus beaux villages d'Italie — J17 option"),
    ("Colla Micheri", 43.9728, 8.1481, "Village médiéval, Thor Heyerdahl — J17 option"),
]

# Coordonnées des villes pour les linestrings de l'itinéraire
CITIES = {
    "Toulouse":         (43.6043, 1.4429),
    "Nice":             (43.6968, 7.2839),
    "Venise":           (45.4376, 12.3196),
    "Venise (Mestre)":  (45.4376, 12.3196),
    "Piran":            (45.5286, 13.5683),
    "Postojna":         (45.7758, 14.2031),
    "Ljubljana":        (46.0508, 14.5074),
    "Bled":             (46.3636, 14.0938),
    "Bohinj A/R":       (46.2792, 13.8644),
    "Tolmin":           (46.1837, 13.7340),
    "Zelenci":          (46.4885, 13.7344),
    "Laigueglia":       (43.9750, 8.1631),
}

WEEKDAYS = {1:"Mardi",2:"Mercredi",3:"Jeudi",4:"Vendredi",5:"Samedi",6:"Dimanche",7:"Lundi"}
MONTHS = ["janvier","février","mars","avril","mai","juin","juillet","août",
          "septembre","octobre","novembre","décembre"]

def format_date(iso):
    y, m, d = iso.split('-')
    return f"{int(d)} {MONTHS[int(m)-1]}"

def format_range(arrival, departure):
    return f"{format_date(arrival)} → {format_date(departure)}"

def coord(lat, lng):
    return f"{lng},{lat},0"

def stay_description(s):
    parts = []
    nights = s.get('nights', 0)
    parts.append(f"<b>{nights} nuit{'s' if nights > 1 else ''}</b> · {format_range(s['arrival'], s['departure'])}")
    parts.append(f"Statut : {'✅ Réservé' if s['status'] == 'confirmed' else '⏳ À réserver'}")
    if s.get('type'):
        parts.append(f"Type : {s['type'].capitalize()}")
    if s.get('address'):
        parts.append(f"Adresse : {html.escape(s['address'])}")
    if s.get('phone'):
        parts.append(f"Téléphone : {html.escape(s['phone'])}")
    if s.get('host'):
        parts.append(f"Hôte : {html.escape(s['host'])}")
    if s.get('confirmation'):
        parts.append(f"Référence : <code>{html.escape(s['confirmation'])}</code>")
    if s.get('checkin'):
        parts.append(f"Check-in : {html.escape(s['checkin'])}")
    if s.get('checkout'):
        parts.append(f"Check-out : {html.escape(s['checkout'])}")
    if s.get('price'):
        parts.append(f"<b>Prix : {round(float(s['price']))} €</b>")
    pb = s.get('paymentBreakdown') or {}
    if pb.get('paid'):
        parts.append(f"Payé : {round(float(pb['paid']))} €")
    if pb.get('remaining'):
        rem_due = pb.get('remainingDue', '')
        parts.append(f"Reste : {round(float(pb['remaining']))} € — {html.escape(str(rem_due))}")
    if s.get('notes'):
        parts.append(f"<i>{html.escape(s['notes'])}</i>")
    if s.get('listing') and s['listing'].get('url'):
        url = s['listing']['url']
        type_label = {'airbnb':'Airbnb', 'booking':'Booking', 'website':'Site officiel'}.get(s['listing'].get('type'), 'Annonce')
        parts.append(f"<a href='{html.escape(url)}' target='_blank'>↗ Voir sur {type_label}</a>")
    return "<br>".join(parts)

def placemark(name, description, style_url, lat, lng):
    return (
        '<Placemark>\n'
        f'  <name>{html.escape(name)}</name>\n'
        f'  <description><![CDATA[{description}]]></description>\n'
        f'  <styleUrl>{style_url}</styleUrl>\n'
        f'  <Point><coordinates>{coord(lat, lng)}</coordinates></Point>\n'
        '</Placemark>'
    )

def linestring(name, description, style_url, points):
    coords_str = ' '.join(coord(lat, lng) for lat, lng in points)
    return (
        '<Placemark>\n'
        f'  <name>{html.escape(name)}</name>\n'
        f'  <description><![CDATA[{description}]]></description>\n'
        f'  <styleUrl>{style_url}</styleUrl>\n'
        f'  <LineString><tessellate>1</tessellate><coordinates>{coords_str}</coordinates></LineString>\n'
        '</Placemark>'
    )

def generate():
    out = ['<?xml version="1.0" encoding="UTF-8"?>']
    out.append('<kml xmlns="http://www.opengis.net/kml/2.2">')
    out.append('<Document>')
    out.append(f'<name>Slovénie 2026 — Voyage</name>')
    out.append('<description>Road-trip 7-24 juillet 2026 · 2 adultes + 1 ado · 2 962 km · 3 pays</description>')

    # Styles
    out.append('<Style id="confirmed"><IconStyle><scale>1.1</scale><Icon><href>http://maps.google.com/mapfiles/ms/icons/green-dot.png</href></Icon></IconStyle></Style>')
    out.append('<Style id="tbd"><IconStyle><scale>1.1</scale><Icon><href>http://maps.google.com/mapfiles/ms/icons/orange-dot.png</href></Icon></IconStyle></Style>')
    out.append('<Style id="poi"><IconStyle><scale>0.95</scale><Icon><href>http://maps.google.com/mapfiles/ms/icons/yellow-dot.png</href></Icon></IconStyle></Style>')
    # KML color = aabbggrr (alpha, blue, green, red). Coral #e98d58 → AA=ff, BB=58, GG=8d, RR=e9
    out.append('<Style id="route"><LineStyle><color>ff588de9</color><width>4</width></LineStyle></Style>')

    # === Folder 1 : Hébergements ===
    out.append('<Folder><name>Hébergements (9 étapes · 17 nuits)</name>')
    for s in STAYS['stays']:
        if not s.get('coords'):
            continue
        lat, lng = s['coords']
        style = '#confirmed' if s['status'] == 'confirmed' else '#tbd'
        title = s.get('name') or 'À réserver'
        full_name = f"{s['city']} — {title}"
        out.append(placemark(full_name, stay_description(s), style, lat, lng))
    out.append('</Folder>')

    # === Folder 2 : Sites & activités ===
    out.append('<Folder><name>Sites &amp; activités</name>')
    for name, lat, lng, desc in POIS:
        out.append(placemark(name, html.escape(desc), '#poi', lat, lng))
    out.append('</Folder>')

    # === Folder 3 : Itinéraire routier ===
    out.append('<Folder><name>Itinéraire routier (8 trajets)</name>')
    for d in DAYS['days']:
        drive = d.get('drive')
        if not drive:
            continue
        from_c = CITIES.get(drive['from'])
        to_c   = CITIES.get(drive['to'])
        if not from_c or not to_c:
            print(f"Warning: ville inconnue dans {drive}")
            continue
        leg_name = f"J{d['n']} · {drive['from']} → {drive['to']}"
        leg_desc = f"{drive['km']} km · {drive['hours']}<br>{html.escape(d['title'])}"
        out.append(linestring(leg_name, leg_desc, '#route', [from_c, to_c]))
    out.append('</Folder>')

    out.append('</Document>')
    out.append('</kml>')
    return '\n'.join(out)

if __name__ == '__main__':
    kml = generate()
    out_path = ROOT / 'voyage-slovenie-2026.kml'
    out_path.write_text(kml, encoding='utf-8')
    size_kb = out_path.stat().st_size / 1024
    print(f"✓ KML généré : {out_path.name} ({size_kb:.1f} KB)")
