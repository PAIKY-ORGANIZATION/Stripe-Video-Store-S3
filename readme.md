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

## Copy new secret from Stripe endpoint
Also if you generate a new endpoint, it will give you a distinct STRIPE_SIGNING_SECRET for you to update in the environment variables.


## Object storage (AWS or Hetzner)
If you decide to host this application on AWS, you don't have to specify an environment variable for the S3 endpoint. If you will host it on another cloud that has compatible object (S3) storage, you do need to specify an endpoint for that object storage.


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
2. A Stripe CUSTOMER (`cus_`) should be created with the same email as Oauth (to later generate a Stripe session for the same user and keep track of it)3. The postgres user should be updated with the Stripe customer id. 
4. Now you can purchase a video by either clicking on a button to "Buy now" or you can also add several items to a cart (handled by React Context).

## Once go to Stripe Checkout
When you confirm a checkout, you should be redirected to a checkout page in Stripe, determined by the return value of this function:

generate-stripe-session.ts -> `generateStripeSession()` (`sessionUrl`)


The checkout session that Stripe should read should contain (as metadata) the video IDs of the videos you want to purchase.

Since this application uses Stripe in test mode, you can simulate a successful payment using the following card information:

Card number: 4242424242424242 Expires: 12/34 CVV: 123

Using any random address.

### If your account is new
If your account is new you might be prompted provide an email address. 
### If you had purchased in the past
On any subsequent, the Stripe session should be generated LINKED to your Stripe customer id (`cus_`) (generate-stripe-session.ts -> `customer: user.stripeCustomerId`).

## Webhook receives successful payment:
Stripe should then send a `checkout.session.completed` event to the route you configured in your Stripe dashboard. This should be mapping this API endpoint:
```
http/://your-app-url.com/api/stripe/webhook
```
Then, in the Postgres-Purchases table, rows should be added (one for each video that you purchased). But, in Stripe, only one successful transaction should have been registered meaning only one payment intent (`pi_`).

The buyer should receive a confirmation email from Brevo.

## If you had a failed payment:
Stripe should send a `payment_intent.payment_failed`. The items in Postgres-Purchases should be created too but should have the status of `FAILURE`. You should NOT be able to watch or download the videos because of the status. You should receive a confirmation email from Brevo.


## Immediately after a successful purchase:
You should be redirected to `/success?session_id=<STRIPE SESSION ID>`
To generate the success page we will use the session ID to query Stripe and retrieve the same session that was paid. Then `getRelevantSessionData()` should be ran with that ID to FORMAT information about the session (such as images, items, ect) to be displayed.

## After purchase
1. The purchased video or videos should be in your library.
2. You should be able to watch and download them.
3. To watch or download a video a request should be made to this API at the same time we'll run a `GetObject` command from AWS S3:
```
    GET /api/download-stream-proxy/:videoId
```
4. The purchased videos should not appear in your stor page.

## "Orders and refunds page (`/purchase-history`)"
For every completed Stripe session (NOT EVERY POSTGRES PURCHASE) a row should be displayed allowing you to see the details of the session. A Stripe session can be linked to many postgres purchases.

You should see info. about the purchases as well for the thumbnail for videos.

# Refunds
You can submit refunds by going to `/purchase-history` and clicking on "Request Refund".
If the refund request it's legitimate:
1. A row should be added to the Refunds table with  "solved: false".
2. In the purchases table, the rows associated with the refund should be assigned the refund id of the refund that was just created.


### Approving refunds
Can be done by running the cmd program I made:
```
    npm run cmd
```
By selecting a refund Id, if the refund is legitimate:
1. The Stripe refund should be created and the  customer should receive their funds back. 

In the metadata, the Postgres  refund id should be added (linking to the purchase rows).

2. Stripe should send a `charge.refunded`. The webhook should find the  refund Id in the metadata and:
    1. The Postgres refund should be marked as `solved: true`
    2. The Postgres purchase should be marked as `STATUS: REFUNDED`, invalidating their use.

3. In the `purchase-history` page, the refund row should be marked as "Refunded"
4. The refunded video should be available for purchase again.

# Disputes
To submit a test dispute, you can attempt a purchase with this card number:
```
    4000 0000 0000 0259
```


It should emit a `charge.dispute.created`, meaning that it should run the logic for successful purchases as well. Stripe should right away send another event for a `charge.dispute.created`. Which is the ONLY DISPUTE EVENT that is handled in this application.

1. A `_pi` should be extracted from the received Dispute object.

2. A Postgres Dispute row should be created with the received Dispute ID.

3. The related purchases should be found with the `pi_`, and they should be marked with the status: `DISPUTED`. These purchases should be linked to the Dispute ID. These purchases should be invalidated because of the status (`DISPUTED`).

4. In the `purchase-history` page, the row should be marked as "Disputed ⚠️".

5. The video should be unavailable for purchase.