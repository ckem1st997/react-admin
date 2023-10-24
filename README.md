# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


--Keycloak

https://scontent.xx.fbcdn.net/v/t1.15752-9/393227621_311530624965095_1925182375390372902_n.png?stp=dst-png_s350x350&_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_ohc=HciyTVmfGVEAX9MlDT5&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_e2o=f&oh=03_AdSSbrQfCPce6DqRXQJkgH0kX0KFOkIEViFnL1mPcUsD5g&oe=655EE33D



client_id: tên Client ID ở màn hình chính Cliens
client_secret: chọn vào clientID muốn xem==> chọn tab Credentials


curl --location 'http://localhost:8080/realms/test-auth/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'client_id=test-client' \
--data-urlencode 'client_secret=LmjMgqPNyUiXZrjm0aLS9NRplYs91pjk' \
--data-urlencode 'username=test' \
--data-urlencode 'password=12345'