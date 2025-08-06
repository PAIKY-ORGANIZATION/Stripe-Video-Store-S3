# Run with docker
The .dockerignore file doesn't include the .env file that should be located at config/shared.env

To include your environment variables once you run the docker container:

``` bash 
    # Run from the project root to match the location of the .env file
    docker run --env-file ./config/shared.env -p <port>:3000 -it -d --rm <image_name>
```


# Setup Stripe endpoints (webhooks) ⚠️
The webhook endpoint (app/api/stripe/webhook/route.ts) WILL NOT WORK if you don't register the endpoint on the Stripe dashboard. 

Based on the Public URL of your app, register the endpoint like the following example:
```
http/://your-app-url.com/api/stripe/webhook
```




# How Stripe handles "carts with multiple items"  
In this project you could have a cart and many products in a cart (handled by React Context, not in any database).

Once you pay, the purchase will be registered in Stripe as a session (payment intent) with many items (line_items)

## How the local Postgres db manages purchased items
In the local Postgres database, successful Stripe sessions are stored as MULTIPLE PURCHASES with the same paymentIntentId. 

### Example:

You add two items the card in the front end pay for them and it'll generate a single payment intent in Stripe but two different 'Purchase' rows in the database.

So we didn't handle the concept of a cart ourselves.


# Oauth

