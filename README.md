# UI-Test

## Getting Started

1. Clone this repo and have yarn installed on your machine
2. On a terminal, go to the root folder and run `yarn install`
3. create a .env file (copy .example.env and fill in the gaps) inside the root folder and set an enviroment variable called REACT_APP_USE_FIREBASE as true (literally just true. No quotes needed). If this is skipped or if REACT_APP_USE_FIREBASE is false, localStorage data will be used. Otherwise, it will use the provided firebase data. For more info, go to the firebase section
4. run `yarn start`

## Project Structure

The code is stored inside of the src folder where:
- components: holds common components that can and should be recycled. Although some components here might be tied to some logic.
- views: holds components that represent different routes in the page
- hooks: folder for custom hooks. Currently only one: useDevice
- middleware: folder containing all the logic to connect to backend
- assets: static assets to be processed by webpack

## Dependencies to look out for

### Third party

- **Prettier**: for linting purposes
- ~~**redux**: for state management~~ scrapped during development. If you want to checkout the implementation, look at past commits.
- **react-router**: for client side routing
- **create-react-app**: used for initial scaffolding and configuration of the project. This includes the react-scripts dependency

### Made by me (Juan Gomez)

- **jazzi**: Library for algebraic structures. (If you like **functional programming** please do take a look) [Docs found here](https://github.com/Jkierem/jazzi)
- **getclassname**: utility for ease of handling class names in javascript. Also allows for a sass-like syntax. [Docs found here](https://github.com/Jkierem/getclassname)
- ~~**redux-utility**: utitlitites for removing boilerplate code for redux. [Docs found here](https://github.com/Jkierem/redux-utility)~~ Removed due to not needing redux. Take a look at past commits specially the deleted hooks for reference.

## Backend - localStorage

When firebase is turned off, it will fallback to using localStorage for persistance. It won't reconcile the localStorage with the backend. Instead it will look for a key in localStorage and will fallback to a default state if it is not present and save it. After that, it will use the stored value.

## Backend - Firebase

For obvious security reasons, the  firebase configuration is not commited to the repo. This uses firebase realtime database and expects a single path `/data` as an object with the following shape:

```javascript
{
    id: {
        name: string,
        description: string,
        category: string,
        picture: string,
        lastUpdated: string,
        votes: {
            positive: number,
            negative: number
        }
    }
}
```

## Important Notes and possible improvements

- Jazzi is based on haskell patterns so if you are going to look into it, you know what to expect.
- Redux was setup but ended up unused. There was a plan to use it to store some i18n data but since i18n was not implemented, then the idea was scrapped. To see implementation look at past commits.
- usePromise and useAsyncState were used during development for fetching data but removed due to becoming unused.
- I18n was intented but due to time constraints it was not. The plan was to use i18next and redux to add i18n to the page.
- Adding unit tests is an obvious needed improvement.
- Some console.log calls where left intentionally for purposes of showing firebase connection.
- If redux had gotten complicated and required async actions or similar, redux-observable was planned to be used. Sadly, this wasn't needed.
- The local storage observable could be replaced with a RxJS observable. Decided not to for simplicity but could be done.
- Create-react-app comes with testing already setup but no tests were made so please don't expect it to work.
- The gradient in the images while on the list view doesn't work properly due to the nature of mix-blend. Needs further work.
- Deployment was planed on firebase. Currently not deployed 
- The only part of the data that can be modified is the vote count. In practice, this means the last modified attribute is set and will not update accordingly. This is due to time constraints 
- the local observable is missing an unsubscribe function for when the component gets unmounted. Shouldn't be a cause for bugs in the current state but will be if the component get unmounted and remounted.