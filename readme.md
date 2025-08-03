In this project you could have a card and many products in a cart. Once you paid it the purchase was registered in Stripe as a session with many products but it was stored as multiple purchases with the same paymentIntentId in our database. 

So we didn't handle the concept of a cart ourselves. That gave me some issues.