# @femtozer/strapi-provider-upload-vercel-blob

**Non-Official** [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) Provider for Strapi Upload

## Installation

```bash
# using yarn
yarn add @femtozer/strapi-provider-upload-vercel-blob

# using npm
npm install @strapi/strapi-provider-upload-vercel-blob --save
```

## Create your Blob store on Vercel

Create a new Blob store on Vercel:

- https://vercel.com/docs/storage/vercel-blob/quickstart#create-a-blob-store

You will need to copy the **`BLOB_READ_WRITE_TOKEN`** that can be found under **`.env.local`** tab, on your store's dashboard.

## Set up the configuration file

Configure the upload provider in **`plugins.js`** file:

```js
module.exports = {
  upload: {
    config: {
      provider: "@femtozer/strapi-provider-upload-vercel-blob",
      providerOptions: {
        vercelBlobReadWriteToken: "<BLOB_READ_WRITE_TOKEN>",
      },
    },
  },
  //...
};
```

## Update the Content Security Policy

First copy the id of your store.
It can be found on the url of your stores's dashboard:
`https://vercel.com/dashboard/stores/blob/store_<STORE_ID>`

Then update **`middlewares.js`** with the following CSP configuration:

```js middlewares.js
module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://<STORE_ID>.public.blob.vercel-storage.com",
            "dl.airtable.com",
            "market-assets.strapi.io",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https:/<STORE_ID>.public.blob.vercel-storage.com",
            "dl.airtable.com",
            "market-assets.strapi.io",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
```
