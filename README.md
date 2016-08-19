# Iris Event Manager JS SDK
## Introduction
This section describes JavaScript SDK for Iris Event Manager.  This SDK is isomorphic and can be used both from the browser or node.  Package can be installed with

```
npm i iris-em-js-sdk
```

or can be included from webpage from following cdn:

```
https://npmcdn.com/iris-em-js-sdk@1.0.2/dist/iris.em.min.js
```

## APIs

### createXmppRootEvent(options, successCallback, errorCallback)
* options - object with the following fields:
```
    Case 1 - Given from and to participants; NO room_name
    event_type        string              (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
    time_posted       64-bit int          (MANDATORY) Time, in milliseconds, this event occured. If not present,
                                          it will be the time when data is written to DB.
    from              string              (MANDATORY) ID of Entity (such as a Routing Id) which triggered the event.
                                          The application type MUST be identifiable in the ID
    to                array of strings    (MANDATORY) one or more participant ids. The application type MUST be
                                          identifiable in the ID
    userdata          blob                (OPTIONAL) User specific data associated with this event. A stringified JSON blob.

    Case 2 - Given room_name and from but NO to participants
    room_name         string              (MANDATORY) The room name MUST include the app domain, tying it
                                          to an application. The format of the room name MUST be <room name>@<app domain>
                                          Ex: irissync@irisconnect.comcast.net.
    from              string              (MANDATORY) ID of Entity (such as a Routing Id) which triggered the event. This ID
                                          may be a randomly generated ID which is required for creating the XMPP token.
    event_type        string              (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
    time_posted       64-bit int          (MANDATORY) Time, in milliseconds, this event occured. If not present,
                                          it will be the time when data is written to DB.
    userdata          blob                (OPTIONAL) User specific data associated with this event. A stringified JSON blob.
```
* successCallback - callback for success case.  Receives response as
        a parameter.  Following information is returned on successful call:
```
    root_node_id          UUID         Will be stored in all child nodes. This MUST be passed
                                       in the request body when calling API PUT /events/createchildevent.
                                       This refers to the root event by most recent updated time. Any
                                       descendant leaf node will keep this as a reference to the root*                                       event.
    child_node_id         UUID         child node id (for ALL FUTURE DIRECT child events). This MUST be
                                       passed  as "node_id" in the request body when calling API
                                       PUT /events/createchildevent
                                       Ex: A "pictureshare" event associated with a room has taken
                                       place. Let's say the child events are "comments" and "like".
                                       This child node ID will be used to catalog ALL these events.
                                       Call "PUT /events/createchildevent/" with this child node ID
                                       in the request to catalog ALL events.
    eventdata             blob         Stringified JSON object containing the following name-value field
                                      {
                                           version: 1.0
                                           room_id: <uuid>
                                           rtc_server: <string>
                                           xmpp_token: <string>
                                           xmpp_token_expiry_time: <value in seconds>
                                           room_token: <string>
                                       }
```
* errorCallback - callback for failured case.  Receives error description.

### createRootEvent(options, successCallback, errorCallback)
```
options - object with the following fields:
    Case 1 - Given from and to participants; NO room_name
        event_type        string              (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
        time_posted       64-bit int          (MANDATORY) Time, in milliseconds, this event occured. If not present,
                                              it will be the time when data is written to DB.
        from              string              (MANDATORY) ID of Entity (such as a Routing Id) which triggered the event.
                                              The application type MUST be identifiable in the ID
        to                array of strings    (MANDATORY) one or more participant ids. The application type MUST be
                                              identifiable in the ID
        userdata          blob                (OPTIONAL) User specific data associated with this event. A stringified JSON blob.

    Case 2 - Given room_name and from but NO to participants
       room_name         string              (MANDATORY) The room name MUST include the app domain, tying it
                                             to an application. The format of the room name MUST be <room name>@<app domain>
                                             Ex: irissync@irisconnect.comcast.net.
       from              string              (MANDATORY) ID of Entity (such as a Routing Id) which triggered the event. This ID
                                             may be a randomly generated ID which is required for creating the XMPP token.
       event_type        string              (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
       time_posted       64-bit int          (MANDATORY) Time, in milliseconds, this event occured. If not present,
                                             it will be the time when data is written to DB.
       userdata          blob                (OPTIONAL) User specific data associated with this event. A stringified JSON blob.
  
       successCallback - callback for success case.  Receives response as
                         a parameter.  Following information is returned on successful call:
  
       root_node_id          UUID         Will be stored in all child nodes. This MUST be passed
                                          in the request body when calling API PUT /events/createchildevent.
                                          This refers to the root event by most recent updated time. Any
                                          descendant leaf node will keep this as a reference to the root
                                          event.
       child_node_id         UUID         child node id (for ALL FUTURE DIRECT child events). This MUST be
                                          passed  as "node_id" in the request body when calling API
                                          PUT /events/createchildevent
                                          Ex: A "pictureshare" event associated with a room has taken
                                          place. Let's say the child events are "comments" and "like".
                                          This child node ID will be used to catalog ALL these events.
                                          Call "PUT /events/createchildevent/" with this child node ID
                                          in the request to catalog ALL events.
       eventdata             blob         Stringified JSON object containing the following name-value fields
                                          {
                                              version: 1.0
                                              room_id: <uuid>
                                              rtc_server: <string>
                                              xmpp_token: <string>
                                              xmpp_token_expiry_time: <value in seconds>
                                              room_token: <string>
                                          }
```

### createChildEvent(options, successCallback, errorCallback)
This API must be called to catalog a child event directly associated with either the room or another child node.
```
   options - object with the following fields:
      node_id                         UUID          (MANDATORY) Node id of the child event, in UUID format. This is
                                                    sent as "child_node_id" in response to the APIs PUT /events/createrootevent or
                                                    PUT /events/createxmpprootevent
      event_type                      string        (MANDATORY) Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
      from                            string        (MANDATORY) Entity (such as a Routing Id) which triggered the event.
                                                    The application type MUST be identifiable in the ID
      time_posted                     64-bit int    (MANDATORY) Time in milliseconds. This is the timestamp in the PUT
                                                    request, if present. Otherwise, this is the time, in
                                                    milliseconds, when the data was written to DB.
      root_node_id                    UUID          (MANDATORY) Sent as response to the APIs PUT /events/createrootevent or
                                                    PUT /events/createxmpprootevent.
      userdata                        blob          (OPTIONAL) User specific data associated with this event. A stringified JSON blob.
  
   successCallback - callback for success case.  Receives response as
          a parameter.  Following information is returned on successful call:
  
      child_node_id          UUID           child node id (for ALL FUTURE DIRECT future child events).
                                            Ex: A "comment" event associated with a room has taken
                                            place. Let's say the child events are "comments" and
                                            "like" ("comments" and "like" events for a "comment" event).
                                            This child node ID will be used to catalog ALL these events. Call
                                            "PUT /events/createchildevent/" with this child node ID
                                            in the request to catalog ALL events.
      eventdata              blob           (For future use) Stringified JSON object containing the following name-value fields
                                            {
                                              version: 1.0
                                            }
  
   errorCallback - callback for failured case.  Receives error description.
```
  
### roomStatus(roomName, successCallback, errorCallback)
Check if a room is active or in session. This applies to ADHOC rooms only.
```
   roomName - Room Name (This is specific to ADHOC rooms). NOT to be confused with room ID
  
   successCallback - callback for success case.  Receives response as
                     a parameter.  Following information is returned on successful call:
 
          rtc_server             string         RTC server that hosts the room, if active or in session
                                            empty string, if room has no association to any RTC server
  
   errorCallback - callback for failured case.  Receives error description.
```
  
### getRooms(appDomain, count, successCallback, errorCallback)
This API is called to get a reverse chronological (most recent first) and paginated list of rooms
associated with an application domain, embedded in the room name. This is specific to listing
adhoc rooms for a specific application domain. THE LIST IS SORTED (most recent to least recent) BY ACTIVITY TIME.
```
  appDomain - The domain part of the room name which was used to create root event
  count     - Number of records requested
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      room_id             UUID           Room ID (returned when a root event is created).
      last_seen           64-bit int     Most recent time there was activity in this room.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getRoomsFromTime(appDomain, time, count, successCallback, errorCallback)
Get rooms from time - This API is called to get a reverse chronological (from time specified in parameter) and paginated list of rooms associated with an application domain, embedded in the room name. This is specific to listing adhoc rooms for a specific application domain. THE LIST IS SORTED (most recent to least recent) BY ACTIVITY TIME.
```
  appDomain - The domain part of the room name which was used to create root event
  time      - Time in Milliseconds. From this time, get list of records in reverse chronological order
  count     - Number of records requested
 
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      room_id             UUID           Room ID (returned when a root event is created).
      last_seen           64-bit int     Most recent time there was activity in this room.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getRoomsForRoutingID(routingID, count, successCallback, errorCallback)
Get rooms for routing id - This API is called to get a reverse chronological (most recent first) and paginated list of rooms associated with a routing ID. THE LIST IS SORTED (most recent to least recent) BY ACTIVITY TIME.
```
  routingID - Routing ID.
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      room_id             UUID           Room ID (returned when a root event is created).
      last_seen           64-bit int     Most recent time there was activity in this room.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getRoomsForRoutingIDWithTime(routingID, time, count, successCallback, errorCallback)
Get rooms for routing id - This API is called to get a reverse chronological (most recent first) and paginated list of rooms associated with a routing ID. THE LIST IS SORTED (most recent to least recent) BY ACTIVITY TIME.
```
  routingID - Routing ID.
  time      - Time in Milliseconds. From this time, get list of records in reverse chronological order.
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as a parameter.  Following information is returned on successful call:
  
      room_id             UUID           Room ID (returned when a root event is created).
      last_seen           64-bit int     Most recent time there was activity in this room.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getRootEventsForRoutingID(eventType, routingID, count, successCallback, errorCallback)
This API is called to get a reverse chronological (most recent first) and paginated list of direct root events associated with a routing ID. THE LIST IS SORTED (most recent to least recent) BY EVENT UPDATE TIME.
```
  type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  id        - Routing ID.
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      node_id                                UUID         Room ID
      root_event_updated_at                  64-bit int   Time in milliseconds.
      child_node_id                          UUID         child node id
      root_node_id                           UUID         This MUST be passed in the request body when calling
                                                          API PUT /events/createchildevent.
                                                          This refers to the root event by most recent updated
                                                          time. Any descendant leaf node will keep this as a
                                                          reference to the root event.
     eventdata                              blob         A stringified JSON blob of event specific data. This data is created and maintained
                                                          by the event manager. The first name value pair is ALWAYS the version in the format
                                                          "version":"1.0" - This will help identify/track changes to the JSON blob and keep
                                                          this blog backward/forward compatible.
     userdata                               blob         User specific data added a the time of creating this event.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getRootEventsForRoutingIDWithTime(eventType, routingID, time, count, successCallback, errorCallback)
This API is called to get a reverse chronological (from time specified in parameter) and paginated list of direct root events associated with a routing ID. THE LIST IS SORTED (from the time specified in the parameter to least recent) BY EVENT UPDATE TIME.
```
  type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  id        - Routing ID.
  time      - Time in Milliseconds. From this time, get list of records in reverse chronological order.
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      node_id                                UUID         Room ID
      root_event_updated_at                  64-bit int   Time in milliseconds.
      child_node_id                          UUID         child node id
      root_node_id                           UUID         This MUST be passed in the request body when calling
                                                          API PUT /events/createchildevent.
                                                          This refers to the root event by most recent updated
                                                          time. Any descendant leaf node will keep this as a
                                                          reference to the root event.
     eventdata                              blob         A stringified JSON blob of event specific data. This data is created and maintained
                                                          by the event manager. The first name value pair is ALWAYS the version in the format
                                                          "version":"1.0" - This will help identify/track changes to the JSON blob and keep
                                                          this blog backward/forward compatible.
     userdata                               blob         User specific data added a the time of creating this event.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getRootEventsForRoom(eventType, roomName, count, successCallback, errorCallback)
This API is called to get a reverse chronological (most recent first) and paginated list of direct root events associated with a room name. THE LIST IS SORTED (most recent to least recent) BY EVENT UPDATE TIME.
```
  type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  name      - Room name.
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      event_type             string         Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
      routing_id             string         Routing_id which triggered the event (This may not be a valid ID for ADHOC rooms).
      child_node_id          UUID           Node ID for ALL DIRECT child events.
      root_event_created_at  64-bit int     Time in milliseconds.
      root_event_updated_at  64-bit int     Time in milliseconds.
      eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
                                            by the event manager. The first name value pair is ALWAYS the version in the format
                                            "version":"1.0" - This will help identify/track changes to the JSON blob and keep
                                            this blog backward/forward compatible.
      userdata               blob           User specific data added a the time of creating this event.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getRootEventsForRoomWithTime(eventType, roomName, time, count, successCallback, errorCallback)
This API is called to get a reverse chronological (most recent first) and paginated list of direct root events associated with a room name. THE LIST IS SORTED (most recent to least recent) BY EVENT UPDATE TIME.
```
  type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  name      - Room name.
  time      - Time in Milliseconds. From this time, get list of records in reverse chronological order.
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      event_type             string         Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
      routing_id             string         Routing_id which triggered the event (This may not be a valid ID for ADHOC rooms).
      child_node_id          UUID           Node ID for ALL DIRECT child events.
      root_event_created_at  64-bit int     Time in milliseconds.
      root_event_updated_at  64-bit int     Time in milliseconds.
      eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
                                            by the event manager. The first name value pair is ALWAYS the version in the format
                                            "version":"1.0" - This will help identify/track changes to the JSON blob and keep
                                            this blog backward/forward compatible.
      userdata               blob           User specific data added a the time of creating this event.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getRootEventsForRoomID(eventType, roomID, count, successCallback, errorCallback)
A room is associated with multiple root events. This API is called to get a reverse chronological (most recent first) and paginated list of direct root events associated with a room ID. THE LIST IS SORTED (most recent to least recent) BY EVENT UPDATE TIME.
```
  type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  id        - Room id.
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      event_type             string         Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
      routing_id             string         Routing_id which triggered the event (This may not be a valid ID for ADHOC rooms).
      child_node_id          UUID           Node ID for ALL DIRECT child events.
      root_event_created_at  64-bit int     Time in milliseconds.
      root_event_updated_at  64-bit int     Time in milliseconds.
      eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
                                            by the event manager. The first name value pair is ALWAYS the version in the format
                                            "version":"1.0" - This will help identify/track changes to the JSON blob and keep
                                            this blog backward/forward compatible.
      userdata               blob           User specific data added a the time of creating this event.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getRootEventsForRoomIDWithTime(eventType, roomID, time, count, successCallback, errorCallback)
A room is associated with multiple root events. This API is called to get a reverse chronological (most recent first) and paginated list of direct root events associated with a room ID. THE LIST IS SORTED (most recent to least recent) BY EVENT UPDATE TIME.
```
  type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  id        - Room id.
  time      - Time in Milliseconds. From this time, get list of records in reverse chronological order.
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      event_type             string         Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
      routing_id             string         Routing_id which triggered the event (This may not be a valid ID for ADHOC rooms).
      child_node_id          UUID           Node ID for ALL DIRECT child events.
      root_event_created_at  64-bit int     Time in milliseconds.
      root_event_updated_at  64-bit int     Time in milliseconds.
      eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
                                            by the event manager. The first name value pair is ALWAYS the version in the format
                                            "version":"1.0" - This will help identify/track changes to the JSON blob and keep
                                            this blog backward/forward compatible.
      userdata               blob           User specific data added a the time of creating this event.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getEventCount(eventType, roomID, successCallback, errorCallback)
This API is called to get the total number of "direct" events associated with a child node ID or room ID.
```
  type      - Type of event (Ex: "audiocall", "videocall", "comments", "pictureshare", "liveshare", "likes",...)
  id        - Room id.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      count                  int            Number of times a DIRECT event associated with a child
                                            node ID or room ID has occurred.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getChildEvents(childNodeID, count, successCallback, errorCallback)
This API is called to get a reverse chronological (most recent first) and paginated list of child events. THE LIST IS SORTED (most recent to least recent) BY TIME EVENT WAS POSTED.  NOTE: The node id in the parameter MUST be the child node ID (as against the room ID).
```
  id        - Child node ID in UUID format (created upon calling API PUT /events/createchildevent).
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      routing_id             string         Routing_id which triggered this child event.
      child_node_id          UUID           Node ID for ALL DIRECT child events.
      time_posted            64-bit int     Time in milliseconds.
      root_node_id           UUID           This MUST be passed in the request body when calling
                                            API PUT /events/createchildevent.
                                            This refers to the root event by most recent updated
                                            time. Any descendant leaf node will keep this as a
                                            reference to the root event.
      eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
                                            by the event manager. The first name value pair is ALWAYS the version in the format
                                            "version":"1.0" - This will help identify/track changes to the JSON blob and keep
                                            this blog backward/forward compatible.
      userdata               blob           User specific data added a the time of creating this event.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getChildEventsWithTime(childNodeID, time, count, successCallback, errorCallback)
This API is called to get a reverse chronological (from time specified in parameter) and paginated list of child events. THE LIST IS SORTED (from the time specified in the parameter to least recent) BY TIME EVENT WAS POSTED.  NOTE: The node id in the parameter MUST be the child node ID (as against the room ID).
```
  id        - Child node ID in UUID format (created upon calling API PUT /events/createchildevent).
  time      - Time in Milliseconds. From this time, get list of records in reverse chronological order.
  count     - Number of records requested.
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      routing_id             string         Routing_id which triggered this child event.
      child_node_id          UUID           Node ID for ALL DIRECT child events.
      time_posted            64-bit int     Time in milliseconds.
      root_node_id           UUID           This MUST be passed in the request body when calling
                                            API PUT /events/createchildevent.
                                            This refers to the root event by most recent updated
                                            time. Any descendant leaf node will keep this as a
                                            reference to the root event.
      eventdata              blob           A stringified JSON blob of event specific data. This data is created and maintained
                                            by the event manager. The first name value pair is ALWAYS the version in the format
                                            "version":"1.0" - This will help identify/track changes to the JSON blob and keep
                                            this blog backward/forward compatible.
      userdata               blob           User specific data added a the time of creating this event.
  
  errorCallback - callback for failured case.  Receives error description.
```

### getEventManagerStatus(successCallback, errorCallback)
This API serves 2 purposes
    1. Health Check - A 200 OK response indicates the event manager is running.
    2. Version - Returns version in response body
```
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
  
      version           string        Event Manager version.
  
  errorCallback - callback for failured case.  Receives error description.
```

### deleteRoom(roomID, rtcServer, successCallback, errorCallback)
Delete room
```
  id        - Room ID associated with a XMPP multi-user chat session
  server    - RTC server which hosted multi-user chat session with the room ID in request parameter
  
  successCallback - callback for success case.  Receives response as
                    a parameter.  Following information is returned on successful call:
 
      200 OK if Room ID is valid.
  
  errorCallback - callback for failured case.  Receives error description.
```
