# Po-Key Dex (get it?)

This project implements a basic infinite scroll with prefetching of the next page to allow for a smooth transition.

The offset for the infinite scroll has been limited to under 30 however you may change the variable to allow for further scrolling.

A global redux cache is used to store the list of pokemon, as well as cache the requests that will be used on multiple pages.

To run this locally you will need to have Node installed.

Run `npm install` in the root directory to install the dependencies and then you can run the app with `npm run dev`.
