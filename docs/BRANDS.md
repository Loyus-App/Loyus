# Catalogue des enseignes

**Date :** 2026-09-29
**Fichiers :** `assets/brands/brands.json` (manifeste) et `assets/brands/<id>.svg` (logos)
**Sources des logos :** [Brands of the World](https://www.brandsoftheworld.com) et [Wikimedia Commons](https://commons.wikimedia.org) (via Wikidata). Chaque logo est converti en SVG, recadré et optimisé ; ses couleurs sont extraites du fichier.

## Licence : à lire avant de livrer ces logos dans l'app

- **Brands of the World (237 logos)** fait accepter ces conditions à chaque téléchargement : les logos appartiennent à leurs titulaires, ils ne sont fournis que pour un usage **non commercial**, et toute reproduction exige **l'accord exprès du titulaire de la marque**.
- **Wikimedia Commons (138 logos)** : 130 fichiers sont dans le domaine public (logos trop simples pour être protégés par le droit d'auteur). 8 sont sous licence CC BY-SA 4.0 et exigent de citer l'auteur : Cineplexx (Boja02), Hervis (Hervis Sports), McFit (RSG Group), Micromania-Zing (Futurhit12), Repsol (Repsol), Sushi Shop (Sushi Shop), Butlers (BUTLERS GmbH & Co. KG), Pay Less Super Markets (Kroger).
- **Wikipedia (30 logos)** : fichiers hébergés par les éditions de Wikipedia, souvent sous le régime « logo non libre » (usage encyclopédique). Leur licence est indiquée pour chaque logo dans `brands.json`.
- **Sites officiels (33 logos)** : logo SVG repris de l'en-tête ou des données structurées du site de l'enseigne. Tous droits réservés.
- **seeklogo (3 logos)** : téléchargés à la main (le site bloque les téléchargements automatiques et limite leur nombre). Aucune condition d'utilisation publiée.
- **Fournis par toi (1 logos)** : Feuillette.
- **Vectorisés (11 logos)** : l'enseigne ne publie que des images bitmap ; le SVG a été tracé à partir de son logo officiel (drapeau `traced`) : Planet Fitness, Boulangerie Ange, Cineplexx, Marie Blachère, Multipharma, Perfumerías Avenida, Repsol, Sushi Shop, The Perfume Shop, Boulangerie Louise, Class'Croûte.
- Dans tous les cas, un logo reste une **marque déposée** : le domaine public couvre le droit d'auteur, pas le droit des marques. Avant de livrer ces logos dans une version publiée de Loyus, il faut l'accord des enseignes, ou limiter l'app à la couleur et aux initiales de l'enseigne.

## Méthode

1. **Recherche des enseignes :** 12 agents ont passé en revue les catalogues des concurrents (Stocard via les archives du Wayback Machine, Klarna, FidMe, Fidall, SuperCards, Key Ring, Pass2U, Google Wallet) sur 8 zones : France, Belgique-Luxembourg-Suisse, Allemagne-Autriche, Espagne, Portugal, Royaume-Uni-Irlande, États-Unis, Russie. Des agents critiques ont ensuite cherché les enseignes manquantes par marché. Résultat : 1 033 enseignes.
2. **Périmètre :** les enseignes populaires (niveaux 1 et 2) et toutes celles vues chez un concurrent, soit 490. Le nettoyage a retiré les enseignes disparues, celles sans carte présentée en caisse et celles 100 % en ligne. Il reste 498 enseignes.
3. **Logos, Brands of the World :** téléchargement par script, relecture visuelle sur planches, puis 10 agents pour les logos rejetés ou manquants.
5. **Logos, Wikipedia et sites officiels :** pour les enseignes encore sans logo, logo de l'infobox des éditions de Wikipedia (fr, en, de, es, pt, ru), sinon logo SVG de l'en-tête du site officiel (robots.txt respecté). Relecture visuelle de chaque résultat.
6. **Dernière passe :** recherche avec les noms locaux (cyrillique notamment) sur Wikidata, Wikipedia et Commons, analyse plus fine des sites officiels (données structurées, sprites SVG), et 3 logos téléchargés à la main sur seeklogo.
6. **Dernière passe :** recherche avec les noms locaux sur Wikidata, Wikipedia et Commons, analyse plus fine des sites officiels (données structurées, sprites SVG), et 3 logos téléchargés à la main sur seeklogo.
4. **Logos, Wikimedia Commons :** pour les enseignes restées sans logo et les logos contenant une image bitmap, recherche de la fiche Wikidata de l'enseigne (site officiel vérifié), puis du logo en cours (propriété P154), sinon recherche directe dans Commons. Relecture visuelle de chaque résultat.

## Couverture

- **442 enseignes sur 474** ont un logo.
- 24 enseignes présentes uniquement en Russie sont hors périmètre (ni UE ni États-Unis) : elles restent dans `brands.json` avec `outOfScope: true`, sans recherche de logo.
- Les enseignes restantes n'ont de logo SVG exploitable sur aucune des deux sources : elles apparaissent sans logo dans le tableau.

| Marché | Enseignes | Avec logo |
|---|---|---|
| France | 122 | 111 |
| Belgique | 61 | 56 |
| Luxembourg | 23 | 23 |
| Suisse | 62 | 61 |
| Allemagne | 102 | 99 |
| Autriche | 67 | 67 |
| Espagne | 59 | 53 |
| Portugal | 53 | 51 |
| Royaume-Uni | 70 | 67 |
| Irlande | 43 | 41 |
| États-Unis | 128 | 124 |
| Russie | 68 | 44 |
| International | 67 | 63 |

## Enseignes

Popularité : 1 = incontournable national, 2 = courante, 3 = de niche. « Vu chez » liste les apps concurrentes où l'enseigne apparaît.

| Enseigne | Id | Marchés | Catégorie | Programme | Pop. | Logo | Couleur | Vu chez |
|---|---|---|---|---|---|---|---|---|
| 36.6 | `apteka-36-6` | RU | Pharmacie, santé | 36,6 Карта | 2 | [svg](../assets/brands/apteka-36-6.svg) (BOTW) | `#1476C6` | — |
| 7-Eleven | `7-eleven` | US, INT | Carburant, auto | 7Rewards | 1 | [svg](../assets/brands/7-eleven.svg) (BOTW) ⚠︎ white_box | `#49737E` | — |
| A Padaria Portuguesa | `apadariaportuguesa` | PT | Boulangerie | Cartão Padaria Portuguesa | 2 | [svg](../assets/brands/apadariaportuguesa.svg) (Commons) | `#000000` | — |
| A.T.U | `atu` | DE, AT | Carburant, auto | ATU Kundenkarte | 3 | [svg](../assets/brands/atu.svg) (BOTW) | `#E4183A` | Stocard |
| Ace Hardware | `ace-hardware` | US | Bricolage, jardin | Ace Rewards | 2 | [svg](../assets/brands/ace-hardware.svg) (BOTW) ⚠︎ variant | `#EE293D` | — |
| Acme Markets | `acmemarkets` | US | Alimentaire | Acme Markets for U | 2 | [svg](../assets/brands/acmemarkets.svg) (Commons) | `#EF3B39` | — |
| Action | `action` | FR, BE, LU, CH, ES, PT, INT | Maison | Action app / Action Kundenkarte | 3 | [svg](../assets/brands/action.svg) (Commons) | `#001489` | FidMe |
| ADAC | `adac` | DE | Carburant, auto | ADAC Mitgliedskarte | 1 | [svg](../assets/brands/adac.svg) (Commons) | `#FFCF00` | Stocard |
| Adidas | `adidas` | FR, DE, AT, ES, PT, GB, US, INT | Sport | adiClub | 2 | [svg](../assets/brands/adidas.svg) (Commons) | `#000000` | — |
| Adler Modemärkte | `adlermodemarkte` | DE, AT | Mode | Adler Card | 3 | [svg](../assets/brands/adlermodemarkte.svg) (Commons) | `#E6007E` | Stocard |
| Afflelou | `afflelou` | FR, ES, INT | Optique | Carte Afflelou | 2 | [svg](../assets/brands/afflelou.svg) (BOTW) | `#4B1A4D` | — |
| Ahorramas | `ahorramas` | ES | Alimentaire | Tarjeta Ahorramas | 2 | [svg](../assets/brands/ahorramas.svg) (site officiel) | `#F5333F` | — |
| Albert Heijn | `albert-heijn` | BE | Alimentaire | Bonuskaart | 2 | [svg](../assets/brands/albert-heijn.svg) (BOTW) ⚠︎ outdated | `#289EE0` | — |
| Albertsons | `albertsons` | US | Alimentaire | Albertsons for U | 1 | [svg](../assets/brands/albertsons.svg) (BOTW) ⚠︎ white_box | `#231F20` | — |
| Alcampo | `alcampo` | ES | Alimentaire | Club Alcampo | 1 | [svg](../assets/brands/alcampo.svg) (BOTW) | `#ED1C24` | — |
| Alnatura | `alnatura` | DE | Alimentaire | Alnatura Kundenkarte | 3 | [svg](../assets/brands/alnatura.svg) (Commons) | `#B6CD35` | Stocard |
| Amavita | `amavita` | CH | Pharmacie, santé | Amavita Card | 2 | [svg](../assets/brands/amavita.svg) (Commons) | `#E20041` | Stocard |
| AMC Theatres | `amc-theatres` | US | Autre | AMC Stubs | 2 | [svg](../assets/brands/amc-theatres.svg) (BOTW) | `#231F20` | — |
| American Eagle | `american-eagle` | US | Mode | AEO Connected | 2 | [svg](../assets/brands/american-eagle.svg) (BOTW) ⚠︎ outdated, white_box | `#000000` | — |
| Apollo Optik | `apollo-optik` | DE | Optique | Apollo Kundenkarte | 3 | [svg](../assets/brands/apollo-optik.svg) (Commons) | `#004E9E` | Stocard |
| Apteka April | `aprel` | RU | Pharmacie, santé | Karta Aprel | 1 | [svg](../assets/brands/aprel.svg) (seeklogo) | `#3F51B5` | — |
| Apteka.ru | `aptekaru` | RU | Pharmacie, santé | Karta Apteka.ru | 2 | [svg](../assets/brands/aptekaru.svg) (site officiel) | `#1C257B` | — |
| Aral | `aral` | DE | Carburant, auto | Aral Payback / Aral App | 1 | [svg](../assets/brands/aral.svg) (BOTW) | `#00ADEF` | Stocard |
| Arby's | `arbys` | US | Restauration | Arby's Rewards | 2 | [svg](../assets/brands/arbys.svg) (BOTW) | `#D91920` | — |
| Argos | `argos` | GB, IE | Maison | Nectar at Argos / Nectar | 1 | [svg](../assets/brands/argos.svg) (BOTW) | `#EC3424` | Stocard, Klarna, Key Ring |
| Asda | `asda` | GB | Alimentaire | Asda Rewards | 1 | [svg](../assets/brands/asda.svg) (BOTW) | `#71C82E` | Stocard, Klarna, Key Ring |
| Au Bon Pain | `au-bon-pain` | US | Boulangerie | ABP Rewards | 3 | [svg](../assets/brands/au-bon-pain.svg) (Commons) | `#EBAA21` | — |
| Auchan | `auchan` | FR, LU, PT, RU, INT | Alimentaire | Waaoh / Carte Auchan / Cartão Auchan | 1 | [svg](../assets/brands/auchan.svg) (BOTW) | `#E3000A` | FidMe, Fidall |
| AutoZone | `autozone` | US | Carburant, auto | AutoZone Rewards | 2 | [svg](../assets/brands/autozone.svg) (BOTW) | `#F47216` | — |
| Aveve | `aveve` | BE | Bricolage, jardin | Aveve klantenkaart | 2 | [svg](../assets/brands/aveve.svg) (Commons) | `#0994DC` | — |
| Azbuka Vkusa | `azbuka-vkusa` | RU | Alimentaire | Азбука Вкуса Карта | 2 | [svg](../assets/brands/azbuka-vkusa.svg) (BOTW) | `#466D12` | — |
| B&Q | `b-and-q` | GB, IE | Bricolage, jardin | B&Q Club | 1 | [svg](../assets/brands/b-and-q.svg) (BOTW) | `#F47216` | Stocard, Klarna, Key Ring |
| Baby-Walz | `baby-walz` | CH, DE, AT | Enfants | Baby-Walz Club | 3 | [svg](../assets/brands/baby-walz.svg) (Commons) | `#1E70B5` | Stocard |
| Babymarkt | `babymarkt` | DE | Enfants | Babymarkt Kundenkarte | 3 | — | — | Stocard |
| BackWerk | `backwerk` | CH, DE, AT | Boulangerie | BackWerk App | 2 | [svg](../assets/brands/backwerk.svg) (Commons) | `#5A2915` | — |
| Baker's | `bakers` | US | Alimentaire | Baker's Plus Card | 3 | [svg](../assets/brands/bakers.svg) (Commons) | `#FF0000` | Key Ring |
| Banette | `banette` | FR | Boulangerie | Carte Banette | 2 | [svg](../assets/brands/banette.svg) (site officiel) | `#A1242D` | — |
| Barnes & Noble | `barnes-and-noble` | US | Culture, jouets | Barnes & Noble Membership | 1 | [svg](../assets/brands/barnes-and-noble.svg) (BOTW) ⚠︎ outdated | `#537264` | — |
| Bashneft | `bashneft` | RU | Carburant, auto | Bashneft loyalty card | 2 | [svg](../assets/brands/bashneft.svg) (Commons) | `#027E40` | — |
| Basic-Fit | `basicfit` | FR, BE, LU, DE, ES | Autre | Basic-Fit member app | 2 | [svg](../assets/brands/basicfit.svg) (site officiel) | `#EB6800` | — |
| Bass Pro Shops | `bass-pro-shops` | US | Sport | Bass Pro Shops CLUB | 2 | — | — | — |
| Bath & Body Works | `bath-and-body-works` | US | Beauté | My Bath & Body Works Rewards | 2 | [svg](../assets/brands/bath-and-body-works.svg) (Commons) | `#005699` | — |
| Bauhaus | `bauhaus` | CH, DE, AT, ES | Bricolage, jardin | Bauhaus Kundenkarte | 2 | [svg](../assets/brands/bauhaus.svg) (BOTW) | `#EA2427` | Stocard |
| BENU | `benu` | CH | Pharmacie, santé | BENU Kundenkarte | 2 | [svg](../assets/brands/benu.svg) (Commons) | `#1D3276` | — |
| Bertrand | `bertrand` | PT | Culture, jouets | Cartão Bertrand | 2 | [svg](../assets/brands/bertrand.svg) (Commons) | `#F05323` | — |
| Best Buy | `best-buy` | US | High-tech | My Best Buy | 1 | [svg](../assets/brands/best-buy.svg) (BOTW) | `#FFEA2E` | — |
| Bijou Brigitte | `bijou-brigitte` | DE, AT | Mode | Bijou Brigitte Kundenkarte | 3 | [svg](../assets/brands/bijou-brigitte.svg) (Wikipedia) | `#7B7B7B` | Stocard |
| BILLA | `billa` | AT | Alimentaire | Ja! Natürlich / jö Bonus Club / jö Bonus Club | 1 | [svg](../assets/brands/billa.svg) (BOTW) | `#ED1C24` | Stocard, Klarna |
| Biocoop | `biocoop` | FR | Alimentaire | Carte Biocoop | 2 | [svg](../assets/brands/biocoop.svg) (BOTW) | `#004C94` | — |
| Bipa | `bipa` | AT | Beauté | Bipa Card / jö Bonus Club | 1 | [svg](../assets/brands/bipa.svg) (Commons) | `#EC008C` | Stocard |
| BJ's Wholesale Club | `bjs-wholesale-club` | US | Alimentaire | BJ's Membership / BJ's Premier Rewards | 1 | [svg](../assets/brands/bjs-wholesale-club.svg) (BOTW) | `#A7173C` | Key Ring |
| Bonita | `bonita` | DE | Mode | Bonita Club | 3 | [svg](../assets/brands/bonita.svg) (Commons) | `#1E2021` | Stocard |
| Bonpreu Esclat | `bonpreuesclat` | ES | Alimentaire | Targeta Bonpreu Esclat | 2 | [svg](../assets/brands/bonpreuesclat.svg) (Commons) | `#2A5236` | — |
| Boots | `boots` | GB, IE | Pharmacie, santé | Boots Advantage Card / Advantage Card | 1 | [svg](../assets/brands/boots.svg) (BOTW) | `#1B458E` | Stocard, Klarna, Key Ring, Catima |
| Botanic | `botanic` | FR, BE | Bricolage, jardin | Carte Botanic | 3 | — | — | FidMe |
| Boulanger | `boulanger` | FR | High-tech | Carte Boulanger | 1 | [svg](../assets/brands/boulanger.svg) (BOTW) ⚠︎ variant | `#F1471D` | — |
| Boulangerie Ange | `boulangerieange` | FR | Boulangerie | Ange fidélité (app) | 2 | [svg](../assets/brands/boulangerieange.svg) (site officiel) ⚠︎ light_on_dark, traced | `#CAD400` | — |
| Boulangerie Louise | `boulangerie-louise` | FR, BE | Boulangerie | Carte de fidélité Louise | 2 | [svg](../assets/brands/boulangerie-louise.svg) (site officiel) ⚠︎ traced | `#533523` | — |
| BP | `bp` | FR, DE, AT, PT, GB, IE, US, INT | Carburant, auto | BPme Rewards / BP Payback / Driver Rewards | 2 | [svg](../assets/brands/bp.svg) (BOTW) | `#00A650` | Stocard, Key Ring |
| Breuninger | `breuninger` | DE | Grand magasin | Breuninger Card | 3 | [svg](../assets/brands/breuninger.svg) (Commons) | `#8E192A` | Stocard |
| Brico | `brico-be` | BE | Bricolage, jardin | Brico Plan It Card | 2 | [svg](../assets/brands/brico-be.svg) (BOTW) | `#FFF200` | Stocard |
| Brico Dépôt | `brico-depot` | FR, ES, PT, INT | Bricolage, jardin | Carte Brico Dépôt | 2 | [svg](../assets/brands/brico-depot.svg) (BOTW) ⚠︎ variant, white_box | `#EE2C30` | FidMe |
| Bricomarché | `bricomarche` | FR, BE, PT | Bricolage, jardin | Carte Bricomarché | 2 | [svg](../assets/brands/bricomarche.svg) (BOTW) | `#E2001A` | FidMe |
| Bricorama | `bricorama` | FR | Bricolage, jardin | Carte Bricorama | 3 | [svg](../assets/brands/bricorama.svg) (BOTW) | `#FFF200` | FidMe |
| Brioche Dorée | `brioche-doree` | FR | Boulangerie | Carte Brioche Dorée | 2 | [svg](../assets/brands/brioche-doree.svg) (BOTW) ⚠︎ white_box | `#A80C30` | — |
| Bristol | `bristol` | RU | Alimentaire | Бристоль Карта | 2 | [svg](../assets/brands/bristol.svg) (BOTW) | `#15161B` | — |
| Budni | `budni` | DE | Beauté | Budni Kundenkarte | 2 | [svg](../assets/brands/budni.svg) (Commons) | `#1E3E95` | Stocard |
| Burger King | `burger-king` | FR, DE, AT, ES, PT, GB, IE, US, INT | Restauration | Burger King Club / Burger King App / Royal Perks | 1 | [svg](../assets/brands/burger-king.svg) (BOTW) | `#FF8732` | — |
| But | `but` | FR | Maison | Carte But / Carte BUT | 2 | [svg](../assets/brands/but.svg) (Commons) | `#ED1C24` | FidMe |
| Butlers | `butlers` | CH, DE, AT | Maison | Butlers Kundenkarte | 3 | [svg](../assets/brands/butlers.svg) (Commons) | `#000000` | Stocard |
| C&A | `c-and-a` | FR, BE, LU, CH, DE, AT, INT | Mode | C&A Club | 2 | [svg](../assets/brands/c-and-a.svg) (BOTW) | `#222B5E` | Stocard, FidMe |
| Cactus | `cactus` | LU | Alimentaire | Shoppi Card | 1 | [svg](../assets/brands/cactus.svg) (BOTW) ⚠︎ outdated, white_box | `#3DBA67` | Stocard, Catima |
| Caffe Nero | `caffe-nero` | GB, IE | Restauration | Nero Club | 2 | [svg](../assets/brands/caffe-nero.svg) (Commons) | `#CE7502` | Stocard, Key Ring |
| Calzedonia | `calzedonia` | FR, DE, ES, PT, INT | Mode | Calzedonia Club | 2 | [svg](../assets/brands/calzedonia.svg) (BOTW) | `#EC008C` | — |
| Caprabo | `caprabo` | ES | Alimentaire | Club Caprabo | 2 | [svg](../assets/brands/caprabo.svg) (BOTW) ⚠︎ variant | `#51BBED` | Stocard |
| Card Factory | `cardfactory` | GB, IE | Culture, jouets | Card Factory Club | 2 | [svg](../assets/brands/cardfactory.svg) (site officiel) | `#F9E300` | — |
| Carrefour | `carrefour` | FR, BE, ES | Alimentaire | Carte Carrefour / Mon Club Carrefour / Carte Carrefour | 1 | [svg](../assets/brands/carrefour.svg) (BOTW) | `#005BA7` | FidMe, Fidall, Stocard, Klarna |
| Casa del Libro | `casadellibro` | ES | Culture, jouets | Club Casa del Libro | 2 | [svg](../assets/brands/casadellibro.svg) (BOTW) | `#3A3C9C` | — |
| Casino | `casino` | FR | Alimentaire | Carte Casino / Cdiscount Club / Carte Casino | 2 | [svg](../assets/brands/casino.svg) (Commons) ⚠︎ variant | `#006B37` | — |
| Castorama | `castorama` | FR, INT | Bricolage, jardin | Carte Castorama / Касторама Карта | 1 | [svg](../assets/brands/castorama.svg) (BOTW) ⚠︎ variant | `#0E88D3` | FidMe |
| Celio | `celio` | FR, INT | Mode | Celio Club | 2 | [svg](../assets/brands/celio.svg) (BOTW) | `#DA193B` | — |
| Centra | `centra` | IE | Alimentaire | Centra Real Rewards / Centra Card | 2 | [svg](../assets/brands/centra.svg) (BOTW) | `#4757AE` | Stocard |
| Centrakor | `centrakor` | FR | Maison | Carte Centrakor | 2 | [svg](../assets/brands/centrakor.svg) (Wikipedia) | `#23252A` | FidMe |
| Cepsa (Moeve) | `cepsa-moeve` | ES, PT | Carburant, auto | Cartão Moeve / Cepsa Porque Tu Vales | 2 | [svg](../assets/brands/cepsa-moeve.svg) (Commons) | `#047DBA` | — |
| Chevron | `chevron` | US | Carburant, auto | Chevron Texaco Rewards | 2 | [svg](../assets/brands/chevron.svg) (Commons) | `#2FA1D3` | — |
| Chick-fil-A | `chick-fil-a` | US | Restauration | Chick-fil-A One | 1 | [svg](../assets/brands/chick-fil-a.svg) (BOTW) | `#CD202D` | — |
| Chipotle | `chipotle` | US | Restauration | Chipotle Rewards | 2 | [svg](../assets/brands/chipotle.svg) (BOTW) | `#A52D34` | — |
| Christ | `christ` | DE | Mode | Christ Kundenkarte | 3 | [svg](../assets/brands/christ.svg) (Commons) | `#000000` | Stocard |
| CinemaxX | `cinemaxx` | DE | Culture, jouets | CinemaxX Kundenkarte | 2 | [svg](../assets/brands/cinemaxx.svg) (BOTW) | `#EC0B62` | Stocard |
| Cineplexx | `cineplexx` | DE, AT | Culture, jouets | Cineplexx Card | 2 | [svg](../assets/brands/cineplexx.svg) (Commons) ⚠︎ traced | `#E72623` | Stocard |
| Cinesa | `cinesa` | ES | Autre | Cinesa Club / Cinesa Pass | 1 | [svg](../assets/brands/cinesa.svg) (BOTW) | `#231F20` | — |
| Cineworld | `cineworld` | GB, IE | Culture, jouets | Cineworld Unlimited / Meerkat Movies | 2 | [svg](../assets/brands/cineworld.svg) (Commons) ⚠︎ variant | `#000000` | Stocard, Key Ring |
| Circle K | `circle-k` | GB, IE, US, INT | Carburant, auto | Circle K Extra / Inner Circle | 2 | [svg](../assets/brands/circle-k.svg) (BOTW) | `#EE2722` | — |
| Citilink | `citilink` | RU | High-tech | Ситилинк Клубная карта | 2 | [svg](../assets/brands/citilink.svg) (BOTW) ⚠︎ variant | `#00984A` | — |
| City Market | `city-market` | US | Alimentaire | City Market Value Card | 3 | [svg](../assets/brands/city-market.svg) (Commons) | `#EE3124` | Key Ring |
| Class'Croûte | `class-croute` | FR | Boulangerie | Carte Class'Croûte | 3 | [svg](../assets/brands/class-croute.svg) (site officiel) ⚠︎ traced | `#000000` | — |
| Coffee Fellows | `coffeefellows` | DE, AT | Restauration | Coffee Fellows Bonus App | 3 | [svg](../assets/brands/coffeefellows.svg) (Wikipedia) | `#462701` | Stocard |
| Colruyt | `colruyt` | BE | Alimentaire | Xtra | 1 | [svg](../assets/brands/colruyt.svg) (BOTW) | `#F16620` | Stocard, Klarna, Catima |
| Condis | `condis` | ES | Alimentaire | Club Condis | 2 | — | — | — |
| Conforama | `conforama` | FR, ES, PT, INT | Maison | Carte Conforama / Cartão Conforama | 2 | [svg](../assets/brands/conforama.svg) (BOTW) | `#161A65` | — |
| Conrad Electronic | `conrad-electronic` | CH, DE, AT | High-tech | Conrad Kundenkarte | 3 | [svg](../assets/brands/conrad-electronic.svg) (Commons) | `#4281FF` | Stocard |
| Consum | `consum` | ES | Alimentaire | Tarjeta Cooperativista Consum | 1 | [svg](../assets/brands/consum.svg) (BOTW) ⚠︎ low_quality | `#F68912` | Stocard |
| Continente | `continente` | PT | Alimentaire | Cartão Continente | 1 | [svg](../assets/brands/continente.svg) (BOTW) | `#D40817` | — |
| Coop | `coop` | CH, GB | Alimentaire | Supercard / Co-op Membership | 1 | [svg](../assets/brands/coop.svg) (BOTW) | `#F3971C` | Stocard, Klarna, Catima, SuperCards, Key Ring |
| Cora | `cora` | BE, LU | Alimentaire | Carte Cora | 2 | [svg](../assets/brands/cora.svg) (BOTW) | `#ED1E2D` | Stocard, FidMe |
| Corner Bakery Cafe | `corner-bakery` | US | Boulangerie | Corner Bakery Rewards | 3 | [svg](../assets/brands/corner-bakery.svg) (Wikipedia) | `#100F0D` | — |
| Cortefiel | `cortefiel` | ES, PT | Mode | Cortefiel Club | 2 | [svg](../assets/brands/cortefiel.svg) (BOTW) | `#231F20` | — |
| Costa Coffee | `costa-coffee` | GB, IE, INT | Restauration | Costa Club | 1 | [svg](../assets/brands/costa-coffee.svg) (BOTW) | `#86162D` | Stocard, Klarna, Key Ring |
| Costco | `costco` | FR, ES, GB, US, INT | Alimentaire | Costco membership / Costco Membership | 2 | [svg](../assets/brands/costco.svg) (BOTW) | `#BE0024` | Stocard, Klarna, Key Ring |
| Cultura | `cultura` | FR | Culture, jouets | Carte Cultura | 1 | [svg](../assets/brands/cultura.svg) (BOTW) | `#001689` | FidMe |
| Currys | `currys` | GB, IE | High-tech | Currys Perks | 2 | [svg](../assets/brands/currys.svg) (BOTW) | `#EC242D` | Stocard, Key Ring |
| CVS Pharmacy | `cvs` | US | Pharmacie, santé | ExtraCare | 1 | [svg](../assets/brands/cvs.svg) (BOTW) | `#E81F3C` | Google Wallet |
| Dairy Queen | `dairyqueen` | US | Restauration | DQ Rewards | 2 | [svg](../assets/brands/dairyqueen.svg) (BOTW) | `#EE3E42` | — |
| Darty | `darty` | FR, BE | High-tech | Carte Darty / Darty Max / Carte Darty | 1 | [svg](../assets/brands/darty.svg) (BOTW) ⚠︎ outdated, white_box | `#ED1E2D` | — |
| Das Futterhaus | `das-futterhaus` | DE | Animalerie | Futterhaus Kundenkarte | 3 | [svg](../assets/brands/das-futterhaus.svg) (BOTW) | `#EB1D24` | Stocard |
| Decathlon | `decathlon` | FR, BE, LU, CH, DE, AT, ES, PT, GB, INT | Sport | Carte Decathlon / Decathlon Membership | 1 | [svg](../assets/brands/decathlon.svg) (BOTW) | `#364B9B` | Stocard, FidMe, Klarna, Key Ring, Catima, Fidall |
| Dehner | `dehner` | DE, AT | Bricolage, jardin | Dehner Kundenkarte | 3 | [svg](../assets/brands/dehner.svg) (Commons) | `#005837` | Stocard |
| Deichmann | `deichmann` | FR, CH, DE, AT, ES, PT, GB, INT | Mode | Deichmann Club | 2 | [svg](../assets/brands/deichmann.svg) (Commons) | `#008E54` | Stocard |
| Delhaize | `delhaize` | BE, LU | Alimentaire | SuperPlus / Delhaize Plus | 1 | [svg](../assets/brands/delhaize.svg) (BOTW) ⚠︎ white_box | `#100E0D` | Stocard, Klarna, FidMe, Catima |
| denn's Biomarkt | `denns-biomarkt` | DE, AT | Alimentaire | denn's Kundenkarte | 3 | [svg](../assets/brands/denns-biomarkt.svg) (Commons) | `#BDD018` | Stocard |
| Denner | `denner` | CH | Alimentaire | Denner Card / Supercard | 1 | [svg](../assets/brands/denner.svg) (BOTW) | `#ED1C24` | Stocard, Catima |
| Depot | `depot` | DE, AT | Maison | Depot Kundenkarte | 3 | [svg](../assets/brands/depot.svg) (site officiel) | `#053841` | Stocard |
| Detsky Mir | `detsky-mir` | RU | Enfants | Детский мир Клубная карта | 1 | [svg](../assets/brands/detsky-mir.svg) (BOTW) ⚠︎ raster | `#2056AE` | — |
| Deutsche Bahn BahnCard | `bahncard` | DE | Voyage | BahnCard | 1 | [svg](../assets/brands/bahncard.svg) (BOTW) ⚠︎ variant, white_box | `#ED192E` | Stocard |
| Deutschlandcard | `deutschlandcard` | DE | Autre | Deutschlandcard / DeutschlandCard | 1 | [svg](../assets/brands/deutschlandcard.svg) (Commons) | `#56246F` | Stocard, Klarna |
| Di | `di` | BE | Beauté | Di Card | 2 | — | — | — |
| Dia | `dia` | ES | Alimentaire | Club Dia | 1 | [svg](../assets/brands/dia.svg) (BOTW) | `#E31122` | — |
| Dick's Sporting Goods | `dicks-sporting-goods` | US | Sport | ScoreCard | 1 | [svg](../assets/brands/dicks-sporting-goods.svg) (Wikipedia) | `#006554` | — |
| Dillons | `dillons` | US | Alimentaire | Dillons Plus Card | 3 | [svg](../assets/brands/dillons.svg) (Commons) | `#CC1626` | Key Ring |
| Ditsch | `ditsch` | CH, DE | Boulangerie | Ditsch App | 3 | [svg](../assets/brands/ditsch.svg) (site officiel) | `#000000` | — |
| Dixy | `dixy` | RU | Alimentaire | Дикси Клубная карта | 1 | [svg](../assets/brands/dixy.svg) (BOTW) | `#3F2F8F` | — |
| dm | `dm` | CH, DE, AT | Beauté | dm-app / Payback / mein dm | 1 | [svg](../assets/brands/dm.svg) (Commons) | `#143F90` | Stocard, Klarna |
| DNS | `dns` | RU | High-tech | DNS Клубная карта | 1 | [svg](../assets/brands/dns.svg) (Commons) ⚠︎ variant | `#F08B21` | — |
| Do it + Garden | `do-it-garden` | CH | Bricolage, jardin | Cumulus | 2 | [svg](../assets/brands/do-it-garden.svg) (Commons) | `#D07325` | — |
| Dollar General | `dollar-general` | US | Grand magasin | DG Rewards | 2 | [svg](../assets/brands/dollar-general.svg) (BOTW) | `#231F20` | — |
| Domino's Pizza | `dominos` | FR, GB, IE, US, INT | Restauration | Domino's Club / Domino's Rewards | 2 | [svg](../assets/brands/dominos.svg) (BOTW) | `#0090E2` | — |
| Dosenbach | `dosenbach` | CH | Mode | Dosenbach Club | 2 | — | — | — |
| Douglas | `douglas` | FR, BE, CH, DE, AT, ES, PT, INT | Beauté | Douglas Card / Douglas Beauty Card | 2 | [svg](../assets/brands/douglas.svg) (BOTW) ⚠︎ outdated | `#231F20` | Stocard, Klarna, Catima |
| Dropa | `dropa` | CH | Pharmacie, santé | Dropa Kundenkarte | 2 | [svg](../assets/brands/dropa.svg) (Wikipedia) | `#D27E26` | — |
| Druni | `druni` | ES | Beauté | Tarjeta Druni | 1 | [svg](../assets/brands/druni.svg) (site officiel) | `#D33971` | Stocard |
| DSW | `dsw` | US | Mode | DSW VIP Rewards | 2 | [svg](../assets/brands/dsw.svg) (BOTW) | `#231F20` | — |
| Dunelm | `dunelm` | GB | Maison | Dunelm Rewards | 2 | [svg](../assets/brands/dunelm.svg) (Wikipedia) | `#0FAD4B` | — |
| Dunkin' | `dunkin` | US | Restauration | Dunkin' Rewards | 1 | [svg](../assets/brands/dunkin.svg) (BOTW) ⚠︎ outdated, white_box | `#F4711F` | — |
| Dunnes Stores | `dunnes-stores` | GB, IE | Alimentaire | Dunnes ValueClub / ClubCard | 1 | [svg](../assets/brands/dunnes-stores.svg) (Commons) | `#030304` | Stocard, Key Ring |
| Dutch Bros | `dutchbros` | US | Restauration | Dutch Rewards | 2 | [svg](../assets/brands/dutchbros.svg) (Commons) | `#006098` | — |
| E.Leclerc | `e-leclerc` | FR | Alimentaire | Carte E.Leclerc / Cartão Leclerc | 1 | [svg](../assets/brands/e-leclerc.svg) (BOTW) | `#1073B6` | FidMe, Fidall |
| EDEKA | `edeka` | DE | Alimentaire | EDEKA App / DeutschlandCard | 1 | [svg](../assets/brands/edeka.svg) (BOTW) ⚠︎ outdated | `#231F20` | Stocard, Klarna |
| Einstein Bros. Bagels | `einstein-bros` | US | Boulangerie | Shmear Society | 2 | [svg](../assets/brands/einstein-bros.svg) (Wikipedia) | `#F2B826` | — |
| El Corte Inglés | `el-corte-ingles` | ES, PT | Grand magasin | Cartão El Corte Inglés / Tarjeta El Corte Inglés | 2 | [svg](../assets/brands/el-corte-ingles.svg) (BOTW) | `#007F55` | — |
| Eldorado | `eldorado` | RU | High-tech | Эльдорадо Клуб | 2 | [svg](../assets/brands/eldorado.svg) (BOTW) | `#DA1E25` | — |
| Electro Dépôt | `electrodepot` | FR | High-tech | Carte Electro Dépôt | 2 | [svg](../assets/brands/electrodepot.svg) (Wikipedia) | `#FAB31E` | — |
| Engelhorn | `engelhorn` | DE | Grand magasin | Engelhorn Kundenkarte | 3 | [svg](../assets/brands/engelhorn.svg) (Commons) | `#000000` | Stocard |
| Ernsting's family | `ernstings-family` | DE | Mode | Ernsting's family Kundenkarte | 3 | [svg](../assets/brands/ernstings-family.svg) (Commons) ⚠︎ variant | `#E20015` | Stocard |
| Eroski | `eroski` | ES | Alimentaire | Club Eroski | 1 | [svg](../assets/brands/eroski.svg) (BOTW) | `#E10C23` | — |
| Etam | `etam` | FR, INT | Mode | Etam Club | 2 | [svg](../assets/brands/etam.svg) (BOTW) | `#EE243B` | — |
| Exxon Mobil | `exxon-mobil` | US | Carburant, auto | Exxon Mobil Rewards+ | 2 | [svg](../assets/brands/exxon-mobil.svg) (BOTW) | `#ED1C24` | — |
| Famous Footwear | `famousfootwear` | US | Mode | Famous Rewards | 2 | [svg](../assets/brands/famousfootwear.svg) (BOTW) ⚠︎ outdated | `#231F20` | — |
| Farmácias Holon | `holon` | PT | Pharmacie, santé | Cartão Holon | 2 | — | — | — |
| Farmácias Portuguesas | `farmaciasportuguesas` | PT | Pharmacie, santé | Cartão Farmácias Portuguesas | 1 | [svg](../assets/brands/farmaciasportuguesas.svg) (site officiel) | `#006452` | — |
| Feu Vert | `feu-vert` | FR | Carburant, auto | Carte Feu Vert | 2 | [svg](../assets/brands/feu-vert.svg) (BOTW) ⚠︎ variant | `#37A636` | — |
| Feuillette | `feuillette` | FR | Boulangerie | Carte de fidélité Feuillette | 2 | [svg](../assets/brands/feuillette.svg) (fourni) | `#B4A06D` | — |
| Fielmann | `fielmann` | CH, DE, AT | Optique | Fielmann Kundenkarte | 2 | [svg](../assets/brands/fielmann.svg) (BOTW) | `#000000` | Stocard |
| Firmin | `firmin` | FR | Boulangerie | Fidélité Firmin | 3 | — | — | — |
| Five Below | `fivebelow` | US | Grand magasin | Five Beyond | 2 | [svg](../assets/brands/fivebelow.svg) (Commons) | `#065EF0` | — |
| Fix Price | `fix-price` | RU | Autre | Fix Price Карта | 1 | [svg](../assets/brands/fix-price.svg) (Wikipedia) | `#0F4188` | — |
| Fnac | `fnac` | FR, BE, CH, ES, PT, INT | Culture, jouets | Carte Fnac / Fnac Adherent | 2 | [svg](../assets/brands/fnac.svg) (BOTW) ⚠︎ white_box | `#E8AB09` | Stocard, FidMe, Fidall |
| Food Lion | `food-lion` | US | Alimentaire | MVP Card | 2 | [svg](../assets/brands/food-lion.svg) (BOTW) ⚠︎ white_box | `#EE2C30` | — |
| Foot Locker | `foot-locker` | FR, US, INT | Sport | FLX / FLX Rewards | 2 | [svg](../assets/brands/foot-locker.svg) (BOTW) | `#000000` | Key Ring |
| Forum Sport | `forumsport` | ES | Sport | Forum Club | 2 | — | — | — |
| Foster's Hollywood | `fostershollywood` | ES | Restauration | Club Foster's Hollywood | 2 | — | — | — |
| Franprix | `franprix` | FR | Alimentaire | Carte Franprix | 2 | [svg](../assets/brands/franprix.svg) (Commons) | `#EC6237` | — |
| Frasers Plus | `frasersgroupfrasersplus` | GB, IE | Mode | Frasers Plus | 2 | [svg](../assets/brands/frasersgroupfrasersplus.svg) (BOTW) | `#205440` | — |
| Fred Meyer | `fred-meyer` | US | Alimentaire | Fred Meyer Rewards / Fred Meyer Rewards Card | 2 | [svg](../assets/brands/fred-meyer.svg) (Commons) | `#ED1C24` | Key Ring |
| Fressnapf | `fressnapf` | BE, LU, CH, DE, AT, INT | Animalerie | MeinFRESSNAPF | 1 | [svg](../assets/brands/fressnapf.svg) (Commons) | `#00652D` | Stocard, Klarna |
| Fry's Food Stores | `frys-food-stores` | US | Alimentaire | Fry's Shopper's Card | 2 | [svg](../assets/brands/frys-food-stores.svg) (Commons) | `#ED1B24` | Key Ring |
| Gail's | `gails` | GB | Boulangerie | Gail's app | 2 | [svg](../assets/brands/gails.svg) (Wikipedia) | `#CE0E2D` | — |
| Galeria | `galeria` | DE | Grand magasin | Galeria Card / Payback / Kaufhof Card | 2 | [svg](../assets/brands/galeria.svg) (Commons) | `#000000` | Stocard |
| Galeries Lafayette | `galeries-lafayette` | FR | Grand magasin | Carte Galeries Lafayette / Club | 2 | [svg](../assets/brands/galeries-lafayette.svg) (BOTW) | `#ED1C24` | — |
| Galp | `galp` | ES, PT | Carburant, auto | Galp Move / Cartão Galp | 1 | [svg](../assets/brands/galp.svg) (BOTW) | `#00613C` | — |
| GameStop | `gamestop` | US | High-tech | PowerUp Rewards | 1 | [svg](../assets/brands/gamestop.svg) (Commons) | `#EE2A28` | — |
| Gamm Vert | `gamm-vert` | FR | Bricolage, jardin | Carte Gamm Vert | 2 | [svg](../assets/brands/gamm-vert.svg) (BOTW) | `#54A689` | FidMe |
| Gap | `gap` | US | Mode | Gap Good Rewards | 2 | [svg](../assets/brands/gap.svg) (BOTW) | `#0E2954` | — |
| Gazprom Neft | `gazprom-neft` | RU | Carburant, auto | Газпромнефть Бонус | 1 | [svg](../assets/brands/gazprom-neft.svg) (BOTW) | `#336CD1` | — |
| Gerbes | `gerbes` | US | Alimentaire | Gerbes Shopper's Card | 3 | — | — | Key Ring |
| Giant Eagle | `giant-eagle` | US | Alimentaire | Giant Eagle Advantage Card | 2 | [svg](../assets/brands/giant-eagle.svg) (BOTW) | `#ED1C24` | — |
| Giant Food | `giant-food` | US | Alimentaire | Giant Card | 2 | [svg](../assets/brands/giant-food.svg) (BOTW) | `#702877` | — |
| Gifi | `gifi` | FR | Maison | Carte Gifi / Carte GiFi | 2 | [svg](../assets/brands/gifi.svg) (Wikipedia) | `#DB001D` | FidMe |
| Globetrotter | `globetrotter` | DE | Sport | Globetrotter Club | 3 | [svg](../assets/brands/globetrotter.svg) (BOTW) | `#000000` | Stocard |
| Globus | `globus` | CH, DE, RU | Grand magasin | Globus Club / Globus Kundenkarte | 2 | [svg](../assets/brands/globus.svg) (BOTW) | `#ED1C24` | Stocard |
| Globus Baumarkt | `globus-baumarkt` | DE | Bricolage, jardin | Globus Kundenkarte | 3 | [svg](../assets/brands/globus-baumarkt.svg) (Commons) | `#F7A608` | Stocard |
| GNC | `gnc` | US | Pharmacie, santé | myGNC Rewards | 2 | [svg](../assets/brands/gnc.svg) (BOTW) ⚠︎ variant | `#ED1C24` | — |
| Go Sport | `go-sport` | FR | Sport | Carte Go Sport | 2 | [svg](../assets/brands/go-sport.svg) (BOTW) | `#191A21` | — |
| Granier | `granier` | ES, PT | Boulangerie | Granier app | 2 | — | — | — |
| Greggs | `greggs` | GB | Boulangerie | Greggs Rewards | 1 | [svg](../assets/brands/greggs.svg) (BOTW) ⚠︎ variant | `#1461A4` | Stocard, Key Ring |
| Görtz | `goertz` | DE | Mode | Görtz Kundenkarte | 3 | [svg](../assets/brands/goertz.svg) (Commons) | `#000000` | Stocard |
| H&M | `h-and-m` | FR, BE, LU, CH, DE, AT, ES, PT, GB, IE, US, INT | Mode | H&M Member | 1 | [svg](../assets/brands/h-and-m.svg) (BOTW) | `#DB2834` | Stocard, Klarna, Catima, Key Ring, Fidall |
| H-E-B | `h-e-b` | US | Alimentaire | Meal Simple / H-E-B Rewards | 2 | [svg](../assets/brands/h-e-b.svg) (BOTW) ⚠︎ outdated | `#A91938` | — |
| Halfords | `halfords` | GB, IE | Carburant, auto | Halfords Motoring Club / Cycle Club | 2 | [svg](../assets/brands/halfords.svg) (BOTW) ⚠︎ low_quality | `#F8A03D` | Stocard, Key Ring |
| Hannaford | `hannaford` | US | Alimentaire | My Hannaford Rewards | 2 | [svg](../assets/brands/hannaford.svg) (BOTW) | `#ED192D` | — |
| Harps Food Stores | `harps-food-stores` | US | Alimentaire | Harps card | 3 | [svg](../assets/brands/harps-food-stores.svg) (Commons) | `#4F3F45` | Key Ring |
| Harris Teeter | `harris-teeter` | US | Alimentaire | VIC Card | 2 | [svg](../assets/brands/harris-teeter.svg) (BOTW) | `#D22C3E` | — |
| Hellweg | `hellweg` | DE | Bricolage, jardin | Hellweg Kundenkarte | 3 | [svg](../assets/brands/hellweg.svg) (Commons) | `#DE0000` | Stocard |
| Hervis | `hervis` | AT | Sport | Hervis Club | 2 | [svg](../assets/brands/hervis.svg) (Commons) ⚠︎ variant | `#D51317` | Stocard |
| Histoire d'Or | `histoiredor` | FR | Autre | Carte Histoire d'Or | 2 | [svg](../assets/brands/histoiredor.svg) (BOTW) ⚠︎ white_box | `#231F20` | — |
| Holland & Barrett | `holland-and-barrett` | GB, IE, INT | Pharmacie, santé | Rewards for Life | 1 | [svg](../assets/brands/holland-and-barrett.svg) (Wikipedia) | `#00574A` | Stocard, Klarna, Key Ring |
| Homebase | `homebase` | GB | Bricolage, jardin | Nectar at Homebase | 2 | [svg](../assets/brands/homebase.svg) (BOTW) | `#59C134` | Stocard, Klarna, Key Ring |
| Hornbach | `hornbach` | CH, DE, AT, INT | Bricolage, jardin | Hornbach Projektpass / Hornbach Card | 2 | [svg](../assets/brands/hornbach.svg) (BOTW) ⚠︎ outdated | `#F7911A` | Stocard |
| Hubo | `hubo` | BE | Bricolage, jardin | Hubo Card | 2 | [svg](../assets/brands/hubo.svg) (BOTW) | `#F7CD1C` | — |
| Hugendubel | `hugendubel` | DE | Culture, jouets | Hugendubel Kundenkarte | 2 | [svg](../assets/brands/hugendubel.svg) (BOTW) | `#DE1E26` | Stocard |
| Hunkemöller | `hunkemoller` | FR, BE, LU, CH, DE, AT, GB | Mode | Hunkemöller Club | 2 | [svg](../assets/brands/hunkemoller.svg) (BOTW) | `#231F20` | — |
| Hy-Vee | `hy-vee` | US | Alimentaire | Hy-Vee Fuel Saver / Perks | 2 | [svg](../assets/brands/hy-vee.svg) (BOTW) | `#ED192D` | — |
| Iceland | `iceland` | GB, IE | Alimentaire | Iceland Bonus Card / Bonus Card | 2 | [svg](../assets/brands/iceland.svg) (BOTW) | `#ED1D2D` | Stocard, Key Ring |
| ICI Paris XL | `ici-paris-xl` | BE, LU | Beauté | ICI Paris XL Card | 1 | [svg](../assets/brands/ici-paris-xl.svg) (Commons) | `#EC008C` | Stocard, Klarna |
| IKEA | `ikea` | FR, BE, LU, CH, DE, AT, ES, PT, GB, IE, US, INT | Maison | IKEA Family | 1 | [svg](../assets/brands/ikea.svg) (Commons) | `#0058AB` | Stocard, Klarna, FidMe, Catima, Key Ring, Fidall |
| Ile de Beaute | `ile-de-beaute` | RU | Beauté | Иль де Ботэ Карта | 2 | [svg](../assets/brands/ile-de-beaute.svg) (BOTW) | `#6D121F` | — |
| Inno | `inno` | BE | Grand magasin | Inno Card | 2 | [svg](../assets/brands/inno.svg) (BOTW) | `#231F20` | — |
| Interdiscount | `interdiscount` | CH | High-tech | Supercard | 2 | [svg](../assets/brands/interdiscount.svg) (BOTW) | `#ED1C24` | Stocard |
| Interio | `interio` | CH, AT | Maison | Interio Card / Interio Kundenkarte | 3 | [svg](../assets/brands/interio.svg) (BOTW) | `#D72546` | Stocard |
| Intermarché | `intermarche` | FR, BE, PT | Alimentaire | Carte Intermarché / Cartão Intermarché | 1 | [svg](../assets/brands/intermarche.svg) (seeklogo) | `#EB212E` | FidMe, Fidall |
| Intersport | `intersport` | FR, BE, CH, DE, AT, PT, INT | Sport | Carte Intersport / Intersport Club | 2 | [svg](../assets/brands/intersport.svg) (BOTW) ⚠︎ variant | `#254AA5` | Stocard, FidMe |
| Intimissimi | `intimissimi` | FR, DE, ES, PT, INT | Mode | Intimissimi Club | 2 | [svg](../assets/brands/intimissimi.svg) (Commons) | `#000000` | — |
| Jack in the Box | `jackinthebox` | US | Restauration | Jack Pack Rewards | 2 | [svg](../assets/brands/jackinthebox.svg) (Commons) | `#B50A37` | — |
| Jardiland | `jardiland` | FR | Bricolage, jardin | Carte Jardiland | 2 | [svg](../assets/brands/jardiland.svg) (BOTW) | `#FBC707` | FidMe |
| Jay C Food Stores | `jay-c-food-stores` | US | Alimentaire | JayC Shopper's Card | 3 | [svg](../assets/brands/jay-c-food-stores.svg) (Wikipedia) | `#DB2D28` | Key Ring |
| JBC | `jbc` | BE | Mode | JBC Club | 2 | [svg](../assets/brands/jbc.svg) (BOTW) ⚠︎ monochrome | `#231F20` | — |
| JCPenney | `jcpenney` | US | Grand magasin | JCPenney Rewards | 2 | [svg](../assets/brands/jcpenney.svg) (BOTW) | `#DB1E2B` | — |
| JD Sports | `jd-sports` | FR, GB, IE, INT | Sport | JD VIP | 2 | — | — | — |
| Jeff de Bruges | `jeffdebruges` | FR, BE | Alimentaire | Carte de fidélité Jeff de Bruges | 2 | [svg](../assets/brands/jeffdebruges.svg) (BOTW) | `#411C14` | — |
| Jersey Mike's | `jerseymikes` | US | Restauration | Shore Points | 2 | [svg](../assets/brands/jerseymikes.svg) (Commons) | `#134A7C` | — |
| Jewel-Osco | `jewel-osco` | US | Alimentaire | Jewel-Osco Card | 2 | [svg](../assets/brands/jewel-osco.svg) (BOTW) | `#EC3646` | — |
| Jimmy John's | `jimmyjohns` | US | Restauration | Freaky Fast Rewards | 2 | [svg](../assets/brands/jimmyjohns.svg) (BOTW) | `#100F0D` | — |
| John Lewis | `john-lewis` | GB | Grand magasin | My John Lewis | 1 | [svg](../assets/brands/john-lewis.svg) (BOTW) | `#231F20` | Stocard, Klarna, Key Ring |
| JouéClub | `jouclub` | FR | Culture, jouets | Carte JouéClub | 2 | [svg](../assets/brands/jouclub.svg) (seeklogo) | `#2B5EA9` | — |
| Jules | `jules` | FR, BE | Mode | Carte Jules | 2 | [svg](../assets/brands/jules.svg) (BOTW) | `#1D1D1B` | FidMe |
| Jumbo | `jumbo` | CH | Bricolage, jardin | Supercard | 2 | [svg](../assets/brands/jumbo.svg) (BOTW) | `#ED1E24` | Stocard |
| jö Bonus Club | `jo-bonus-club` | AT | Autre | jö Bonus Club | 1 | [svg](../assets/brands/jo-bonus-club.svg) (Commons) | `#D6AB53` | Stocard |
| Kamps | `kamps` | DE | Boulangerie | Kamps App | 2 | [svg](../assets/brands/kamps.svg) (Commons) | `#B70A06` | — |
| Kastner & Öhler | `kastnerandohler` | AT | Grand magasin | K&Ö Card | 3 | [svg](../assets/brands/kastnerandohler.svg) (Commons) | `#A11F1B` | Stocard |
| Kaufland | `kaufland` | DE | Alimentaire | Kaufland Card | 1 | [svg](../assets/brands/kaufland.svg) (BOTW) | `#ED1C24` | Stocard, Klarna |
| KFC | `kfc` | FR, GB, IE, US, INT | Restauration | KFC app / KFC Colonel's Club | 2 | [svg](../assets/brands/kfc.svg) (BOTW) ⚠︎ variant | `#E51B2D` | — |
| Kiabi | `kiabi` | FR, BE, ES, PT, INT | Mode | Carte Kiabi / Kiabi Club | 3 | [svg](../assets/brands/kiabi.svg) (BOTW) ⚠︎ white_box | `#231F20` | FidMe, Stocard, Fidall |
| King Jouet | `king-jouet` | FR | Culture, jouets | Carte King Jouet | 2 | [svg](../assets/brands/king-jouet.svg) (Wikipedia) | `#163D3D` | — |
| King Soopers | `king-soopers` | US | Alimentaire | King Soopers Card / King Soopers Loyalty Card | 2 | [svg](../assets/brands/king-soopers.svg) (BOTW) | `#231F20` | Key Ring |
| Kiwoko | `kiwoko` | ES, PT | Animalerie | Kiwoko Club | 3 | [svg](../assets/brands/kiwoko.svg) (site officiel) | `#CE292C` | Stocard |
| Kohl's | `kohls` | US | Grand magasin | Kohl's Rewards / Kohl's Cash | 1 | [svg](../assets/brands/kohls.svg) (BOTW) ⚠︎ outdated | `#231F20` | — |
| Komus | `komus` | RU | Autre | Komus club card | 2 | [svg](../assets/brands/komus.svg) (site officiel) | `#DA1F2A` | — |
| Krasnoe & Beloe | `krasnoe-i-beloe` | RU | Alimentaire | Красное и Белое Карта | 1 | [svg](../assets/brands/krasnoe-i-beloe.svg) (Wikipedia) | `#BE1010` | — |
| Kroger | `kroger` | US | Alimentaire | Kroger Plus Card / Kroger Plus | 1 | [svg](../assets/brands/kroger.svg) (BOTW) | `#134B97` | Key Ring |
| Kruidvat | `kruidvat` | BE | Pharmacie, santé | Kruidvat Card | 1 | [svg](../assets/brands/kruidvat.svg) (BOTW) | `#D42A44` | Stocard, Klarna |
| Kwik Trip | `kwiktrip` | US | Carburant, auto | Kwik Rewards | 2 | [svg](../assets/brands/kwiktrip.svg) (Commons) | `#D32432` | — |
| L'Atelier Papilles | `atelier-papilles` | FR | Boulangerie | Fidélité L'Atelier Papilles | 3 | — | — | — |
| L'Etoile | `letoile` | RU | Beauté | Л'Этуаль Карта Красоты | 1 | [svg](../assets/brands/letoile.svg) (BOTW) | `#303280` | — |
| La Boucherie | `laboucherie` | FR | Restauration | La Boucherie fidélité | 2 | [svg](../assets/brands/laboucherie.svg) (BOTW) | `#171016` | — |
| La Croissanterie | `la-croissanterie` | FR | Boulangerie | Carte La Croissanterie | 3 | [svg](../assets/brands/la-croissanterie.svg) (Wikipedia) | `#000000` | — |
| La Grande Récré | `la-grande-recre` | FR | Culture, jouets | Carte La Grande Récré | 2 | [svg](../assets/brands/la-grande-recre.svg) (BOTW) | `#12307E` | — |
| La Halle | `la-halle` | FR | Mode | Carte La Halle | 2 | [svg](../assets/brands/la-halle.svg) (BOTW) | `#C8003F` | — |
| La Mie Câline | `la-mie-caline` | FR | Boulangerie | Appli fidélité La Mie Câline | 2 | [svg](../assets/brands/la-mie-caline.svg) (Wikipedia) | `#503529` | — |
| La Tagliatella | `latagliatella` | ES, INT | Restauration | Club La Tagliatella | 2 | — | — | — |
| La Vie Claire | `la-vie-claire` | FR | Alimentaire | Carte La Vie Claire | 3 | [svg](../assets/brands/la-vie-claire.svg) (site officiel) | `#E86610` | FidMe |
| Landi | `landi` | CH | Bricolage, jardin | Landi Kundenkarte | 2 | [svg](../assets/brands/landi.svg) (Commons) | `#00A650` | — |
| Le Fournil de Pierre | `fournil-de-pierre` | FR | Boulangerie | Fidélité Le Fournil de Pierre | 3 | — | — | — |
| Le Pain Quotidien | `le-pain-quotidien` | FR, BE, GB, US, INT | Boulangerie | Le Pain Quotidien rewards | 2 | [svg](../assets/brands/le-pain-quotidien.svg) (site officiel) | `#000000` | — |
| Lenta | `lenta` | RU | Alimentaire | Лента Карта | 1 | [svg](../assets/brands/lenta.svg) (BOTW) | `#25378C` | — |
| Leroy Merlin | `leroy-merlin` | FR, ES, PT, INT | Bricolage, jardin | Carte Leroy Merlin / Cartão Leroy Merlin | 1 | [svg](../assets/brands/leroy-merlin.svg) (BOTW) ⚠︎ outdated | `#66C430` | Stocard, FidMe |
| Libro | `libro` | AT | Culture, jouets | Libro Kundenkarte | 3 | [svg](../assets/brands/libro.svg) (BOTW) | `#DA2D1D` | Stocard |
| Lidl | `lidl` | FR, BE, LU, CH, DE, AT, ES, PT, GB, IE, US, INT | Alimentaire | Lidl Plus | 1 | [svg](../assets/brands/lidl.svg) (BOTW) | `#FFE400` | Stocard, Klarna, FidMe, Fidall, Catima |
| Little Caesars | `littlecaesars` | US | Restauration | Little Caesars Rewards | 2 | [svg](../assets/brands/littlecaesars.svg) (BOTW) | `#231F20` | — |
| Love Republic | `loverepublic` | RU | Mode | Love Republic club card | 2 | [svg](../assets/brands/loverepublic.svg) (BOTW) | `#CBA952` | — |
| Love's Travel Stops | `lovestravelstops` | US | Carburant, auto | Love's Connect | 2 | [svg](../assets/brands/lovestravelstops.svg) (Commons) | `#ED1D24` | — |
| Lowe's | `lowes` | US | Bricolage, jardin | MyLowe's Rewards | 1 | [svg](../assets/brands/lowes.svg) (BOTW) ⚠︎ variant | `#114B8F` | Google Wallet |
| Lowes Foods | `lowes-foods` | US | Alimentaire | Lowes Foods Card / Lowes Foods card | 3 | [svg](../assets/brands/lowes-foods.svg) (Commons) | `#145B1F` | Key Ring |
| Lukoil | `lukoil` | RU | Carburant, auto | Лукойл Лайк Карта | 1 | [svg](../assets/brands/lukoil.svg) (BOTW) | `#231F20` | — |
| M.Video | `m-video` | RU | High-tech | М.Видео Бонусная карта | 1 | [svg](../assets/brands/m-video.svg) (BOTW) ⚠︎ variant | `#ED1C24` | — |
| Macy's | `macys` | US | Grand magasin | Star Rewards | 1 | [svg](../assets/brands/macys.svg) (Commons) | `#E11A2B` | — |
| Magnit | `magnit` | RU | Alimentaire | Магнит Карта лояльности | 1 | [svg](../assets/brands/magnit.svg) (Commons) | `#E30613` | — |
| Maison Kayser | `maison-kayser` | FR, INT | Boulangerie | Fidélité Maison Kayser | 2 | — | — | — |
| Maison Pradier | `maison-pradier` | FR | Boulangerie | Fidélité Maison Pradier | 3 | — | — | — |
| Maisons du Monde | `maisons-du-monde` | FR, BE, DE, ES, INT | Maison | Carte Maisons du Monde | 1 | [svg](../assets/brands/maisons-du-monde.svg) (Commons) | `#393536` | FidMe |
| Mango | `mango` | FR, BE, LU, CH, DE, ES, PT, GB, INT | Mode | Mango Likes You | 1 | [svg](../assets/brands/mango.svg) (BOTW) | `#2E2E2D` | — |
| Manor | `manor` | CH | Grand magasin | Manor Card | 1 | [svg](../assets/brands/manor.svg) (BOTW) | `#ED1C24` | Stocard, Klarna, Catima |
| Maria-Ra | `maria-ra` | RU | Alimentaire | Мария-Ра Карта | 2 | [svg](../assets/brands/maria-ra.svg) (BOTW) | `#00A650` | — |
| Marie Blachère | `marieblachere` | FR | Boulangerie | Carte Marie Blachère | 2 | [svg](../assets/brands/marieblachere.svg) (Wikipedia) ⚠︎ traced | `#701D0F` | — |
| Marionnaud | `marionnaud` | FR, CH, AT, PT | Beauté | Carte Marionnaud / Marionnaud Kundenkarte | 3 | [svg](../assets/brands/marionnaud.svg) (BOTW) | `#5B1845` | Stocard, Fidall |
| Marks & Spencer | `marks-and-spencer` | GB, IE | Grand magasin | Sparks | 1 | [svg](../assets/brands/marks-and-spencer.svg) (Commons) | `#000000` | Stocard, Klarna, Key Ring |
| Matalan | `matalan` | GB | Mode | Matalan Club | 2 | [svg](../assets/brands/matalan.svg) (Commons) | `#AD1E1F` | — |
| Match | `match` | FR, BE, LU | Alimentaire | Carte Match / Carte Match / Smatch | 2 | [svg](../assets/brands/match.svg) (BOTW) | `#E4293B` | Stocard, FidMe |
| Maxi Zoo | `maxi-zoo` | FR, BE, LU, CH, DE, INT | Animalerie | Carte Maxi Zoo / Maxi Zoo Card | 2 | [svg](../assets/brands/maxi-zoo.svg) (site officiel) | `#196428` | Stocard, FidMe |
| Maxidom | `maxidom` | RU | Bricolage, jardin | Karta Maxidom | 2 | [svg](../assets/brands/maxidom.svg) (site officiel) | `#CC0033` | — |
| Maxmat | `maxmat` | PT | Bricolage, jardin | Cartão Maxmat | 2 | [svg](../assets/brands/maxmat.svg) (BOTW) | `#ED1C24` | — |
| Mayersche | `mayersche` | DE | Culture, jouets | Mayersche Kundenkarte | 3 | [svg](../assets/brands/mayersche.svg) (Commons) | `#B8014C` | Stocard |
| McDonald's | `mcdonalds` | FR, DE, AT, ES, PT, GB, IE, US, INT | Restauration | MyMcDonald's / McDonald's App (MyMcDonald's Rewards) | 1 | [svg](../assets/brands/mcdonalds.svg) (Commons) ⚠︎ variant | `#DB0007` | — |
| McFit | `mcfit` | DE | Sport | McFit Mitgliedskarte | 2 | [svg](../assets/brands/mcfit.svg) (Commons) | `#F5E51E` | Stocard |
| MediaMarkt | `mediamarkt` | BE, LU, CH, DE, AT, ES, INT | High-tech | MediaMarkt Club / Cartão MediaMarkt Club | 1 | [svg](../assets/brands/mediamarkt.svg) (BOTW) | `#E71C29` | Stocard, Klarna, Catima |
| Meijer | `meijer` | US | Alimentaire | mPerks | 2 | [svg](../assets/brands/meijer.svg) (BOTW) ⚠︎ outdated | `#D62B3F` | — |
| Melectronics | `melectronics` | CH | High-tech | Cumulus | 2 | [svg](../assets/brands/melectronics.svg) (Commons) | `#163D82` | — |
| Merkur | `merkur` | AT | Alimentaire | jö Bonus Club (Merkur) | 1 | [svg](../assets/brands/merkur.svg) (BOTW) | `#00A48C` | Stocard |
| Metro | `metro` | FR, DE, AT, RU, INT | Alimentaire | Carte Metro / Метро Карта клиента | 2 | [svg](../assets/brands/metro.svg) (Commons) | `#014171` | — |
| Micasa | `micasa` | CH | Maison | Cumulus | 2 | [svg](../assets/brands/micasa.svg) (Commons) | `#008194` | — |
| Michaels | `michaels` | US | Culture, jouets | Michaels Rewards | 2 | [svg](../assets/brands/michaels.svg) (Commons) ⚠︎ variant | `#000000` | — |
| Micromania-Zing | `micromania-zing` | FR | Culture, jouets | Carte Micromania | 2 | [svg](../assets/brands/micromania-zing.svg) (Commons) | `#164194` | — |
| Migrol | `migrol` | CH | Carburant, auto | Cumulus | 2 | [svg](../assets/brands/migrol.svg) (Commons) | `#EF3120` | — |
| Migros | `migros` | CH | Alimentaire | Cumulus | 1 | [svg](../assets/brands/migros.svg) (BOTW) | `#EE5C1E` | Stocard, Klarna, Catima, SuperCards |
| Miles & More | `milesandmore` | CH, DE, AT | Voyage | Miles & More | 3 | [svg](../assets/brands/milesandmore.svg) (Commons) | `#0C2058` | Stocard, Klarna |
| Modalfa | `modalfa` | PT | Mode | Cartão Continente (Sonae) | 2 | [svg](../assets/brands/modalfa.svg) (BOTW) | `#2470A9` | — |
| Monoprix | `monoprix` | FR | Alimentaire | Carte Monoprix / Monop' / Carte Monoprix | 1 | [svg](../assets/brands/monoprix.svg) (Commons) | `#E30613` | — |
| Morrisons | `morrisons` | GB | Alimentaire | More Card | 1 | [svg](../assets/brands/morrisons.svg) (BOTW) | `#00563F` | Stocard, Klarna, Key Ring |
| MPREIS | `mpreis` | AT | Alimentaire | MPREIS Kundenkarte | 3 | [svg](../assets/brands/mpreis.svg) (Commons) | `#ED1C24` | Stocard |
| Mr.Bricolage | `mr-bricolage` | FR, BE | Bricolage, jardin | Carte Mr.Bricolage / Carte Mr. Bricolage | 2 | [svg](../assets/brands/mr-bricolage.svg) (Commons) | `#EB0029` | FidMe |
| Multipharma | `multipharma` | BE | Pharmacie, santé | Multipharma Card | 2 | [svg](../assets/brands/multipharma.svg) (site officiel) ⚠︎ traced | `#7CB827` | — |
| Möbelix | `moebelix` | AT | Maison | Möbelix Kundenkarte | 3 | [svg](../assets/brands/moebelix.svg) (Commons) | `#1F4C79` | Stocard |
| Müller | `mueller` | CH, DE, AT | Beauté | Müller Vorteilskarte | 2 | [svg](../assets/brands/mueller.svg) (Commons) | `#F16426` | Stocard, Klarna |
| Nando's | `nandos` | GB, IE, INT | Restauration | Nando's Rewards | 2 | [svg](../assets/brands/nandos.svg) (BOTW) ⚠︎ variant | `#ED1C24` | — |
| Nature & Découvertes | `natureanddecouvertes` | FR, BE, CH, DE | Culture, jouets | Carte Nature & Découvertes | 2 | [svg](../assets/brands/natureanddecouvertes.svg) (site officiel) | `#215331` | — |
| NaturéO | `natureo` | FR | Alimentaire | Carte NaturéO | 3 | [svg](../assets/brands/natureo.svg) (Commons) | `#B8CE3B` | FidMe |
| Nectar | `nectar` | GB | Alimentaire | Nectar | 1 | [svg](../assets/brands/nectar.svg) (site officiel) | `#631DC2` | Stocard, Klarna, Key Ring, Catima |
| Netto Marken-Discount | `netto-marken-discount` | DE | Alimentaire | Netto App / Deutschlandcard | 2 | [svg](../assets/brands/netto-marken-discount.svg) (Commons) | `#E41D25` | Stocard |
| New Yorker | `new-yorker` | DE, AT | Mode | New Yorker Kundenkarte | 3 | [svg](../assets/brands/new-yorker.svg) (BOTW) | `#ED1C24` | Stocard |
| Next | `next` | GB, IE | Mode | Next Pay / Next Unlimited | 2 | [svg](../assets/brands/next.svg) (BOTW) | `#231F20` | Stocard, Key Ring |
| Nicolas | `nicolas` | FR | Alimentaire | Carte Nicolas | 2 | — | — | — |
| Nike | `nike` | FR, US, INT | Sport | Nike Member | 2 | [svg](../assets/brands/nike.svg) (Commons) | `#000000` | — |
| Nocibé | `nocibe` | FR | Beauté | Carte Nocibé | 2 | [svg](../assets/brands/nocibe.svg) (Commons) ⚠︎ variant | `#E10054` | FidMe |
| Norauto | `norauto` | FR, ES, PT, INT | Carburant, auto | Carte Norauto | 2 | [svg](../assets/brands/norauto.svg) (BOTW) | `#520D4C` | — |
| Nordsee | `nordsee` | DE, AT | Restauration | Nordsee Kundenkarte | 2 | [svg](../assets/brands/nordsee.svg) (Commons) | `#003B78` | Stocard |
| Nordstrom | `nordstrom` | US | Grand magasin | The Nordy Club | 2 | [svg](../assets/brands/nordstrom.svg) (Commons) | `#231F20` | — |
| OBI | `obi` | CH, DE, AT, INT | Bricolage, jardin | Cumulus / OBI App / OBI Kundenkarte / Payback | 1 | [svg](../assets/brands/obi.svg) (BOTW) | `#F36717` | Stocard, Klarna |
| Ochkarik | `ochkarik` | RU | Optique | Ochkarik club card | 2 | [svg](../assets/brands/ochkarik.svg) (site officiel) | `#1794FF` | — |
| Ochsner Sport | `ochsner-sport` | CH | Sport | Ochsner Sport Card | 2 | [svg](../assets/brands/ochsner-sport.svg) (Commons) | `#E90523` | — |
| Octa+ | `octa` | BE | Carburant, auto | Octa+ Card | 2 | — | — | — |
| Office Depot | `office-depot` | US | Autre | OfficeMax/Office Depot Rewards | 2 | [svg](../assets/brands/office-depot.svg) (BOTW) | `#ED1639` | — |
| Okaïdi | `okaidi` | FR, INT | Enfants | Carte Okaïdi | 2 | — | — | — |
| Old Navy | `old-navy` | US | Mode | Navyist Rewards | 2 | [svg](../assets/brands/old-navy.svg) (BOTW) ⚠︎ monochrome, outdated, variant | `#231F20` | — |
| Ollie's Bargain Outlet | `olliesbargainoutlet` | US | Grand magasin | Ollie's Army | 2 | [svg](../assets/brands/olliesbargainoutlet.svg) (site officiel) | `#FF0001` | — |
| OMV | `omv` | DE, AT | Carburant, auto | OMV Mein Bonus / VIVA | 2 | [svg](../assets/brands/omv.svg) (BOTW) | `#0E3463` | Stocard |
| Optic 2000 | `optic-2000` | FR | Optique | Carte Optic 2000 | 2 | [svg](../assets/brands/optic-2000.svg) (BOTW) ⚠︎ white_box | `#231F20` | — |
| Orsay | `orsay` | DE, AT | Mode | Orsay Club | 3 | [svg](../assets/brands/orsay.svg) (Commons) | `#000000` | Stocard |
| Pandora | `pandora` | FR, DE, PT, GB, IE, US, INT | Autre | Pandora Club | 2 | [svg](../assets/brands/pandora.svg) (BOTW) | `#509CDB` | — |
| Panera Bread | `panera-bread` | US | Restauration | MyPanera | 2 | [svg](../assets/brands/panera-bread.svg) (BOTW) | `#667733` | — |
| Panos | `panos` | BE | Boulangerie | Panos card | 2 | [svg](../assets/brands/panos.svg) (Commons) | `#FFCB13` | — |
| Parfümerie Pieper | `parfuemerie-pieper` | DE | Beauté | Pieper Kundenkarte | 3 | — | — | Stocard |
| Pathé Gaumont | `pathe-gaumont` | FR, BE, CH | Autre | Carte Pass Pathé Gaumont | 2 | [svg](../assets/brands/pathe-gaumont.svg) (Wikipedia) ⚠︎ outdated | `#FDC300` | — |
| Patàpain | `patapain` | FR | Boulangerie | Carte Patàpain | 3 | — | — | — |
| Paul | `paul` | FR, INT | Boulangerie | Carte Paul | 2 | [svg](../assets/brands/paul.svg) (site officiel) | `#000000` | — |
| Pay Less Super Markets | `pay-less-super-markets` | US | Alimentaire | Payless Shopper's Card | 3 | [svg](../assets/brands/pay-less-super-markets.svg) (Commons) | `#D8232A` | Key Ring |
| Payback | `payback` | DE, AT | Autre | Payback / PAYBACK | 1 | [svg](../assets/brands/payback.svg) (BOTW) | `#095CA4` | Stocard, Klarna |
| Peek & Cloppenburg | `peek-and-cloppenburg` | DE, AT | Mode | P&C Card | 3 | [svg](../assets/brands/peek-and-cloppenburg.svg) (Commons) | `#002D65` | Stocard |
| Penny | `penny` | DE | Alimentaire | Penny App | 2 | [svg](../assets/brands/penny.svg) (Commons) | `#CD1414` | Stocard |
| Perekrestok | `perekrestok` | RU | Alimentaire | Перекрёсток X5 Клуб | 1 | [svg](../assets/brands/perekrestok.svg) (BOTW) | `#2151A8` | — |
| Perfumerías Avenida | `perfumeriasavenida` | ES | Beauté | Tarjeta Avenida | 2 | [svg](../assets/brands/perfumeriasavenida.svg) (site officiel) ⚠︎ traced | `#006EB8` | — |
| Perfumes & Companhia | `perfumes-e-companhia` | PT | Beauté | Cartão Perfumes & Companhia | 1 | [svg](../assets/brands/perfumes-e-companhia.svg) (site officiel) | `#FD0100` | — |
| Petco | `petco` | US | Animalerie | Vital Care / Pals Rewards | 1 | [svg](../assets/brands/petco.svg) (BOTW) ⚠︎ variant | `#E92229` | — |
| Petit Bateau | `petitbateau` | FR, BE, GB, US | Enfants | Petit Bateau fidélité | 2 | [svg](../assets/brands/petitbateau.svg) (Wikipedia) | `#112351` | — |
| Pets at Home | `pets-at-home` | GB | Animalerie | VIP Club | 1 | [svg](../assets/brands/pets-at-home.svg) (Commons) | `#00AA28` | Stocard, Key Ring |
| PetSmart | `petsmart` | US | Animalerie | Treats Rewards | 1 | [svg](../assets/brands/petsmart.svg) (BOTW) | `#1A67BB` | — |
| Pfister | `pfister` | CH | Maison | Pfister Card | 1 | [svg](../assets/brands/pfister.svg) (BOTW) | `#050301` | — |
| Pharmacie Lafayette | `pharmacie-lafayette` | FR | Pharmacie, santé | Carte Pharmacie Lafayette / Carte | 2 | — | — | — |
| Picard | `picard` | FR | Alimentaire | Carte Picard | 1 | [svg](../assets/brands/picard.svg) (BOTW) | `#26B9F1` | FidMe, Fidall |
| Pilot Flying J | `pilotflyingj` | US | Carburant, auto | myRewards Plus | 2 | [svg](../assets/brands/pilotflyingj.svg) (Wikipedia) | `#CF0A2C` | — |
| Pingo Doce | `pingo-doce` | PT | Alimentaire | Cartão Poupa Mais / Poupa Mais | 1 | [svg](../assets/brands/pingo-doce.svg) (BOTW) | `#71C82D` | — |
| Pizza Express | `pizzaexpress` | GB, IE | Restauration | Club PizzaExpress | 2 | [svg](../assets/brands/pizzaexpress.svg) (BOTW) ⚠︎ white_box | `#2D3393` | — |
| Pizza Hut | `pizza-hut` | FR, PT, GB, IE, US, INT | Restauration | Pizza Hut club / Pizza Hut Clube | 2 | [svg](../assets/brands/pizza-hut.svg) (BOTW) ⚠︎ white_box | `#EC242D` | — |
| Planet Fitness | `planet-fitness` | US | Autre | Planet Fitness Membership | 1 | [svg](../assets/brands/planet-fitness.svg) (Wikipedia) ⚠︎ traced | `#470A68` | — |
| Planeta Zdorovya | `planetazdorovya` | RU | Pharmacie, santé | Karta Planeta Zdorovya | 2 | [svg](../assets/brands/planetazdorovya.svg) (Commons) | `#2AD1C5` | — |
| POCO | `poco` | DE | Maison | POCO Kundenkarte | 3 | [svg](../assets/brands/poco.svg) (Commons) | `#FFD400` | Stocard |
| Podruzhka | `podruzhka` | RU | Beauté | Подружка Карта | 2 | [svg](../assets/brands/podruzhka.svg) (site officiel) | `#EA5093` | — |
| Pomme de Pain | `pomme-de-pain` | FR | Boulangerie | Carte Pomme de Pain | 2 | [svg](../assets/brands/pomme-de-pain.svg) (site officiel) | `#761E48` | — |
| Pret A Manger | `pret-a-manger` | GB, US, INT | Restauration | Pret Club | 3 | [svg](../assets/brands/pret-a-manger.svg) (Commons) | `#98002E` | Stocard, Key Ring |
| Price Chopper / Market 32 | `pricechoppermarket32` | US | Alimentaire | AdvantEdge Rewards | 2 | [svg](../assets/brands/pricechoppermarket32.svg) (BOTW) ⚠︎ outdated | `#2C57AF` | — |
| Promod | `promod` | FR, INT | Mode | Carte Promod | 2 | [svg](../assets/brands/promod.svg) (BOTW) | `#163827` | — |
| Pyaterochka | `pyaterochka` | RU | Alimentaire | Пятёрочка Выручай-карта / X5 Клуб | 1 | [svg](../assets/brands/pyaterochka.svg) (Wikipedia) | `#EB2316` | — |
| QFC | `qfc` | US | Alimentaire | QFC Advantage Card | 2 | [svg](../assets/brands/qfc.svg) (Wikipedia) | `#FFDF1B` | Key Ring |
| QuikTrip | `quiktrip` | US | Carburant, auto | QuikTrip Rewards | 2 | [svg](../assets/brands/quiktrip.svg) (Commons) | `#E70D30` | — |
| RaceTrac | `racetrac` | US | Carburant, auto | RaceTrac Rewards | 2 | [svg](../assets/brands/racetrac.svg) (BOTW) ⚠︎ variant | `#EE2722` | — |
| Ralphs | `ralphs` | US | Alimentaire | Ralphs Rewards / Ralphs Rewards Card | 2 | [svg](../assets/brands/ralphs.svg) (BOTW) | `#231F20` | Key Ring |
| Randalls | `randalls` | US | Alimentaire | Randalls Remarkable Card | 3 | [svg](../assets/brands/randalls.svg) (BOTW) | `#2D4D9C` | Key Ring |
| Regal Cinemas | `regal-cinemas` | US | Autre | Regal Unlimited / Regal Crown Club | 2 | [svg](../assets/brands/regal-cinemas.svg) (Commons) | `#FF6900` | Google Wallet |
| REI | `rei` | US | Sport | REI Co-op Membership | 1 | [svg](../assets/brands/rei.svg) (BOTW) ⚠︎ outdated, white_box | `#6D7F6F` | — |
| Rendez-Vous | `rendez-vous` | RU | Mode | Rendez-Vous Клубная карта | 2 | [svg](../assets/brands/rendez-vous.svg) (site officiel) | `#E31182` | — |
| Reno | `reno` | DE | Mode | Reno Kundenkarte | 3 | [svg](../assets/brands/reno.svg) (Commons) | `#981247` | Stocard |
| Repsol | `repsol` | ES, PT | Carburant, auto | Waylet | 2 | [svg](../assets/brands/repsol.svg) (Commons) ⚠︎ traced | `#001E37` | — |
| REWE | `rewe` | DE | Alimentaire | REWE Bonus / Payback / REWE Bonus / PAYBACK | 1 | [svg](../assets/brands/rewe.svg) (Commons) | `#CC071E` | Stocard, Klarna |
| Rigla | `rigla` | RU | Pharmacie, santé | Ригла Карта | 2 | [svg](../assets/brands/rigla.svg) (BOTW) | `#F79610` | — |
| Rituals | `rituals` | FR, BE, LU, CH, DE, AT, GB, INT | Beauté | Rituals Membership | 2 | [svg](../assets/brands/rituals.svg) (site officiel) | `#756B5E` | Stocard |
| Rodilla | `rodilla` | ES | Restauration | Club Rodilla | 2 | [svg](../assets/brands/rodilla.svg) (BOTW) | `#BB1931` | — |
| Rosneft | `rosneft` | RU | Carburant, auto | Роснефть Семейная команда | 2 | [svg](../assets/brands/rosneft.svg) (BOTW) | `#F0D850` | — |
| Rossmann | `rossmann` | DE | Beauté | Mein Rossmann / Payback / Rossmann Kundenkarte | 1 | [svg](../assets/brands/rossmann.svg) (BOTW) | `#ED1C24` | Stocard, Klarna |
| Rostic's | `rostics` | RU | Restauration | Rostic's app loyalty (ex KFC RU) | 2 | [svg](../assets/brands/rostics.svg) (Commons) | `#161515` | — |
| Runners Point | `runnerspoint` | DE, AT | Sport | Runners Point Club | 3 | [svg](../assets/brands/runnerspoint.svg) (BOTW) | `#059D92` | Stocard |
| s.Oliver | `s-oliver` | CH, DE, AT | Mode | s.Oliver Club | 3 | [svg](../assets/brands/s-oliver.svg) (BOTW) | `#B01419` | Stocard |
| Safeway | `safeway` | US | Alimentaire | Safeway Club Card / Just for U / Safeway Club Card (Carrs Safeway Club Card) | 1 | [svg](../assets/brands/safeway.svg) (BOTW) | `#E22A3A` | Key Ring |
| Sainsbury's | `sainsburys` | GB | Alimentaire | Nectar / Nectar Prices / Nectar | 1 | [svg](../assets/brands/sainsburys.svg) (BOTW) ⚠︎ outdated | `#F36717` | Stocard, Klarna, Key Ring |
| Sam's Club | `sams-club` | US | Alimentaire | Sam's Club Membership | 1 | [svg](../assets/brands/sams-club.svg) (BOTW) ⚠︎ outdated | `#3952A8` | — |
| Saturn | `saturn` | DE, AT | High-tech | Saturn Club | 2 | [svg](../assets/brands/saturn.svg) (Commons) | `#00121F` | Stocard |
| Savers | `savers` | GB | Beauté | Savers Club / Savers Rewards | 2 | — | — | — |
| Screwfix | `screwfix` | GB, IE | Bricolage, jardin | Screwfix Account Card | 2 | [svg](../assets/brands/screwfix.svg) (Commons) | `#00539F` | — |
| Sephora | `sephora` | FR, BE, CH, DE, ES, PT, GB, US, INT | Beauté | Carte Sephora / Beauty Pass / Beauty Pass | 2 | [svg](../assets/brands/sephora.svg) (BOTW) | `#211D1D` | Stocard, Klarna, FidMe, Catima, Fidall |
| Shaw's | `shaws` | US | Alimentaire | Shaw's for U | 2 | — | — | — |
| Shell | `shell` | FR, BE, LU, CH, DE, AT, GB, IE, US, INT | Carburant, auto | Shell ClubSmart / Shell Go+ | 2 | [svg](../assets/brands/shell.svg) (Commons) | `#DD1D21` | Stocard, Catima, Klarna, Key Ring |
| Shop 'n Save | `shop-n-save` | US | Alimentaire | Shop 'n Save Perks Card | 3 | [svg](../assets/brands/shop-n-save.svg) (BOTW) | `#4AB93E` | Key Ring |
| ShopRite | `shoprite` | US | Alimentaire | Price Plus Club | 2 | [svg](../assets/brands/shoprite.svg) (BOTW) | `#ED192D` | — |
| Smith's | `smiths` | US | Alimentaire | Smith's Rewards / Smith's Rewards Card | 2 | [svg](../assets/brands/smiths.svg) (Commons) | `#D31245` | Key Ring |
| Snipes | `snipes` | DE, AT | Mode | Snipes Club | 2 | [svg](../assets/brands/snipes.svg) (Commons) | `#EC6408` | Stocard |
| Sonic Drive-In | `sonicdrivein` | US | Restauration | Sonic Rewards | 2 | [svg](../assets/brands/sonicdrivein.svg) (BOTW) | `#F7D61D` | — |
| Sophie Lebreuilly | `sophie-lebreuilly` | FR | Boulangerie | Carte Sophie Lebreuilly | 3 | [svg](../assets/brands/sophie-lebreuilly.svg) (site officiel) | `#E73C51` | — |
| SPAR | `spar` | BE, AT, GB, IE, RU | Alimentaire | Spar Card / Spar Kundenkarte / Spar App | 1 | [svg](../assets/brands/spar.svg) (BOTW) ⚠︎ white_box | `#007F46` | Stocard, Klarna |
| Specsavers | `specsavers` | GB, IE, INT | Optique | Specsavers Club | 2 | [svg](../assets/brands/specsavers.svg) (BOTW) | `#008C43` | — |
| Sport 2000 | `sport-2000` | FR, AT | Sport | Carte Sport 2000 / Sport 2000 Kundenkarte | 3 | [svg](../assets/brands/sport-2000.svg) (Wikipedia) | `#D2091E` | Stocard |
| Sport Scheck | `sportscheck` | DE | Sport | SportScheck Club | 2 | [svg](../assets/brands/sportscheck.svg) (BOTW) | `#EE7914` | Stocard |
| Sport Zone | `sport-zone` | PT | Sport | Cartão Sport Zone | 1 | [svg](../assets/brands/sport-zone.svg) (BOTW) | `#ED8934` | — |
| Sportmaster | `sportmaster` | RU | Sport | Спортмастер Бонусная карта | 1 | [svg](../assets/brands/sportmaster.svg) (BOTW) | `#3CB269` | — |
| Sports Direct | `sports-direct` | GB, IE | Sport | SportsDirect Rewards | 2 | [svg](../assets/brands/sports-direct.svg) (Wikipedia) | `#ED0000` | Stocard, Key Ring |
| SportXX | `sportxx` | CH | Sport | Cumulus | 2 | [svg](../assets/brands/sportxx.svg) (BOTW) ⚠︎ variant | `#EE392A` | — |
| Springfield | `springfield` | ES, PT | Mode | Cortefiel Club | 2 | [svg](../assets/brands/springfield.svg) (Commons) | `#333333` | — |
| Sprinter | `sprinter` | ES, PT | Sport | Sprinter Club | 3 | [svg](../assets/brands/sprinter.svg) (BOTW) | `#231F20` | Stocard |
| Standaard Boekhandel | `standaard-boekhandel` | BE | Culture, jouets | Standaard Boekhandel Club | 2 | — | — | — |
| Staples | `staples` | PT, US, INT | Autre | Cartão Staples / Staples Rewards | 2 | [svg](../assets/brands/staples.svg) (BOTW) | `#EE2223` | — |
| Starbucks | `starbucks` | FR, BE, LU, CH, DE, AT, ES, PT, GB, IE, US, INT | Restauration | Starbucks Rewards | 2 | [svg](../assets/brands/starbucks.svg) (BOTW) | `#00643C` | Stocard, Klarna, Key Ring |
| Stars Coffee | `starscoffee` | RU | Restauration | Stars Coffee app | 2 | [svg](../assets/brands/starscoffee.svg) (site officiel) | `#573821` | — |
| Stop & Shop | `stop-and-shop` | US | Alimentaire | Stop & Shop Card | 2 | [svg](../assets/brands/stop-and-shop.svg) (BOTW) | `#72177A` | — |
| Subway | `subway` | FR, DE, GB, IE, US, INT | Restauration | Subway MyWay Rewards | 2 | [svg](../assets/brands/subway.svg) (BOTW) ⚠︎ variant | `#FBC707` | — |
| Sun Store | `sun-store` | CH | Pharmacie, santé | Sun Store Card | 2 | [svg](../assets/brands/sun-store.svg) (Wikipedia) | `#E42328` | — |
| Sunlight | `sunlight` | RU | Mode | Sunlight loyalty card | 2 | [svg](../assets/brands/sunlight.svg) (Commons) | `#EF7D00` | — |
| Super U | `super-u` | FR | Alimentaire | Carte U | 1 | [svg](../assets/brands/super-u.svg) (BOTW) | `#23437E` | FidMe |
| Superdrug | `superdrug` | GB, IE | Beauté | Health & Beautycard | 1 | [svg](../assets/brands/superdrug.svg) (Commons) | `#EE008E` | Stocard, Klarna, Key Ring |
| SuperValu | `supervalu` | IE | Alimentaire | Real Rewards / SuperValu Real Rewards | 1 | [svg](../assets/brands/supervalu.svg) (Commons) | `#EA1B23` | Stocard, Key Ring |
| Sushi Shop | `sushishop` | FR, BE, LU, CH, ES, GB | Restauration | Sushi Shop Club | 2 | [svg](../assets/brands/sushishop.svg) (Commons) ⚠︎ traced | `#1B1A15` | — |
| Svyaznoy | `svyaznoy` | RU | High-tech | Svyaznoy Club | 2 | [svg](../assets/brands/svyaznoy.svg) (BOTW) ⚠︎ white_box | `#7B7979` | — |
| Taco Bell | `taco-bell` | US | Restauration | Taco Bell Rewards | 2 | [svg](../assets/brands/taco-bell.svg) (BOTW) | `#2E3192` | — |
| Tally Weijl | `tallyweijl` | BE, LU, CH | Mode | Tally Weijl Club | 2 | [svg](../assets/brands/tallyweijl.svg) (BOTW) | `#EC008C` | — |
| Target | `target` | US | Grand magasin | Target Circle | 1 | [svg](../assets/brands/target.svg) (BOTW) | `#FF3016` | — |
| Tchibo | `tchibo` | CH, DE, AT | Autre | Tchibo Kundenkarte | 2 | [svg](../assets/brands/tchibo.svg) (BOTW) | `#214395` | Stocard |
| tegut | `tegut` | DE | Alimentaire | tegut Kundenkarte | 3 | [svg](../assets/brands/tegut.svg) (BOTW) | `#F14B1C` | Stocard |
| Tesco | `tesco` | GB, IE | Alimentaire | Tesco Clubcard / Clubcard | 1 | [svg](../assets/brands/tesco.svg) (BOTW) | `#ED192D` | Stocard, Klarna, Key Ring, Catima |
| Thalia | `thalia` | CH, DE, AT | Culture, jouets | Thalia Club / Thalia Kundenkarte | 1 | [svg](../assets/brands/thalia.svg) (Commons) | `#015B2F` | Stocard, Klarna |
| The Body Shop | `the-body-shop` | FR, BE, CH, DE, GB, INT | Beauté | Love Your Body Club | 2 | [svg](../assets/brands/the-body-shop.svg) (BOTW) | `#100F0D` | Stocard, Key Ring |
| The Children's Place | `thechildrensplace` | US | Enfants | My Place Rewards | 2 | — | — | — |
| The Home Depot | `home-depot` | US | Bricolage, jardin | Pro Xtra / Home Depot Rewards / Pro Xtra | 1 | [svg](../assets/brands/home-depot.svg) (BOTW) | `#EB7C16` | — |
| The Perfume Shop | `theperfumeshop` | GB, IE | Beauté | Perfume Shop Rewards / Loyalty Card | 2 | [svg](../assets/brands/theperfumeshop.svg) (Wikipedia) ⚠︎ traced | `#D1233E` | — |
| Tim Hortons | `tim-hortons` | ES, GB, US, INT | Boulangerie | Tims Rewards | 2 | [svg](../assets/brands/tim-hortons.svg) (Commons) | `#C8102F` | — |
| TK Maxx | `tk-maxx` | GB, IE, US, INT | Mode | TK Maxx Treasure Card | 2 | [svg](../assets/brands/tk-maxx.svg) (Commons) | `#ED1C2E` | — |
| Tom Thumb | `tom-thumb` | US | Alimentaire | Tom Thumb Reward Card | 3 | [svg](../assets/brands/tom-thumb.svg) (BOTW) | `#3247A0` | Key Ring |
| Tom&Co | `tom-and-co` | FR, BE | Animalerie | Carte Tom&Co / Tom&Co Card | 2 | [svg](../assets/brands/tom-and-co.svg) (BOTW) ⚠︎ white_box | `#F39644` | — |
| toom Baumarkt | `toom` | DE | Bricolage, jardin | toom Card | 2 | [svg](../assets/brands/toom.svg) (Commons) | `#B80718` | Stocard |
| Torfs | `torfs` | BE | Mode | Torfs Club | 2 | — | — | — |
| TotalEnergies | `totalenergies` | FR, BE, INT | Carburant, auto | Club Total / TotalEnergies Club / Total Kundenkarte | 2 | [svg](../assets/brands/totalenergies.svg) (Commons) ⚠︎ variant | `#FF0000` | — |
| Toys R Us | `toys-r-us` | FR, PT, INT | Culture, jouets | Carte Toys R Us / Toys R Us Club | 3 | [svg](../assets/brands/toys-r-us.svg) (BOTW) | `#0060AE` | Stocard |
| Tractor Supply | `tractor-supply` | US | Bricolage, jardin | Neighbor's Club | 2 | [svg](../assets/brands/tractor-supply.svg) (Commons) | `#D20000` | — |
| Truffaut | `truffaut` | FR | Bricolage, jardin | Carte Truffaut | 2 | [svg](../assets/brands/truffaut.svg) (BOTW) | `#185523` | FidMe |
| UGC | `ugc` | FR, BE | Autre | Carte UGC Illimité | 2 | [svg](../assets/brands/ugc.svg) (BOTW) ⚠︎ white_box | `#1F54A9` | — |
| Ulta Beauty | `ulta-beauty` | US | Beauté | Ultamate Rewards | 1 | [svg](../assets/brands/ulta-beauty.svg) (Commons) ⚠︎ outdated | `#231F20` | — |
| Ulybka Radugi | `ulybkaradugi` | RU | Beauté | Karta Ulybka Radugi | 2 | [svg](../assets/brands/ulybkaradugi.svg) (Commons) | `#ED1846` | — |
| V&B | `vandb` | FR, BE | Alimentaire | Carte V and B | 2 | [svg](../assets/brands/vandb.svg) (Wikipedia) | `#010101` | — |
| Victoria's Secret | `victorias-secret` | US | Mode | Victoria's Secret Rewards | 2 | [svg](../assets/brands/victorias-secret.svg) (Commons) | `#010101` | — |
| VIPS | `vips` | ES | Restauration | Club VIPS | 2 | [svg](../assets/brands/vips.svg) (Commons) | `#ED1C2C` | — |
| VkusVill | `vkusvill` | RU | Alimentaire | ВкусВилл Карта | 1 | [svg](../assets/brands/vkusvill.svg) (Commons) | `#2DBE64` | — |
| Vons | `vons` | US | Alimentaire | Vons Club Card | 2 | [svg](../assets/brands/vons.svg) (Commons) | `#ED1C24` | — |
| Waitrose | `waitrose` | GB | Alimentaire | myWaitrose | 1 | [svg](../assets/brands/waitrose.svg) (BOTW) ⚠︎ outdated, variant, white_box | `#231F20` | Stocard, Klarna, Key Ring |
| Walgreens | `walgreens` | US | Pharmacie, santé | myWalgreens | 1 | [svg](../assets/brands/walgreens.svg) (BOTW) | `#E51636` | — |
| Waterstones | `waterstones` | GB, IE | Culture, jouets | Waterstones Plus | 2 | — | — | Stocard, Key Ring |
| Wegmans | `wegmans` | US | Alimentaire | Wegmans Shoppers Club | 2 | [svg](../assets/brands/wegmans.svg) (BOTW) | `#231F20` | — |
| Weis Markets | `weismarkets` | US | Alimentaire | Weis Club Card | 2 | [svg](../assets/brands/weismarkets.svg) (Commons) | `#EE2D2E` | — |
| Weldom | `weldom` | FR | Bricolage, jardin | Carte Weldom | 2 | [svg](../assets/brands/weldom.svg) (BOTW) | `#0B0703` | FidMe |
| Wells | `wells` | PT | Pharmacie, santé | Cartão Wells | 1 | [svg](../assets/brands/wells.svg) (BOTW) | `#00B0C8` | — |
| Wendy's | `wendys` | US | Restauration | Wendy's Rewards | 2 | [svg](../assets/brands/wendys.svg) (BOTW) | `#D1212E` | — |
| Whole Foods Market | `whole-foods-market` | US | Alimentaire | Amazon Prime Rewards | 2 | [svg](../assets/brands/whole-foods-market.svg) (BOTW) | `#231F20` | — |
| Wickes | `wickes` | GB | Bricolage, jardin | Wickes Trade Card / Club | 2 | [svg](../assets/brands/wickes.svg) (Commons) | `#004E9B` | — |
| Wiener Feinbäcker | `wiener-feinbaecker` | DE | Boulangerie | Wiener Feinbäcker App | 3 | — | — | — |
| Worten | `worten` | ES, PT | High-tech | Cartão Worten Resolve | 1 | [svg](../assets/brands/worten.svg) (BOTW) | `#EE3123` | — |
| XXXLutz | `xxxlutz` | DE, AT | Maison | XXXLutz Kundenkarte | 2 | [svg](../assets/brands/xxxlutz.svg) (Commons) | `#E30613` | Stocard |
| Yelmo Cines | `yelmocines` | ES | Autre | Yelmo Club | 2 | — | — | — |
| Yves Rocher | `yves-rocher` | FR, BE, CH, DE, AT, ES, INT | Beauté | Club Yves Rocher / Yves Rocher Club | 2 | [svg](../assets/brands/yves-rocher.svg) (Commons) | `#8A9738` | Stocard, FidMe |
| Zarina | `zarina` | RU | Mode | Karta Zarina | 2 | [svg](../assets/brands/zarina.svg) (BOTW) | `#940A38` | — |
| Zippy | `zippy` | PT | Enfants | Cartão Continente (Sonae) | 2 | [svg](../assets/brands/zippy.svg) (BOTW) | `#99D420` | — |
| ÖAMTC | `oamtc` | AT | Carburant, auto | ÖAMTC Mitgliedskarte | 2 | [svg](../assets/brands/oamtc.svg) (BOTW) | `#FDD804` | Stocard |
| ÖBB Vorteilscard | `oebb-vorteilscard` | AT | Voyage | Vorteilscard | 2 | [svg](../assets/brands/oebb-vorteilscard.svg) (site officiel) ⚠︎ variant | `#ED1834` | Stocard |

## Enseignes de niche non traitées


Les chaînes de boulangerie (catégorie « Boulangerie ») ont été ajoutées à la main le 29/09/2026 : réseaux français (Feuillette, Louise, La Mie Câline, Maison Kayser…) et grandes chaînes de l'UE et des États-Unis.

La recherche a aussi relevé 543 enseignes de niche (popularité 3, sans preuve chez un concurrent). Elles n'ont pas été nettoyées et n'ont pas de logo.

- **France** : Accor, Alinéa, André, Animalis, Armand Thiery, Atol, Aubert, Avia, Babou, Bagelstein, Beauty Success, Besson Chaussures, BHV Marais, Bio c' Bon, Bocage, Body Minute, Bon Marché, Bonobo, Bouygues Telecom, Brice, Brico Cash, Bréal, Buffalo Grill, Bureau Vallée, Cache Cache, Camaïeu, Caroll, Casa, Cash Converters, Cdiscount, CGR Cinémas, Chaussea, Chaussexpo, Cinéville, Class'Croute, Cocci Market, Columbus Café, Courir, Courtepaille, Cuisinella, Cyrillus, Del Arte, Devred, Eram, Esso, Euromaster, Europcar, Exki, Fitness Park, Five Guys, Flunch, Fly, Flying Tiger, Franck Provost, Furet du Nord, Gibert Joseph, Giphar, Grand Frais, Grand Optical, Gémo, Générale d'Optique, Habitat, Hema, Hippopotamus, Hubside Store, IKKS, Institut Guinot, Jacadi, Jean Louis David, Jennyfer, Jysk, Kiko Milano, Kinepolis, Krys, L'Occitane, La Foir'Fouille, La Mie Câline, Leader Price, Lush, Léon de Bruxelles, Marc Orian, Midas, Minelli, MK2, Morgan, Médor et Compagnie, Mégarama, Naf Naf, Natalys, Naturalia, Netto, O'Tacos, Optical Center, Orange, Orchestra, Parashop, Passion Beauté, Picwic, Pimkie, Point P, Point S, Pomme de Pain, Popeyes, Princesse tam.tam, Printemps, Promocash, Quick, Relay, Roady, San Marina, Sergent Major, SFR, Shop Apotheke, Sostrene Grene, Speed Rabbit Pizza, Speedy, Tape à l'Oeil, Thiriet, Twinner, Ultima Beauty, Undiz, Vertbaudet, Women'secret, Zooplus, Zôdio
- **Belgique** : Bio-Planet, Brantano, Dreamland, Gamma, Hans Anders, Krefel, Medi-Market, Okay, Panos, Pearle, Planet Parfum, Q8, Trekpleister, Utopolis, Vanden Borre
- **Luxembourg** : Naturata
- **Suisse** : Agrola, Aligro, Athleticum, Bau+Hobby, Ex Libris, Expert, Franz Carl Weber, Fust, Import Parfumerie, K Kiosk, Kitag, Livique, Loeb, Ochsner Schuhe, Orell Fuessli, Payot, PKZ, Qualipet, Schild, Tamoil, TopPharm, Visilab, Voegele Shoes, Volg
- **Allemagne** : BabyOne, Backwerk, BioCompany, CineStar, Cyberport, DocMorris, Euronics, Flaconi, Hagebau, KiK, L'Osteria, Marktkauf, mea Apotheke, Möbel Höffner, Norma, Osiander, Parfümerie Akzente, Roller, Smyths Toys, Tedi, UCI Kinowelt, Vue
- **Autriche** : Bellaflora, Hartlauer, Leiner
- **Espagne** : AKI, Arenal Perfumerías, Ballenoil, Blanco, Bricomart, Coviran, Decimas, Desigual, Federópticos, Froiz, Gadis, General Optica, Ginos, Imaginarium, Juguettos, Lefties, Masymas, Miscota, Multiópticas, PcComponentes, Petronor, Primor, Prénatal, Renfe, Salsa Jeans, Sfera, Stradivarius, Telepizza, Tezenis, The Phone House, Tiendanimal, Tous, Óptica Universitaria
- **Portugal** : Amanhecer, Bolama, Celeiro, Chicco, Chip7, Cinemas NOS, Decénio, Delta Cafés, Farmácia Saúda, Livraria Almedina, Makro, Meu Super, Moviflor, Notino, Parfois, PCDIGA, Prio, Radio Popular, Recheio, Sacoor Brothers, Tiffosi, Timberland, UCI Cinemas, Vasco da Gama, Vitaminas
- **Royaume-Uni** : Ann Summers, Applegreen, Bella Italia, Blacks, Blackwell's, Booths, Boux Avenue, Budgens, Build-A-Bear Workshop, Burton, CEX, Clarks, Clintons, Costcutter, Cotswold Outdoor, DFS, Dobbies, Dune London, EG On The Move, Ernest Jones, Evans Cycles, Everyman Cinemas, Farmfoods, Fat Face, Feelunique, Flannels, Footasylum, Foyles, Gail's Bakery, GAME, Garden Centre Group, Go Outdoors, H.Samuel, Harrods, Harvester, Harvey Nichols, HMV, Hobbycraft, Hotel Chocolat, House of Fraser, Itsu, Jollyes, Joules, Krispy Kreme, Lakeland, Leon, Lloyds Pharmacy, Londis, Millets, Monsoon, Mothercare, Neal's Yard Remedies, New Look, Nisa, Ocado, Odeon, Office, Optical Express, Papa John's, Pets Corner, Picturehouse, Poundland, Premier Inn, Primark, PureGym, River Island, Robert Dyas, Rowlands Pharmacy, Sally Beauty, Schuh, Selfridges, Showcase Cinemas, Sofology, Space NK, Superdry, Texaco, The Entertainer, The Gym Group, The Range, The Works, Tim Hortons, Toby Carvery, Toolstation, Topshop, Tortilla, Travelodge, Vision Express, Wagamama, Wasabi, Well Pharmacy, White Stuff, WHSmith, Wiggle
- **Irlande** : Arnotts, Bewley's, Brown Thomas, DID Electrical, Easons, Eddie Rocket's, Elverys, Gala Retail, Harvey Norman, Hickey's Pharmacy, Iceland Ireland / Mace, Insomnia Coffee, Life Pharmacy, Maxol, McCabes Pharmacy, Musgrave Marketplace, Omniplex Cinemas, Supermac's, Topaz, Woodie's
- **États-Unis** : Abercrombie & Fitch, Academy Sports + Outdoors, Advance Auto Parts, Alamo Drafthouse, Anytime Fitness, Applebee's, Ashley Furniture, At Home, Banana Republic, Bartell Drugs, Baskin-Robbins, Bed Bath & Beyond, Belk, Big 5 Sporting Goods, Big Y, Bloomingdale's, Bluemercury, Books-A-Million, Boscov's, Brookshire's, Buffalo Wild Wings, Burlington, Buy Buy Baby, Caribou Coffee, Carl's Jr., Carter's, Casey's, Champs Sports, Chili's, Cinemark, Cracker Barrel, Crate & Barrel, Crunch Fitness, Cumberland Farms, Denny's, Dillard's, Discount Tire, Dollar Tree, Duane Reade, Einstein Bros. Bagels, Express, Finish Line, Floor & Decor, Golf Galaxy, Great Clips, Half Price Books, Harbor Freight, Hardee's, Harkins Theatres, Harveys Supermarket, Hibbett Sports, Holiday Stationstores, Hollister, HomeGoods, Hot Topic, IHOP, Ingles Markets, Jamba, Jiffy Lube, Journeys, Justice, Kinney Drugs, Kum & Go, LA Fitness, Lane Bryant, LensCrafters, Levi's, Lucky Supermarkets, Marathon, Marcus Theatres, Mariano's, Martin's Super Markets, Mattress Firm, Menards, Micro Center, Moe's Southwest Grill, Murphy USA, Natural Grocers, Neiman Marcus, Noodles & Company, O'Reilly Auto Parts, Olive Garden, Orangetheory Fitness, Panda Express, Party City, Pavilions, Pearle Vision, Peet's Coffee, Pep Boys, Pet Supplies Plus, Phillips 66, Pick 'n Save, Piggly Wiggly, Pottery Barn, Qdoba, Raising Cane's, Raley's, Rite Aid, Ross Dress for Less, Royal Farms, Ruler Foods, Saks Fifth Avenue, Save Mart, Scheels, Schnucks, Shake Shack, Sheetz, Sherwin-Williams, Smart & Final, Smoothie King, Speedway, Sport Clips, Sportsman's Warehouse, Sprouts Farmers Market, Star Market, Stater Bros., Sunoco, Sweetgreen, The Container Store, The Fresh Market, Tops Markets, Torrid, United Supermarkets, Urban Outfitters, Valero, Visionworks, Vitamin Shoppe, Von Maur, Warby Parker, Wawa, West Elm, Whataburger, Williams Sonoma, Wingstop, Winn-Dixie, Zumiez
- **Russie** : 4 Lapy, Bahetle, Baon, Befree, Bethowen, Bukvoed, Centro, Coffee Way, Cofix, Dodo Pizza, Doktor Stoletov, Eapteka, Ekonika, Finn Flare, Formula Kino, Gulliver Market, Hamleys, Karo, Kinopark, Kotofey, Labirint, Lamoda, Lazurit, Magnolia, Miratorg, Ostin, Ozerki, Ozon, Petrovich, Re:Store, Samokat, Samson-Pharma, Sela, Stroylandiya, Surgutneftegaz, Tatneft, Technopark, TSUM, Vkusno i tochka, Wildberries, Yandex Zapravki, Yarche, Zdravcity, Zolla, Zoozavr
- **International** : Pepco
