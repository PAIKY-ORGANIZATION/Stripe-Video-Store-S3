# Why not serve the video with a pre-signed URL from AWS?

Because anyone could share that pre-signed URL in the laps it is valid.
Instead, we will act as a proxy, require authentication, and streaming the file ourselves if authentication is met.