### Phone number formatter API

Use this API to format phone numbers, currently it only supports International numbers.

1. To run this application locally use `npm start`

2. To run the sample tests use `npm test`

3. This service is deployed on Heroku. It uses JWKS for authorization, the bearer token is hardcoded in the `constants.js` file for now. It accepts two parameters: `number`(mandatory) and `country_code`(optional). If `country_code` is not provided it tries to find it from the caller ip address. 

4. Some sample requests/responses are provided below for reference:

```
curl --request GET \
  --url https://phone-number-formatter.herokuapp.com/api/formatPhoneNumber?number=431023984 \
  --header 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16TTJOVVJETWpZME0wTkVOMFF5UTBZME1qZENORVV3T0RsQlFqWTFNVGcwTURrMU4wTkJSQSJ9.eyJpc3MiOiJodHRwczovL2RhdWRhaG1hZC5hdXRoMC5jb20vIiwic3ViIjoicnNxdmU3bXVxZFFmWDJsTXhyWklRMnNoVE5kWlhkSnBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGhvbmVmb3JtYXR0ZXIvYXBpIiwiaWF0IjoxNTMwMzMwODg2LCJleHAiOjE1MzExOTQ4ODYsImF6cCI6InJzcXZlN211cWRRZlgybE14clpJUTJzaFROZFpYZEpwIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.iEN-HIahFV9FHdI9pbsd4fv82xa91l8qPhpeciJwAHD8x5Olt2oZOWEoTyGRrGNjuXboib73BCHipG2_8qnuqBs8_Fgrfg_MUzn99T8kA9kwBBNTUUYtn1R7WggqWIUi8eBxTP-_xkA3Gk8j8DJpm3vzzD8EVcx_sYhTn3wFPjaZIOH5i4cgadsuQlFYHNA9C5oDJrvDHLV5sO_oDZxrUvMwazoLaWu3bLcL7HxM4UyXw6LLjvQGYrvLXa2Cd_lfb6m7ROtznVc619Md6w3dl6r2nlLPMa3q91nLHFdrjUWz7ZGhOgIrBWQ7rE74P1HYaR5WYx15HlWHzsLohKQOLQ'
  
{
    "success": true,
    "formatted_number": "+61 431 023 984",
    "valid": true
}
```

```
curl --request GET \
  --url https://phone-number-formatter.herokuapp.com/api/formatPhoneNumber?number=431023984&country_code=AU \
  --header 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16TTJOVVJETWpZME0wTkVOMFF5UTBZME1qZENORVV3T0RsQlFqWTFNVGcwTURrMU4wTkJSQSJ9.eyJpc3MiOiJodHRwczovL2RhdWRhaG1hZC5hdXRoMC5jb20vIiwic3ViIjoicnNxdmU3bXVxZFFmWDJsTXhyWklRMnNoVE5kWlhkSnBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGhvbmVmb3JtYXR0ZXIvYXBpIiwiaWF0IjoxNTMwMzMwODg2LCJleHAiOjE1MzExOTQ4ODYsImF6cCI6InJzcXZlN211cWRRZlgybE14clpJUTJzaFROZFpYZEpwIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.iEN-HIahFV9FHdI9pbsd4fv82xa91l8qPhpeciJwAHD8x5Olt2oZOWEoTyGRrGNjuXboib73BCHipG2_8qnuqBs8_Fgrfg_MUzn99T8kA9kwBBNTUUYtn1R7WggqWIUi8eBxTP-_xkA3Gk8j8DJpm3vzzD8EVcx_sYhTn3wFPjaZIOH5i4cgadsuQlFYHNA9C5oDJrvDHLV5sO_oDZxrUvMwazoLaWu3bLcL7HxM4UyXw6LLjvQGYrvLXa2Cd_lfb6m7ROtznVc619Md6w3dl6r2nlLPMa3q91nLHFdrjUWz7ZGhOgIrBWQ7rE74P1HYaR5WYx15HlWHzsLohKQOLQ'
  
{
    "success": true,
    "formatted_number": "+61 431 023 984",
    "valid": true
}
```
