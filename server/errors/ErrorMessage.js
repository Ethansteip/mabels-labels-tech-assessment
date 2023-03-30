/*
*
* ErrorMesage - used to dynamically generate the message of an ErrorMessage object based on the response status.
*
*/

module.exports = class ErrorMessage {

  constructor(message) {
    switch (message) {
    case 400:
      this.message = 'The client provided bad data, causing an error.';
      break;
    case 403:
      this.message = 'The client is not authorized to access this resource.';
      break;
    case 404:
      this.message = 'Requested resource not found.';
      break;
    }
  }
};