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

  /**
  * @desc Create xmpp root event
  * @param options - object with the following fields:
  *    Case 1 - Given from and to participants; NO room_name
  *    event_type        string              (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  *    time_posted       64-bit int          (MANDATORY) Time, in milliseconds, this event occured. If not present,
  *                                          it will be the time when data is written to DB.
  *    from              string              (MANDATORY) ID of Entity (such as a Routing Id) which triggered the event.
  *                                          The application type MUST be identifiable in the ID
  *    to                array of strings    (MANDATORY) one or more participant ids. The application type MUST be
  *                                          identifiable in the ID
  *    userdata          blob                (OPTIONAL) User specific data associated with this event. A stringified JSON blob.
  *
  *    Case 2 - Given room_name and from but NO to participants
  *    room_name         string              (MANDATORY) The room name MUST include the app domain, tying it
  *                                          to an application. The format of the room name MUST be <room name>@<app domain>
  *                                          Ex: irissync@irisconnect.comcast.net.
  *    from              string              (MANDATORY) ID of Entity (such as a Routing Id) which triggered the event. This ID
  *                                          may be a randomly generated ID which is required for creating the XMPP token.
  *    event_type        string              (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  *    time_posted       64-bit int          (MANDATORY) Time, in milliseconds, this event occured. If not present,
  *                                          it will be the time when data is written to DB.
  *    userdata          blob                (OPTIONAL) User specific data associated with this event. A stringified JSON blob.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    root_node_id          UUID         Will be stored in all child nodes. This MUST be passed
  *                                       in the request body when calling API PUT /events/createchildevent.
  *                                       This refers to the root event by most recent updated time. Any
  *                                       descendant leaf node will keep this as a reference to the root
  *                                       event.
  *    child_node_id         UUID         child node id (for ALL FUTURE DIRECT child events). This MUST be
  *                                       passed  as "node_id" in the request body when calling API
  *                                       PUT /events/createchildevent
  *                                       Ex: A "pictureshare" event associated with a room has taken
  *                                       place. Let's say the child events are "comments" and "like".
  *                                       This child node ID will be used to catalog ALL these events.
  *                                       Call "PUT /events/createchildevent/" with this child node ID
  *                                       in the request to catalog ALL events.
  *    eventdata             blob         Stringified JSON object containing the following name-value fields
  *                                       {
  *                                           version: 1.0
  *                                           room_id: <uuid>
  *                                           rtc_server: <string>
  *                                           xmpp_token: <string>
  *                                           xmpp_token_expiry_time: <value in seconds>
  *                                           room_token: <string>
  *                                       }
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  createXmppRootEvent(options, successCallback, errorCallback) {
    console.log(options);
    return fetch(this.config.emApiUrl + 'events/createxmpprootevent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
      body: JSON.stringify(options),
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

  /**
  * @desc Create root event
  * @param options - object with the following fields:
  *    Case 1 - Given from and to participants; NO room_name
  *    event_type        string              (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  *    time_posted       64-bit int          (MANDATORY) Time, in milliseconds, this event occured. If not present,
  *                                          it will be the time when data is written to DB.
  *    from              string              (MANDATORY) ID of Entity (such as a Routing Id) which triggered the event.
  *                                          The application type MUST be identifiable in the ID
  *    to                array of strings    (MANDATORY) one or more participant ids. The application type MUST be
  *                                          identifiable in the ID
  *    userdata          blob                (OPTIONAL) User specific data associated with this event. A stringified JSON blob.
  *
  *    Case 2 - Given room_name and from but NO to participants
  *    room_name         string              (MANDATORY) The room name MUST include the app domain, tying it
  *                                          to an application. The format of the room name MUST be <room name>@<app domain>
  *                                          Ex: irissync@irisconnect.comcast.net.
  *    from              string              (MANDATORY) ID of Entity (such as a Routing Id) which triggered the event. This ID
  *                                          may be a randomly generated ID which is required for creating the XMPP token.
  *    event_type        string              (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  *    time_posted       64-bit int          (MANDATORY) Time, in milliseconds, this event occured. If not present,
  *                                          it will be the time when data is written to DB.
  *    userdata          blob                (OPTIONAL) User specific data associated with this event. A stringified JSON blob.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    root_node_id          UUID         Will be stored in all child nodes. This MUST be passed
  *                                       in the request body when calling API PUT /events/createchildevent.
  *                                       This refers to the root event by most recent updated time. Any
  *                                       descendant leaf node will keep this as a reference to the root
  *                                       event.
  *    child_node_id         UUID         child node id (for ALL FUTURE DIRECT child events). This MUST be
  *                                       passed  as "node_id" in the request body when calling API
  *                                       PUT /events/createchildevent
  *                                       Ex: A "pictureshare" event associated with a room has taken
  *                                       place. Let's say the child events are "comments" and "like".
  *                                       This child node ID will be used to catalog ALL these events.
  *                                       Call "PUT /events/createchildevent/" with this child node ID
  *                                       in the request to catalog ALL events.
  *    eventdata             blob         Stringified JSON object containing the following name-value fields
  *                                       {
  *                                           version: 1.0
  *                                           room_id: <uuid>
  *                                           rtc_server: <string>
  *                                           xmpp_token: <string>
  *                                           xmpp_token_expiry_time: <value in seconds>
  *                                           room_token: <string>
  *                                       }
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  createRootEvent(options, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/createrootevent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
      body: JSON.stringify(options),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('createRootEventWithRoom failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Create child event - This API must be called to catalog a child event directly associated with either the room
  *       or another child node.
  * @param options - object with the following fields:
  *    node_id                         UUID          (MANDATORY) Node id of the child event, in UUID format. This is
  *                                                  sent as "child_node_id" in response to the APIs PUT /events/createrootevent or
  *                                                  PUT /events/createxmpprootevent
  *    event_type                      string        (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  *    from                            string        (MANDATORY) Entity (such as a Routing Id) which triggered the event.
  *                                                  The application type MUST be identifiable in the ID
  *    time_posted                     64-bit int    (MANDATORY) Time in milliseconds. This is the timestamp in the PUT
  *                                                  request, if present. Otherwise, this is the time, in
  *                                                  milliseconds, when the data was written to DB.
  *    root_node_id                    UUID          (MANDATORY) Sent as response to the APIs PUT /events/createrootevent or
  *                                                  PUT /events/createxmpprootevent.
  *    userdata                        blob          (OPTIONAL) User specific data associated with this event. A stringified JSON blob.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    child_node_id          UUID           child node id (for ALL FUTURE DIRECT future child events).
  *                                          Ex: A "comment" event associated with a room has taken
  *                                          place. Let's say the child events are "comments" and
  *                                          "like" ("comments" and "like" events for a "comment" event).
  *                                          This child node ID will be used to catalog ALL these events. Call
  *                                          "PUT /events/createchildevent/" with this child node ID
  *                                          in the request to catalog ALL events.
  *    eventdata              blob           (For future use) Stringified JSON object containing the following name-value fields
  *                                          {
  *                                            version: 1.0
  *                                          }
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  createChildEvent(options, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/createchildevent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
      body: JSON.stringify(options),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('createChildEvent failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get room status - Check if a room is active or in session. This applies to ADHOC rooms only.
  * @param roomName - Room Name (This is specific to ADHOC rooms). NOT to be confused with room ID
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    rtc_server             string         RTC server that hosts the room, if active or in session
  *                                          empty string, if room has no association to any RTC server
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  roomStatus(roomName, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/rtcserver/roomname/' + encodeURI(roomName), { // + encodeURIComponent(roomName.replace(/\./g, '&#46;')), { //
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('roomStatus failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get rooms - This API is called to get a reverse chronological (most recent first) and paginated list of rooms
  *                   associated with an application domain, embedded in the room name. This is specific to listing
  *                   adhoc rooms for a specific application domain. THE LIST IS SORTED (most recent to least recent) BY ACTIVITY TIME.
  * @param appDomain - The domain part of the room name which was used to create root event
  * @param count     - Number of records requested
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    room_id             UUID           Room ID (returned when a root event is created).
  *    last_seen           64-bit int     Most recent time there was activity in this room.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRooms(appDomain, count, successCallback, errorCallback) {
    console.log(this.config.emApiUrl + 'events/rooms/appdomain/' + encodeURI(appDomain) + '/records/' + count.toString());
    return fetch(this.config.emApiUrl + 'events/rooms/appdomain/' + encodeURI(appDomain) + '/records/' + count.toString(), {
    //return fetch(this.config.emApiUrl + 'events/rooms/appdomain/' + encodeURIComponent(appDomain.replace(/\./g, '&#46;')) + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRooms failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get rooms from time - This API is called to get a reverse chronological (from time specified in parameter) and paginated list of rooms
  *                   associated with an application domain, embedded in the room name. This is specific to listing
  *                   adhoc rooms for a specific application domain. THE LIST IS SORTED (most recent to least recent) BY ACTIVITY TIME.
  * @param appDomain - The domain part of the room name which was used to create root event
  * @param time      - Time in Milliseconds. From this time, get list of records in reverse chronological order
  * @param count     - Number of records requested
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    room_id             UUID           Room ID (returned when a root event is created).
  *    last_seen           64-bit int     Most recent time there was activity in this room.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRoomsFromTime(appDomain, time, count, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/rooms/appdomain/' + encodeURI(appDomain) + '/time/' + time.toString() + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRoomsFromTime failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get rooms for routing id - This API is called to get a reverse chronological (most recent first) and paginated list of rooms
  *                                  associated with a routing ID. THE LIST IS SORTED (most recent to least recent) BY ACTIVITY TIME.
  * @param routingID - Routing ID.
  * @param count     - Number of records requested.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    room_id             UUID           Room ID (returned when a root event is created).
  *    last_seen           64-bit int     Most recent time there was activity in this room.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRoomsForRoutingID(routingID, count, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/rooms/routingid/' + encodeURI(routingID) + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRoomsForRoutingID failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get rooms for routing id - This API is called to get a reverse chronological (most recent first) and paginated list of rooms
  *                                  associated with a routing ID. THE LIST IS SORTED (most recent to least recent) BY ACTIVITY TIME.
  * @param routingID - Routing ID.
  * @param time      - Time in Milliseconds. From this time, get list of records in reverse chronological order.
  * @param count     - Number of records requested.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    room_id             UUID           Room ID (returned when a root event is created).
  *    last_seen           64-bit int     Most recent time there was activity in this room.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRoomsForRoutingIDWithTime(routingID, time, count, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/rooms/routingid/' + encodeURI(routingID) + '/time/' + time.toString() + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRoomsForRoutingID failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get root events - This API is called to get a reverse chronological (most recent first) and paginated list of direct root
  *                         events associated with a routing ID. THE LIST IS SORTED (most recent to least recent) BY EVENT UPDATE TIME.
  * @param type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  * @param id        - Routing ID.
  * @param count     - Number of records requested.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    node_id                                UUID         Room ID
  *    root_event_updated_at                  64-bit int   Time in milliseconds.
  *    child_node_id                          UUID         child node id
  *    root_node_id                           UUID         This MUST be passed in the request body when calling
  *                                                        API PUT /events/createchildevent.
  *                                                        This refers to the root event by most recent updated
  *                                                        time. Any descendant leaf node will keep this as a
  *                                                        reference to the root event.
  *   eventdata                              blob         A stringified JSON blob of event specific data. This data is created and maintained
  *                                                        by the event manager. The first name value pair is ALWAYS the version in the format
  *                                                        "version":"1.0" - This will help identify/track changes to the JSON blob and keep
  *                                                        this blog backward/forward compatible.
  *   userdata                               blob         User specific data added a the time of creating this event.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRootEventsForRoutingID(eventType, routingID, count, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/view/event/' + encodeURI(eventType) + '/routingid/' + encodeURI(routingID) + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRootEventsForRoutingID failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get root events - This API is called to get a reverse chronological (from time specified in parameter) and
  *                         paginated list of direct root events associated with a routing ID. THE LIST IS SORTED (from the time
  *                         specified in the parameter to least recent) BY EVENT UPDATE TIME.
  * @param type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  * @param id        - Routing ID.
  * @param time      - Time in Milliseconds. From this time, get list of records in reverse chronological order.
  * @param count     - Number of records requested.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    node_id                                UUID         Room ID
  *    root_event_updated_at                  64-bit int   Time in milliseconds.
  *    child_node_id                          UUID         child node id
  *    root_node_id                           UUID         This MUST be passed in the request body when calling
  *                                                        API PUT /events/createchildevent.
  *                                                        This refers to the root event by most recent updated
  *                                                        time. Any descendant leaf node will keep this as a
  *                                                        reference to the root event.
  *   eventdata                              blob         A stringified JSON blob of event specific data. This data is created and maintained
  *                                                        by the event manager. The first name value pair is ALWAYS the version in the format
  *                                                        "version":"1.0" - This will help identify/track changes to the JSON blob and keep
  *                                                        this blog backward/forward compatible.
  *   userdata                               blob         User specific data added a the time of creating this event.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRootEventsForRoutingIDWithTime(eventType, routingID, time, count, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/view/event/' + encodeURI(eventType) + '/routingid/' + encodeURI(routingID) + '/time/' + time.toString() + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRootEventsForRoutingIDWithTime failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get root events - This API is called to get a reverse chronological (most recent first) and paginated list of
  *                         direct root events associated with a room name. THE LIST IS SORTED (most recent to least recent) BY
  *                         EVENT UPDATE TIME.
  * @param type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  * @param name      - Room name.
  * @param count     - Number of records requested.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    event_type             string         Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  *    routing_id             string         Routing_id which triggered the event (This may not be a valid ID for ADHOC rooms).
  *    child_node_id          UUID           Node ID for ALL DIRECT child events.
  *    root_event_created_at  64-bit int     Time in milliseconds.
  *    root_event_updated_at  64-bit int     Time in milliseconds.
  *    eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
  *                                          by the event manager. The first name value pair is ALWAYS the version in the format
  *                                          "version":"1.0" - This will help identify/track changes to the JSON blob and keep
  *                                          this blog backward/forward compatible.
  *    userdata               blob           User specific data added a the time of creating this event.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRootEventsForRoom(eventType, roomName, count, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/view/event/' + encodeURI(eventType) + '/roomname/' + encodeURI(roomName) + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRootEventsForRoom failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get root events - This API is called to get a reverse chronological (most recent first) and paginated list of
  *                         direct root events associated with a room name. THE LIST IS SORTED (most recent to least recent) BY
  *                         EVENT UPDATE TIME.
  * @param type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  * @param name      - Room name.
  * @param time      - Time in Milliseconds. From this time, get list of records in reverse chronological order.
  * @param count     - Number of records requested.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    event_type             string         Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  *    routing_id             string         Routing_id which triggered the event (This may not be a valid ID for ADHOC rooms).
  *    child_node_id          UUID           Node ID for ALL DIRECT child events.
  *    root_event_created_at  64-bit int     Time in milliseconds.
  *    root_event_updated_at  64-bit int     Time in milliseconds.
  *    eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
  *                                          by the event manager. The first name value pair is ALWAYS the version in the format
  *                                          "version":"1.0" - This will help identify/track changes to the JSON blob and keep
  *                                          this blog backward/forward compatible.
  *    userdata               blob           User specific data added a the time of creating this event.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRootEventsForRoomWithTime(eventType, roomName, time, count, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/view/event/' + encodeURI(eventType) + '/roomname/' + encodeURI(roomName) + '/time/' + time.toString() + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRootEventsForRoomWithTime failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get root events - A room is associated with multiple root events.
  *                         This API is called to get a reverse chronological (most recent first) and paginated list of
  *                         direct root events associated with a room ID. THE LIST IS SORTED (most recent to least recent) BY
  *                         EVENT UPDATE TIME.
  * @param type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  * @param if        - Room id.
  * @param count     - Number of records requested.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    event_type             string         Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  *    routing_id             string         Routing_id which triggered the event (This may not be a valid ID for ADHOC rooms).
  *    child_node_id          UUID           Node ID for ALL DIRECT child events.
  *    root_event_created_at  64-bit int     Time in milliseconds.
  *    root_event_updated_at  64-bit int     Time in milliseconds.
  *    eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
  *                                          by the event manager. The first name value pair is ALWAYS the version in the format
  *                                          "version":"1.0" - This will help identify/track changes to the JSON blob and keep
  *                                          this blog backward/forward compatible.
  *    userdata               blob           User specific data added a the time of creating this event.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRootEventsForRoomID(eventType, roomID, count, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/view/event/' + encodeURI(eventType) + '/room/' + encodeURI(roomID) + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRootEventsForRoomID failed: ' + error);
      errorCallback(error);
    });
  }

  /**
  * @desc Get root events - A room is associated with multiple root events.
  *                         This API is called to get a reverse chronological (most recent first) and paginated list of
  *                         direct root events associated with a room ID. THE LIST IS SORTED (most recent to least recent) BY
  *                         EVENT UPDATE TIME.
  * @param type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  * @param if        - Room id.
  * @param time      - Time in Milliseconds. From this time, get list of records in reverse chronological order.
  * @param count     - Number of records requested.
  *
  * @param successCallback - callback for success case.  Receives response as
  *        a parameter.  Following information is returned on successful call:
  *
  *    event_type             string         Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  *    routing_id             string         Routing_id which triggered the event (This may not be a valid ID for ADHOC rooms).
  *    child_node_id          UUID           Node ID for ALL DIRECT child events.
  *    root_event_created_at  64-bit int     Time in milliseconds.
  *    root_event_updated_at  64-bit int     Time in milliseconds.
  *    eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
  *                                          by the event manager. The first name value pair is ALWAYS the version in the format
  *                                          "version":"1.0" - This will help identify/track changes to the JSON blob and keep
  *                                          this blog backward/forward compatible.
  *    userdata               blob           User specific data added a the time of creating this event.
  *
  * @param errorCallback - callback for failured case.  Receives error description.
  */
  getRootEventsForRoomIDWithTime(eventType, roomID, time, count, successCallback, errorCallback) {
    return fetch(this.config.emApiUrl + 'events/view/event/' + encodeURI(eventType) + '/room/' + encodeURI(roomID) + '/time/' + time.toString() + '/records/' + count.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.jwt,
      },
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('getRootEventsForRoomIDWithTime failed: ' + error);
      errorCallback(error);
    });
  }
}
