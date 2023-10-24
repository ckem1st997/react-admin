import Keycloak from 'keycloak-js';

 const keycloak = new Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'test-auth',
  clientId: 'test-client',
});
export default keycloak;