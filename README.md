# UI-Test

## Running this

1. run `yarn install`
2. create a .env file (copy .example.env and fill in the gaps) set an enviroment variable called REACT_APP_USE_FIREBASE as true. If this is skipped or if REACT_APP_USE_FIREBASE is false, localStorage data will be used. Otherwise, it will use the provided firebase data. For more info, go to the firebase section
3. run `yarn start`

## Dependencies to look out for

### Third party

- **Prettier**: for linting purposes
- ~~**redux**: for state management~~ scrapped during development
- **react-router**: for client side routing
- **create-react-app**: used for initial scaffolding and configuration of the project. This includes the react-scripts dependency

### Made by me (Juan Gomez)

- **jazzi**: Library for algebraic structures. [Docs found here](https://github.com/Jkierem/jazzi)
- **getclassname**: utility for ease of handling class names in javascript. Also allows for a sass-like syntax. [Docs found here](https://github.com/Jkierem/getclassname)
- ~~**redux-utility**: utitlitites for removing boilerplate code for redux. [Docs found here](https://github.com/Jkierem/redux-utility)~~ Removed due to not needing redux

## Backend - localStorage

When firebase is turned off, it will fallback to using localStorage for persistance. It won't reconcile the localStorage with the backend. Instead it will look for a key in localStorage and will fallback to a default state if it is not present and save it. After that, it will use the stored value.

## Backend - Firebase

For obvious security reasons, the  firebase configuration is not commited to the repo. This uses firebase realtime database and expects a single path `/data` as an objects with the following shape:

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