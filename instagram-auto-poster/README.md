# Instagram Auto Poster

In this practice, I want to make a bot post cute cat images on Instagram automatically.

## Workflow

create a crontab job to run the works below everyday

1. Fetch free stock photos from https://www.pexels.com
2. post photos and stories every day

## How To Post?

Instagram provide nice public API documentation. However, it has limitations. see [here](https://developers.facebook.com/docs/instagram-api/guides/content-publishing)

Critical limitations for this project:

- Can only be used to publish to business IG User accounts; Creator IG User accounts are not supported.
- Stories are not supported.
- Multi-image posts are not supported.

Instead of documented API, we can use Postman proxy server to capture requests and responses, and document them. 

Inspired by
- [tinder-api-documention](https://gist.github.com/rtt/10403467#file-tinder-api-documentation-md)
- [reverse-engineering-an-api](https://medium.com/better-practices/reverse-engineering-an-api-403fae885303)

### Postman Capturing HTTP requests

Postman provide two methods to capture HTTP requests (also responses can be captured)

- [built-in-proxy](https://learning.postman.com/docs/sending-requests/capturing-request-data/capturing-http-requests/#built-in-proxy)
  - [responses can be captured too!](https://blog.postman.com/capture-responses-using-the-postman-proxy/)
- [Interceptor](https://learning.postman.com/docs/sending-requests/capturing-request-data/interceptor/)

In this project, I use `built-in-proxy` to capture the requests and responses.

### Postman Documentation Generator

see [documenting-your-api](https://learning.postman.com/docs/publishing-your-api/documenting-your-api/)
