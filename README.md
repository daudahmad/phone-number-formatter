### Phone number formatter API

Use this API to format phone numbers, currently it only supports International numbers.

1. To run this application locally use `npm start`

2. To run the sample tests use `npm test`

3. This service is deployed on Heroku. It uses JWKS for authorization, the bearer token is hardcoded in the `constants.js` file for now. It accepts two parameters: `number`(mandatory) and `country_code`(optional). If `country_code` is not provided it tries to find it from the caller ip address. 

4. Some sample requests/responses are provided below for reference:

```
curl --request GET \
  --url https://phone-number-formatter.herokuapp.com/api/formatPhoneNumber?number=431023984 \
  --header 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16TTJOVVJETWpZME0wTkVOMFF5UTBZME1qZENORVV3T0RsQlFqWTFNVGcwTURrMU4wTkJSQSJ9.eyJpc3MiOiJodHRwczovL2RhdWRhaG1hZC5hdXRoMC5jb20vIiwic3ViIjoicnNxdmU3bXVxZFFmWDJsTXhyWklRMnNoVE5kWlhkSnBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGhvbmVmb3JtYXR0ZXIvYXBpIiwiaWF0IjoxNTMwMTQ5MjMzLCJleHAiOjE1MzAyMzU2MzMsImF6cCI6InJzcXZlN211cWRRZlgybE14clpJUTJzaFROZFpYZEpwIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.mVcJE5N8sqTQk0ZrlIYbC_dxmUHJJU3U52Lo_inC2nRKdQqtjSaH3BDaV_BupVb87DrKcXHoEjY7O6V6Xr_gSF2UPoyDIoL6-72V2FKKPhF9KzwbTlrUiLHtTPaip5fKGla1CC6DNZYaZr8yxxscOfCCkaF1Y2FzJs-0fS5cBc-NsZH40SNw4JwL5wR87S5bvOQMTML4Xk2hP56RSh_8xnFgV2DXqvmKxtPv9PG-CZ09Yw0IbCC4yjBHHOotSZ9jB-09kNhU4CPI0yIqsVNBF5kv69KKuAMqtQzsrbKWWAmLINkjUqdSE7YZcq4qV8hEcDnm6fy734LydRIRDMRiiQ'
  
{
    "success": true,
    "formatted_number": "+61 431 023 984",
    "valid": true
}
```

```
curl --request GET \
  --url https://phone-number-formatter.herokuapp.com/api/formatPhoneNumber?number=431023984&country_code=AU \
  --header 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16TTJOVVJETWpZME0wTkVOMFF5UTBZME1qZENORVV3T0RsQlFqWTFNVGcwTURrMU4wTkJSQSJ9.eyJpc3MiOiJodHRwczovL2RhdWRhaG1hZC5hdXRoMC5jb20vIiwic3ViIjoicnNxdmU3bXVxZFFmWDJsTXhyWklRMnNoVE5kWlhkSnBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGhvbmVmb3JtYXR0ZXIvYXBpIiwiaWF0IjoxNTMwMTQ5MjMzLCJleHAiOjE1MzAyMzU2MzMsImF6cCI6InJzcXZlN211cWRRZlgybE14clpJUTJzaFROZFpYZEpwIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.mVcJE5N8sqTQk0ZrlIYbC_dxmUHJJU3U52Lo_inC2nRKdQqtjSaH3BDaV_BupVb87DrKcXHoEjY7O6V6Xr_gSF2UPoyDIoL6-72V2FKKPhF9KzwbTlrUiLHtTPaip5fKGla1CC6DNZYaZr8yxxscOfCCkaF1Y2FzJs-0fS5cBc-NsZH40SNw4JwL5wR87S5bvOQMTML4Xk2hP56RSh_8xnFgV2DXqvmKxtPv9PG-CZ09Yw0IbCC4yjBHHOotSZ9jB-09kNhU4CPI0yIqsVNBF5kv69KKuAMqtQzsrbKWWAmLINkjUqdSE7YZcq4qV8hEcDnm6fy734LydRIRDMRiiQ'
  
{
    "success": true,
    "formatted_number": "+61 431 023 984",
    "valid": true
}
```
