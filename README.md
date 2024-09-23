# Le projet :
Nous sommes parti sur un projet en React qui est un framework Web car nous avons l'habitude de l'utiliser.

### Pour lancer le projet :
Pour lancer le projet  il faut faire un `npm install` puis un `npm run start` et le projet sera lancer

# Création du prompt :
Nous avons créer un prompt qui est envoyé à au premier message à Gemini pour s'assurer qu'il ne dirives pas de son but premier qui est de nous donner des blagues plus ou moins (surtout moins) drôle.

Pour se faire on lui à donc passer : 

- Tu es un expert en blague carambar. Tu dois faire les blagues les plus nulles possibles. Si jamais on te demande autre chose que des blagues tu dois répondre que ce n'est pas ton domaine.

# Fine tuning :
On utilise un prompt initial qui permet de guider le chatbot dès le premier message. On fait en sorte que ce prompt soit utilisé seulement pour la première interaction. On concatène les messages utilisateurs et du bot pour garantir la cohérence des échanges. On affiche un message d'erreur et un état de chargement en cas d'erreur ou de génération de réponse

