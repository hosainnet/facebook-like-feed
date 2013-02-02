facebook-like-feed
==================

Sometime in January, Facebook's like box social plugin (https://developers.facebook.com/docs/reference/plugins/like-box/) stopped catering for the height attribute and it's now fixed to 300px height unless you tick the Show Faces box.

Since I would like to display a feed at longer height, I decided to make my own.

This is based on the Graph API, so you would need an access token using the following link (supply your app's id and secret key): https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id=APP_ID&client_secret=APP_SECRET
