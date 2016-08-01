import Fetch from 'isomorphic-fetch';
import jws from 'jws';

export class EventManager {
  constructor(config) {
    this.config = config;
  }

  _checkStatus(response) {
    console.log('response status: ' + response.status);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  _parseJSON(response) {
    return response.json();
  }

  createXmppRootEvent(eventType, from, to, userData, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/createxmpprootevent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
      body: JSON.stringify(userData ? {
        'event_type': eventType,
        'time_posted': Number(new Date()),
        'from': from,
        'to': to,
        'userdata': userData
      } : {
        'event_type': eventType,
        'time_posted': Number(new Date()),
        'from': from,
        'to': to
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('createXmppRootEvent failed: ' + error);
      errorCallback(error);
    });
  }
}
