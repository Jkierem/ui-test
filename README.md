# UI-Test

## Running this

1. run `yarn install`
2. create a .env file (copy .example.env and fill in the gaps) set an enviroment variable called REACT_APP_USE_FIREBASE as true. If this is skipped or if REACT_APP_USE_FIREBASE is false, mocked data will be used. Otherwise, it will use the provided firebase data. For more info, go to the firebase section
3. run `yarn start`

## Dependencies to look out for

### Third party

- **Prettier**: for linting purposes
- **redux**: for state management
- **react-router**: for client side routing
- **create-react-app**: used for initial scaffolding and configuration of the project. This includes the react-scripts dependency

### Made by me (Juan Gomez)

- **jazzi**: Library for algebraic structures. [Docs found here](https://github.com/Jkierem/jazzi)
- **getclassname**: utility for ease of handling class names in javascript. Also allows for a sass-like syntax. [Docs found here](https://github.com/Jkierem/getclassname)
- **redux-utility**: utitlitites for removing boilerplate code for redux. [Docs found here](https://github.com/Jkierem/redux-utility)

## Backend - Firebase

For obvious security reasons, the  firebase configuration is not commited to the repo. This uses firebase realtime database and expects a single path `/data` as an array of objects with the following shape:

```javascript
{
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
```