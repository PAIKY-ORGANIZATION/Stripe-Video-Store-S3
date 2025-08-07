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

## Copy new secret
Also if you generate a new endpoint, it will give you a distinct STRIPE_SIGNING_SECRET for you to update in the environment variables.


# How Stripe handles "carts with multiple items"  
In this project you could have a cart and many products in a cart (handled by React Context, not in any database).

Once you pay, the purchase will be registered in Stripe as a session (payment intent) with many items (line_items)

## How the local Postgres db manages purchased items
In the local Postgres database, successful Stripe sessions are stored as MULTIPLE PURCHASES with the same paymentIntentId. 

### Example:

You add two items the card in the front end pay for them and it'll generate a single payment intent in Stripe but two different 'Purchase' rows in the database.

So we didn't handle the concept of a cart ourselves.


# Oauth
### Next-Auth default Oauth path 
When you register the authorize redirect Uris in your Google Oauth application, always terminated the URI with this path that is default for Next-Auth:
```
<URL>/api/auth/callback/google
```

### Next-Auth base URL
You need to have this environment variable set for next JS to construct things such as the redirect URI for Google to use:

`NEXTAUTH_URL=`

Look at ./config/cloud.env or ./config/local.env for example. 




# What this application can do
## When you first visit the front end
When using a new account, after going to /, most actions and pages should be locked. You first need to create an account through Google OAuth. OAuth should work.

## After signin
1. A user (with email) should be added to the Postgres table 
2. A Stripe CUSTOMER (`cus_`) should be created with the same email as Oauth (to later generate a Stripe session for the same user and keep track of it).
3. The postgres user should be updated with the Stripe customer id. 
4. Now you can purchase a video by either clicking on a button to "Buy now" or you can also add several items to a cart (handled by React Context).

## Once go to Stripe Checkout
When you confirm a checkout, you should be redirected to a checkout page in Stripe, determined by the return value of this function:

generate-stripe-session.ts -> `generateStripeSession()` (`sessionUrl`)


The checkout session that Stripe will read will contain (as metadata) the video IDs of the videos you want to purchase.

Since this application uses Stripe in test mode, you can simulate a successful payment using the following card information:

Card number: 4242424242424242 Expires: 12/34 CVV: 123

Using any random address.

### If your account is new
If your account is new you might be prompted provide an email address. 
### If you had purchased in the past
On any subsequent, the Stripe session should be generated LINKED to your Stripe customer id (`cus_`) (generate-stripe-session.ts -> `customer: user.stripeCustomerId`).

## Webhook receives successful payment:
Stripe should then send an event of a successful session to the route you configured in your Stripe dashboard. This should be mapping this API endpoint:
```
http/://your-app-url.com/api/stripe/webhook
```
Then, in the Postgres-Purchases table, rows will be added (one for each video that you purchased). But, in Stripe, only one successful transaction should have been registered meaning only one payment intent (`pi_`).

The buyer should receive a confirmation email from Brevo.