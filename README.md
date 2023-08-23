# Admin Client Setup

## References

React Router Tutorial: https://reactrouter.com/docs/en/v6/getting-started/tutorial
React Hooks Fetch Data: https://www.robinwieruch.de/react-hooks-fetch-data/
React Sass tutorial:
Current Video Time: https://youtu.be/D31P9ovJjqs?t=1858

Sass: https://sass-lang.com/documentation

HTML Elements: https://developer.mozilla.org/en-US/docs/Web/HTML/Element

React App Nested Routes Breadcrumbs: 
https://dev.to/sneas/react-app-with-nested-routes-and-breadcrumbs-90l

React with router and  material ui (MUI)

```bash
npx create-react-app admin-client
cd admin-client
rm package-lock.json
yarn add react-router-dom axios
yarn add react-bootstrap bootstrap react-router-bootstrap
yarn start # You should see a default react app
```

## Get a Layout Working

Get things showing up without server interaction. Use dummy data if necessary.

I used the Examples V5 Basic Example with React-Router-Bootstrap from here:
https://github.com/react-bootstrap/code-sandbox-examples/blob/master/README.md

## React Router V6 Changes

- `useHistory` => `useNavigate`
- `<Switch>` => `<Route>` 

## Form Styles

Check `ct-js-frontend` and `tutorials/complete-sass-tutorial`.

Also for forms: https://www.w3schools.com/css/css_form.asp 
