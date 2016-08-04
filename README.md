# Iris Auth JS SDK
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

### Create xmpp root event
* options - object with the following fields:
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

* successCallback - callback for success case.  Receives response as
        a parameter.  Following information is returned on successful call:

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

* errorCallback - callback for failured case.  Receives error description.
