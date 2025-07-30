The difference between the function getUserVideos() and the function getUserPriceHistory() is that:

- One of them will only retrieve the videos, and the other one will return the videos plus the payment intent ID.
 
I separated them to avoid fetching too many things for the library display, which doesn't need the Intent ID.