# Recherche design — refonte de Loyus

**Date :** 2026-09-28
**Question :** le design de lighthouse-guard convient-il aux utilisateurs d'une app de cartes de fidélité ?
**Méthode :** recherche web (études, avis App Store / Play Store / Trustpilot, forums, issues GitHub de Catima, NN/g, Google Research), lecture du thème et des composants de lighthouse-guard, lecture du code de Loyus sur la branche `chore/expo-58-yarn`.
**Limites :** Reddit et MacRumors ont bloqué l'accès automatisé, leurs fils ne sont connus que par des articles qui les citent. Certains chiffres d'avis viennent d'agrégateurs (Unstar, JustUseApp). Aucune étude publique ne mesure le temps de présentation d'un code en caisse.

## Verdict

**Oui, comme socle. Il faut reprendre le système et changer la mise en scène.**

lighthouse-guard suit les conventions natives d'iOS 26, reste calme et neutre, et partage la stack de Loyus (Expo 58, Unistyles 3). Trois choses doivent changer pour une app de cartes de fidélité :

- **Le socle convient.** Onglets natifs flottants, grands titres, listes groupées façon Réglages, police système, animations sans rebond. Les 30-65 ans reconnaissent ces écrans sans apprentissage.
- **La couleur change de place.** Dans lighthouse-guard, la couleur vient du bloc héros bleu et de l'accent. Dans Loyus, elle doit venir uniquement des tuiles d'enseigne, sur une interface neutre.
- **La caisse avant tout.** Viser un code scannable en 1 tap. Le code reste sur fond blanc même en mode sombre, avec les chiffres en grand. Widgets et raccourcis permettent de l'afficher sans ouvrir l'app.

## Les utilisateurs

Le moment qui compte dure environ cinq secondes, en caisse. L'utilisateur ouvre l'app pendant que la file attend derrière lui, souvent d'une main, parfois sans réseau, face à un scanner qui lit mal les écrans. Tout le reste de l'app est secondaire.

| Chiffre | Constat | Source |
|---|---|---|
| 16 | cartes en moyenne par utilisateur FidMe, dont 4 d'enseignes alimentaires | FidMe, Écran Mobile 2025 |
| 2 / semaine | scans en grande surface alimentaire, 1,5 en enseigne spécialisée | FidMe, Écran Mobile 2025 |
| 62 % | des Français partagent leur carte avec leur famille ou leurs amis | FidMe, Écran Mobile 2025 |
| 86 % | des cartes stockées dans les wallets mobiles sont des cartes de fidélité | Ifop / Captain Wallet, 2024 |
| 42 % | des 50-64 ans connaissent le wallet mobile, contre 71 % des 18-24 ans | Ifop / Captain Wallet, 2024 |
| 49 % | des usages du smartphone se font à une main | Hoober, 1 333 observations |

Autres faits utiles :

- Stocard comptait 47 à 60 M d'utilisateurs selon les sources. En France, 7 M d'utilisateurs ont été touchés par sa fermeture le 31/03/2025.
- Les scanners laser lisent mal les écrans (rétro-éclairage, reflets). Seuls les imageurs 2D sont fiables.
- Les seniors sont 43 % plus lents sur les tâches numériques (NN/g).

**Cible de travail (hypothèse, pas une mesure) :** la personne qui fait les courses du foyer, entre 30 et 65 ans. Elle possède 10 à 20 cartes, en utilise 3 à 5 chaque semaine et en partage certaines avec ses proches. Aucune répartition publique par âge ou par sexe n'existe pour Stocard ou FidMe. Seules des tendances indiquent une part plus forte de femmes parmi les gros détenteurs de cartes (Aquitem 2025).

## Les concurrents

Les avis se ressemblent d'une app à l'autre. Chaque tap ajouté avant le code déclenche des plaintes. Une grille simple et colorée, sans compte, attire les éloges.

### Punis

| App | Repère | Ce qui est reproché |
|---|---|---|
| Klarna (ex-Stocard) | fin en France le 31/03/2025 | Compte obligatoire, cartes perdues pendant la migration, widgets et Apple Watch supprimés, paiement fractionné et shopping partout. Tri alphabétique uniquement, sans tri par usage ni ordre manuel. |
| Google Wallet, refonte 2026 | 1 → 3 taps | Cartes déplacées derrière « Voir plus ». Unstar relève 23 plaintes de blocage en caisse, et 10 utilisateurs ont cru leurs cartes supprimées. |
| Key Ring | 1,8★ · 5 M+ | Plus de 10 secondes avant d'afficher les cartes, écran intermédiaire, cases vides sans logo. Un utilisateur conclut qu'il a fait des captures d'écran de ses codes. |
| FidMe | 4,7★ App Store FR | Bien notée, mais on lui reproche un lancement lent, un « design daté » et des doublons difficiles à distinguer. |

### Récompensés

| App | Repère | Ce qui est apprécié |
|---|---|---|
| SuperCards | 4,7★ · 103 k avis | Pas de compte, pas de pub, grille de 2 colonnes « simple, clean, colorful », import par capture d'écran, widget. On lui reproche l'absence de sauvegarde. |
| Catima | 4,8★ · open source | 100 % hors ligne, zéro tracker. Première alternative à Stocard sur AlternativeTo. On lui reproche une interface peu soignée et un widget limité. |
| Barcodes (iOS) | 4,8★ | Widgets sur l'écran d'accueil et l'écran verrouillé, Apple Watch, iCloud. Les avis la décrivent comme « simple and elegant ». |
| Apple Wallet | iOS 27 | Luminosité au maximum automatique, et désormais scan d'une carte physique. Il est impossible de désactiver la luminosité, ce qui gêne les personnes photosensibles. |

**Les vrais concurrents en 2026** sont l'app Photos, pleine de captures d'écran de codes, et Apple Wallet sous iOS 27. Loyus doit être plus rapide que Photos, mieux rangé que Wallet, et disponible sur Android.

### Demandes les plus votées sur Catima

1. Import de fichiers `.pkpass` (27 votes)
2. Export automatique pour sauvegarde (12)
3. Photos de la carte (11)
4. Wear OS (10)
5. Widget qui affiche le code-barres (9)
6. Synchronisation multi-appareils (8)
7. Verrou par mot de passe (7)
8. Tri par usage (5)

La suggestion par localisation n'a que 2 votes. La localisation est un bonus à activer volontairement, pas un pilier.

## Tendances visuelles 2025-2026

- **Liquid Glass (iOS 26).** NN/g le juge moins lisible : texte sur fond translucide, cibles tactiles rétrécies, mouvement excessif. iOS 27 réduit la transparence par défaut et ajoute un réglage allant de « ultra clear » à « tinted ».
- **Material 3 Expressive.** Selon Google (46 études, plus de 18 000 participants), les éléments clés sont repérés jusqu'à 4 fois plus vite, et les plus de 45 ans rattrapent les plus jeunes. Google recommande de ne pas casser les patterns établis.
- **Premières impressions.** Une faible complexité visuelle et une forte conformité au modèle attendu font juger une interface plus belle dès les premières 17 à 50 ms (Tuch et al., Google Research).
- **Vocabulaire des utilisateurs.** « Moderne et propre » : « simple, clean, colorful », « simple and elegant ». « Encombré » : « noise and levels to go through », « blocky », « design daté ».

Conclusion : une interface neutre et calme, où la couleur vient uniquement des tuiles d'enseigne, dans une grille conforme à ce que proposaient Stocard et Wallet. Le verre reste sur les barres flottantes, jamais derrière un code ou un logo.

## Audit de lighthouse-guard

Sources lues : le thème (`src/theme`), les composants partagés (`src/shared/ui`) et les 10 captures claires et sombres (`docs/screenshots`).

| Élément | Pour Loyus | Pourquoi |
|---|---|---|
| Onglets natifs flottants (`NativeTabs`, Liquid Glass) | Garder | Familiers et gratuits en performance. Ajouter l'onglet de recherche natif (`role="search"`, disponible dans expo-router 58) pour garder la recherche à portée de pouce. Le verre reste sur les barres, jamais derrière un code. |
| Grands titres, listes groupées, pastilles d'icône colorées | Garder | Une interface conforme au modèle attendu est jugée plus belle dès les premières 50 ms. Parfait pour les Réglages de Loyus. |
| Police système et échelle 34 / 28 / 20 / 16 / 13 / 12 | Garder | Corps de texte à 16 pt, rendu natif (SF Pro, Roboto). Loyus descend aujourd'hui à 10-12 px avec Manrope. Garder Manrope pour le logo seulement. |
| Neutres mist, ink, night | Garder | Une interface grise et calme laisse toute la place aux couleurs des enseignes. L'accent cyan `#077589` est déjà proche du teal Loyus `#00535B`. |
| Règles de mouvement, `PressableScale`, haptique | Garder | Animation fonctionnelle, sans rebond, respect de Réduire les animations. Ajouter un retour haptique quand le code s'affiche. |
| Accent personnalisable, icônes d'app alternatives | Garder | Agréable, mais à faire en dernier. Aucun avis d'utilisateur ne le réclame. |
| Tuiles blanches avec petite icône et état | Adapter | Dans Loyus, la tuile est la carte : fond à la couleur de l'enseigne, format carte bancaire (1,586), nom lisible sur la tuile. Sans logo, afficher les initiales, jamais une case vide. |
| Fond « ciel » teinté par l'accent | Adapter | L'atténuer fortement ou le retirer sur l'accueil : une teinte de fond concurrence les couleurs des cartes. |
| Écran de détail : grande icône, état, sélecteur, actions groupées | Adapter | L'écran d'une carte sert à scanner. Il affiche le code sur un panneau blanc, les chiffres en grand et trois actions. Modifier, partager et supprimer passent dans un menu. |
| Bloc héros en dégradé bleu (« Turn all on ») | Retirer | Loyus n'a aucune action globale à mettre en avant, et un grand aplat vif rivalise avec les cartes. Les cartes épinglées prennent cette place. |
| Pastilles d'état, barres de signal, `Orbit`, `PulseRings` | Retirer | Ce vocabulaire décrit du matériel Bluetooth. Une carte de fidélité n'a pas d'état. |
| Onglet FAQ | Retirer | Deux onglets et la recherche suffisent. S'il faut de l'aide, elle se place dans Réglages. |

## Écrans proposés

Les enseignes citées sont fictives.

### Accueil (thème clair)

- Grand titre « Cartes », bouton « + » rond en haut à droite. L'ajout est une action rare, il peut rester en haut.
- Sous le titre : un menu de tri (« Les plus utilisées », « Récentes », « A → Z », « Manuel ») et la bascule grille / liste.
- Section « Épinglées », puis « Toutes · 14 ».
- Grille de 2 colonnes. Chaque tuile est au format carte bancaire (1,586), avec un fond à la couleur de l'enseigne, les initiales en haut à gauche en repli du logo, et le nom en blanc en bas à gauche.
- Un badge « Léa » en haut à droite distingue deux cartes de la même enseigne (surnom ou propriétaire).
- Barre d'onglets flottante : « Cartes » et « Réglages », plus un bouton de recherche rond séparé (onglet natif `role="search"`). La recherche, fréquente, est en bas, à portée de pouce.

### Carte en caisse (thème sombre)

- En haut : bouton fermer à gauche, menu « … » à droite (modifier, partager, épingler, supprimer).
- Pastille à la couleur de l'enseigne, nom de la carte, puis « Carte de Léa · EAN-13 ».
- Panneau **blanc** avec le code noir et sa marge de silence, même en thème sombre, parce que les scanners ne lisent pas les codes inversés.
- Sous le code, les chiffres en grand et en police à chasse fixe (`2 001234 567893`), pour la saisie manuelle par la caissière.
- Trois actions rondes : Pivoter, Copier, Luminosité (active par défaut, désactivable).
- Indication en bas : « Luminosité au maximum, écran maintenu allumé ».

### Sans ouvrir l'app

- Widget d'écran verrouillé avec les 3 cartes choisies par l'utilisateur.
- Control iOS (Centre de contrôle, écran verrouillé, bouton Action) qui ouvre directement le code.
- Sur Android : tuile Réglages rapides et widget.
- Raccourcis sur l'icône de l'app (appui long) : les 3 cartes les plus utilisées.

## À corriger dans le Loyus actuel

Ces problèmes doivent être corrigés quelle que soit la refonte.

| Fichier | Problème |
|---|---|
| `app/(tabs)/index.tsx` | Les favoris affichent un faux niveau « NIVEAU OR » ou « MEMBRE », déduit de `isFavorite`. Le lien « Voir tout » n'a aucune action. |
| `src/ui/components/CardGridTile.tsx` | La tuile montre une abréviation en 10 px à 75 % d'opacité et une icône wifi sans rapport. Le nom, en 12 px, est placé hors de la tuile. |
| `app/(tabs)/_layout.tsx` | Les libellés d'onglets sont écrits en dur en anglais (« Cards », « Search »…), hors i18n. Les onglets sont en JS alors que `NativeTabs` est disponible. |
| Onglet Scan, FAB, état vide | Il existe trois entrées pour ajouter une carte, une action rare. Un seul bouton « + » dans l'en-tête suffit, plus l'état vide. |
| `app/card/[id].tsx` | `StatusBar style="dark"` est forcé même en thème sombre. Le préfixe « CARD » est écrit en dur. La luminosité maximale ne peut pas être désactivée. `useFocusEffect` est importé de `@react-navigation/native`. |
| `src/state/stores/cardStore.ts` | `recordOpen` écrase `updatedAt`, donc on ne distingue pas « modifiée » et « utilisée ». Ajouter `openCount` et `lastOpenedAt` (avec une migration) pour trier par fréquence. |

## Dix principes, classés par impact

Le classement vient de la fréquence et de la gravité des plaintes relevées dans les avis, les forums et les issues Catima.

1. **Un code scannable en 1 tap, en moins de 2 secondes.** L'app s'ouvre sur les cartes, avec les épinglées et les récentes en tête. Aucun écran intermédiaire, aucun verrou par défaut, aucun appel réseau.
2. **Un scan réussi du premier coup.** Code foncé sur fond blanc même en mode sombre, marge de silence, luminosité maximale désactivable, écran maintenu allumé, mode paysage, chiffres en grand et copiables.
3. **Ni compte, ni pub, ni tracking, et le dire.** Afficher ces garanties dans l'onboarding et la fiche store. Le compte obligatoire est le premier motif de départ de Klarna.
4. **L'ordre des cartes reste sous le contrôle de l'utilisateur.** Épinglées, tri par fréquence ou récence, ordre manuel. L'app ne réorganise jamais les cartes sans prévenir.
5. **Accès hors de l'app.** Widgets, Controls iOS, raccourcis sur l'icône, tuile Android. La montre viendra plus tard. Leur suppression chez Klarna a été très critiquée.
6. **Ne jamais perdre une carte, sans compte.** Export et sauvegarde en fichier bien visibles. Partager une carte avec un proche. Importer depuis une capture d'écran pour les anciens de Stocard.
7. **Reconnaître une carte d'un coup d'œil.** Couleur de l'enseigne, nom lisible sur la tuile, initiales si pas de logo. Un surnom ou un propriétaire distingue les doublons.
8. **Ajouter une carte sans effort.** Scan caméra d'abord, import depuis une photo, détection des doublons, photo recto verso et note en option. iOS 27 a relevé les attentes sur ce point.
9. **Lisible et utilisable à une main.** Taille de texte du système respectée, contraste AA, cibles de 44 pt / 48 dp minimum, recherche en bas, retour haptique quand le code s'affiche.
10. **Une esthétique sobre et native.** La couleur est réservée aux cartes. Le verre reste sur les barres flottantes. Aucune promotion dans le parcours.

Localisation, catalogues de promotions et suivi de points restent optionnels ou à exclure : la demande est faible et le coût en confidentialité élevé.

## Plan de refonte

Chaque étape livre une app utilisable. L'ordre suit l'impact des principes ci-dessus.

### Étape 1 — Socle : porter le système de lighthouse-guard

- Tokens, thèmes et composants partagés (`Text`, `ListRow`, `ListSection`, `Button`, `Switch`, `SegmentedControl`, `PressableScale`…).
- `NativeTabs` : Cartes, Réglages, recherche (`role="search"`).
- Police système et échelle typographique.
- Libellés d'onglets passés en i18n.

### Étape 2 — Caisse : accueil et écran de code

- Tuiles d'enseigne au format carte.
- Épinglées, tri par fréquence, récence et ordre manuel.
- `openCount`, `lastOpenedAt` et migration du store.
- Panneau blanc, chiffres en grand, luminosité désactivable.

### Étape 3 — Confiance : ajout, doublons, sauvegarde

- Import depuis une photo ou une capture d'écran.
- Détection des doublons, surnom ou propriétaire.
- Partage d'une carte.
- Onboarding « sans compte, hors ligne ».

### Étape 4 — Hors de l'app : le code en un geste

- Raccourcis sur l'icône : les 3 cartes les plus utilisées.
- Widgets écran d'accueil et écran verrouillé.
- Control iOS, tuile Android.
- Accent personnalisable et icônes d'app alternatives.

## Sources

- [Écran Mobile, interview FidMe (2025)](https://www.ecranmobile.fr/Sophie-DESCARREGA-Fidme-Le-consommateur-Francais-detient-en-moyenne-16-cartes-de-fidelite-digitalisees-dans-son_a77673.html)
- [Ifop / Captain Wallet, via RelationClientMag (2024)](https://www.relationclientmag.fr/Thematique/techno-ux-1256/barometre-etude-2161/Breves/Pres-de-90-des-Fran-ais-sont-inscrits-a-au-461911.htm)
- [Aquitem, fidélité client (2025)](https://www.groupe-aquitem.fr/fidelite-client-des-leviers-qui-evoluent-des-dynamiques-contrastees/)
- [Bitkom, apps des enseignes alimentaires (2024)](https://www.bitkom.org/Presse/Presseinformation/Apps-Lebensmittelhaendlern-beliebter)
- [Journal du Geek, fin de Stocard (2025)](https://www.journaldugeek.com/2025/05/28/7-millions-de-francais-vont-perdre-lacces-a-leurs-cartes-de-fidelite/)
- [Wikipedia DE, Stocard](https://de.wikipedia.org/wiki/Stocard)
- [Choice Community, Stocard remplacé par Klarna](https://choice.community/t/stocard-being-replaced-by-klarna-app/33022)
- [Avis App Store FR de Klarna](https://apps.apple.com/fr/app/klarna-g%C3%A9rez-votre-argent/id1115120118?see-all=reviews)
- [Unstar, refonte Google Wallet (2026)](https://unstar.app/blog/google-wallet-loyalty-cards-hidden-view-more-redesign-reviews-2026)
- [JustUseApp, avis Key Ring](https://justuseapp.com/en/app/372547556/key-ring-reward-cards/reviews)
- [JustUseApp, avis SuperCards](https://justuseapp.com/en/app/6482576688/supercards-store-card/reviews)
- [Avis App Store FR de FidMe](https://apps.apple.com/fr/app/fidme-carte-de-fid%C3%A9lit%C3%A9-promos/id391329324?see-all=reviews&platform=iphone)
- [AlternativeTo, alternatives à Stocard](https://alternativeto.net/software/stocard/)
- [Catima, issues GitHub](https://github.com/CatimaLoyalty/Android/issues)
- [Barcodes sur l'App Store](https://apps.apple.com/us/app/barcodes/id1610894014)
- [Apple Community, luminosité d'Apple Wallet](https://discussions.apple.com/thread/255566023)
- [MacRumors, Apple Wallet dans iOS 27](https://www.macrumors.com/2026/06/10/ios-27-new-apple-wallet-features/)
- [MacRumors, Liquid Glass dans iOS 27](https://www.macrumors.com/2026/06/10/how-liquid-glass-is-changing-in-ios-27/)
- [NN/g, QR code guidelines (2024)](https://www.nngroup.com/articles/qr-code-guidelines/)
- [NN/g, Liquid Glass (2025)](https://www.nngroup.com/articles/liquid-glass/)
- [NN/g, usability for seniors](https://www.nngroup.com/articles/usability-for-senior-citizens/)
- [Hoober, How we hold our gadgets](https://alistapart.com/article/how-we-hold-our-gadgets/)
- [Google Design, M3 Expressive research](https://design.google/library/expressive-material-design-google-research)
- [Tuch et al., complexité visuelle et prototypicalité](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/)
- [Apple, WidgetKit Controls](https://developer.apple.com/documentation/widgetkit/creating-controls-to-perform-actions-across-the-system)
- [ID123, scanners et écrans de téléphone](https://www.id123.io/blog/barcode-scanners-phone-screens/)
