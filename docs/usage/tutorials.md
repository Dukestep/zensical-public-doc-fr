![ECCC logo](../img_eccc-logo.png)

# Tutoriels

!!! tip "Accéder aux tutoriels"
    Cette page présente les tutoriels disponibles regroupés par standard d'accès aux données : WMS, WCS, OGC API &ndash; Features et données brutes (incluant GRIB2), voir les liens ci-dessous :

## WMS

<div class="grid cards" markdown>

-   :material-animation: **[AniMet du SMC](../msc-animet/index.md)**

    ---

    - [X] Afficher des données sur une carte interactive
    - [X] Créer et partager des animations personnalisées
    - [X] Accéder à des services WMS tiers (CEPMMT, NASA, NOAA, et plus)

-   :material-layers: **[Tutoriel : afficher, interagir et animer des couches WMS dans QGIS](tutorial_WMS_QGIS/)**

    ---

    - [X] Ajouter une connexion WMS/WMTS et une couche
    - [X] Parcourir et changer entre les styles de couche disponibles
    - [X] Déplacer, zoomer et interroger les valeurs de pixel (GetFeatureInfo)
    - [X] Animer la dimension temporelle de la couche

-   :material-web: **[Tutoriel : créer des cartes interactives sur le web avec OpenLayers et Leaflet](tutorial_web-maps/)**

    ---

    - [X] Afficher une couche WMS sur une carte interactive
    - [X] Créer des popups interactifs avec des requêtes sur les entités
    - [X] Animer des couches WMS temporelles

-   :material-language-python: **[Cas d'utilisation : profits anticipés selon la probabilité de précipitations](use-case_arthur/use-case_arthur.md)**

    ---

    - [X] Interroger les services WMS en Python avec OWSLib
    - [X] Effectuer des requêtes pour des lieux et des périodes précises
    - [X] Afficher les résultats sous forme de graphiques et de tableaux

    [:lucide-download: Télécharger le carnet Jupyter](use-case_arthur/use-case_arthur.ipynb){ .md-button .md-button--primary }

</div>

## WCS

<div class="grid cards" markdown>

-   :material-console: **[Utiliser GDAL pour extraire des données du service de couverture Web (WCS) de GeoMet](tutorial_gdal/tutorial_gdal.md)**

    ---

    - [X] Extraire des données matricielles depuis un point d'accès WCS
    - [X] Sauvegarder la sortie sur le disque dans différents formats
    - [X] Reprojeter un fichier matriciel et le convertir en NetCDF
    - [X] Obtenir la valeur à un point de longitude/latitude précis

    [:lucide-download: Télécharger le carnet Jupyter](tutorial_gdal/tutorial_gdal.ipynb){ .md-button .md-button--primary }

</div>

## OGC API &ndash; Features

<div class="grid cards" markdown>

-   :material-earth: **[Accéder et utiliser les données dans le logiciel de bureau QGIS](tutorial_OAFeat_QGIS/)**

    ---

    - [X] Ajouter une connexion WFS/OGC API - Features
    - [X] Construire et filtrer les données avec une requête personnalisée
    - [X] Afficher la couche vectorielle obtenue

-   :material-chart-bar: **[Utiliser OGC API - Features dans Power BI](tutorial_OAFeat_Power-BI/)**

    ---

    - [X] Construire une URL filtrée des Collections des données ouvertes
    - [X] Charger les données hydrométriques en temps réel en CSV dans Power BI
    - [X] Afficher les données sur une carte simple du rapport

-   :material-code-braces: **[Faire des requêtes OGC API - Features à partir de Python avec OWSLib](use-case_oafeat/use-case_oafeat-script.md)**

    ---

    - [X] Étude de cas : suivre les niveaux d'eau aux stations hydrométriques
    - [X] Créer des séries temporelles et cartes interactives
    - [X] Afficher des données de séries temporelles en format graphique et tabulaire

    [:lucide-download: Télécharger le carnet Jupyter](use-case_oafeat/use-case_oafeat-script.ipynb){ .md-button .md-button--primary }

-   :material-table: **[Faire des requêtes OGC API - Features avec VBA dans Excel et R](tutorial_OAFeat_R-Excel/)**

    ---

    - [X] Interroger les observations de la CAS en temps réel à partir du web
    - [X] [Tracer des données à l'aide de R dans RStudio](tutorial_OAFeat_R-Excel.md#exemple-avec-r)
    - [X] [Générer des tableaux et graphiques à l'aide de VBA dans Excel](tutorial_OAFeat_R-Excel.md#exemple-avec-excel)

</div>

## Données brutes

<div class="grid cards" markdown>

-   :material-layers: **[Tutoriel : ajout de fichier brut géospatial dans QGIS](tutorial_raw-data_QGIS/)**

    ---

    - [X] Ajouter des fichiers vectoriels/matriciels téléchargés (Shapefile, GeoJSON, GRIB2, GeoTIFF, NetCDF...)
    - [X] Glisser-déposer des fichiers directement depuis le Datamart du SMC
    - [X] Fonctionne aussi avec les sorties WCS et OGC API - Features

-   :material-file-document-outline: **[Utilisation du format de données GRIB2](../msc-data/readme_grib.md)**

    ---

    - [X] Apprendre la structure du format GRIB2
    - [X] Décoder des fichiers GRIB2 avec GDAL ou wgrib2
    - [X] Visualiser des données GRIB2 avec GEMPAK ou NCL

</div>
