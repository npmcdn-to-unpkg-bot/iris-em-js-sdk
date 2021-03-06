import { expect } from 'chai';
import { AuthManager } from 'iris-auth-js-sdk';
import { EventManager } from './index';

/*

{"room_name": "wGMQQtEi8YIrisVideoChat.comcast.com", "from":"1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com", "event_type": "videocall", "time_posted":1470099709669}
'videocall', '2bcypode-mda6-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com', '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com', { field1: 'field1', field2: 'field2' }
*/

const eventManagerUrl = 'https://st-evmgr-cmce-002.poc.sys.comcast.net/';
const appKey = 'bJjeXEpiqXMBAJpuDr0ksg7pkUCQlNlV';

describe('createXmppRootEventWithRoom', () => {
  it('should create xmpp root event', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createXmppRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        done();
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('createXmppRootEvent', () => {
  it('should create xmpp root event', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        event_type: 'videocall',
        from: '2bcypode-mda6-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com',
        to: ['1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'],
        time_posted: Number(new Date())
      }
      eventMgr.createXmppRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        done();
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('createRootEventWithRoom', () => {
  it('should create root event', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        done();
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('createRootEvent', () => {
  it('should create root event', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        event_type: 'videocall',
        from: '2bcypode-mda6-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com',
        to: ['1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'],
        time_posted: Number(new Date())
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        done();
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('createChildEvent', () => {
  it('should create child event', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        const childOptions = {
          node_id: data.Child_node_id,
          event_type: 'videocall',
          from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com',
          time_posted: Number(new Date()),
          root_node_id: data.Root_node_id
        }
        eventMgr.createChildEvent(childOptions, (childData) => {
          console.log(childData);
          expect(childData).to.have.property('Child_node_id');
          expect(childData).to.have.property('Eventdata');
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('roomStatus', () => {
  it('should get room status', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createXmppRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');

        eventMgr.roomStatus('wGMQQtEi8Y@IrisVideoChat.comcast.com', (roomStatusData) => {
          console.log(roomStatusData);
          expect(roomStatusData).to.have.property('Rtc_server');
          done();
        }, (error) => {
          if (error.response.status === 404) {
            console.log('Not found.  This is expected.')
            done();
            return;
          }
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRooms', () => {
  it('should get array of rooms for app domain', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');

        eventMgr.getRooms('IrisVideoChat.comcast.com', 10, (rooms) => {
          console.log(rooms);
          expect(rooms.length).to.be.above(0);
          rooms.map((room) => {
            expect(room).to.have.property('Room_id');
            expect(room).to.have.property('Last_seen');
          })
          done();
        }, (error) => {
          console.log(error.Body);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRoomsFromTime', () => {
  it('should get array of rooms for app domain from specified time', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        let timeMark = Number(new Date());
        eventMgr.getRoomsFromTime('IrisVideoChat.comcast.com', timeMark, 10, (rooms) => {
          console.log(rooms);
          expect(rooms.length).to.be.above(0);
          rooms.map((room) => {
            expect(room).to.have.property('Room_id');
            expect(room).to.have.property('Last_seen');
          })
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRoomsForRoutingID', () => {
  it('should get array of rooms for routing id', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');

        eventMgr.getRoomsForRoutingID('1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com', 10, (rooms) => {
          console.log(rooms);
          expect(rooms.length).to.be.above(0);
          rooms.map((room) => {
            expect(room).to.have.property('Room_id');
            expect(room).to.have.property('Last_seen');
          })
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRoomsForRoutingIDWithTime', () => {
  it('should get array of rooms for routing id with time', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        let timeMark = Number(new Date());
        eventMgr.getRoomsForRoutingIDWithTime('1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com', timeMark, 10, (rooms) => {
          console.log(rooms);
          expect(rooms.length).to.be.above(0);
          rooms.map((room) => {
            expect(room).to.have.property('Room_id');
            expect(room).to.have.property('Last_seen');
          })
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRootEventsForRoutingID', () => {
  it('should get root events for routing id', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');

        eventMgr.getRootEventsForRoutingID('videocall', '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com', 10, (events) => {
          console.log(events);
          expect(events.length).to.be.above(0);
          events.map((event) => {
            expect(event).to.have.property('Node_id');
            expect(event).to.have.property('Child_node_id');
            expect(event).to.have.property('Root_node_id');
            expect(event).to.have.property('Eventdata');
          })
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRootEventsForRoutingIDWithTime', () => {
  it('should get root events for routing id for time period', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        let timeMark = Number(new Date());
        eventMgr.getRootEventsForRoutingIDWithTime('videocall', '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com', timeMark, 10, (events) => {
          console.log(events);
          expect(events.length).to.be.above(0);
          events.map((event) => {
            expect(event).to.have.property('Node_id');
            expect(event).to.have.property('Child_node_id');
            expect(event).to.have.property('Root_node_id');
            expect(event).to.have.property('Eventdata');
          })
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRootEventsForRoom', () => {
  it('should get root events for room name', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');

        eventMgr.getRootEventsForRoom('videocall', 'wGMQQtEi8Y@IrisVideoChat.comcast.com', 10, (events) => {
          console.log(events);
          expect(events.length).to.be.above(0);
          events.map((event) => {
            expect(event).to.have.property('Routing_id');
            expect(event).to.have.property('Child_node_id');
            expect(event).to.have.property('Root_event_created_at');
            expect(event).to.have.property('Root_event_updated_at');
            expect(event).to.have.property('Eventdata');
          })
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRootEventsForRoomWithTime', () => {
  it('should get root events for room name for time period', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        let timeMark = Number(new Date());
        eventMgr.getRootEventsForRoomWithTime('videocall', 'wGMQQtEi8Y@IrisVideoChat.comcast.com', timeMark, 10, (events) => {
          console.log(events);
          expect(events.length).to.be.above(0);
          events.map((event) => {
            expect(event).to.have.property('Routing_id');
            expect(event).to.have.property('Child_node_id');
            expect(event).to.have.property('Root_event_created_at');
            expect(event).to.have.property('Root_event_updated_at');
            expect(event).to.have.property('Eventdata');
          })
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRootEventsForRoomID', () => {
  it('should get root events for room id', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        console.log('RoomID: ' + data.Eventdata.Room_id);

        eventMgr.getRootEventsForRoomID('videocall', data.Eventdata.Room_id, 10, (events) => {
          console.log(events);
          expect(events.length).to.be.above(0);
          events.map((event) => {
            expect(event).to.have.property('Routing_id');
            expect(event).to.have.property('Child_node_id');
            expect(event).to.have.property('Root_event_created_at');
            expect(event).to.have.property('Root_event_updated_at');
            expect(event).to.have.property('Eventdata');
          })
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getRootEventsForRoomIDWithTime', () => {
  it('should get root events for room id for time period', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        console.log('RoomID: ' + data.Eventdata.Room_id);
        let timeMark = Number(new Date());
        eventMgr.getRootEventsForRoomIDWithTime('videocall', data.Eventdata.Room_id, timeMark, 10, (events) => {
          console.log(events);
          expect(events.length).to.be.above(0);
          events.map((event) => {
            expect(event).to.have.property('Routing_id');
            expect(event).to.have.property('Child_node_id');
            expect(event).to.have.property('Root_event_created_at');
            expect(event).to.have.property('Root_event_updated_at');
            expect(event).to.have.property('Eventdata');
          })
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getEventCount', () => {
  it('should get event count', (done) => {
    let timeMark = Number(new Date());
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        console.log('RoomID: ' + data.Eventdata.Room_id);

        eventMgr.getEventCount('videocall', data.Eventdata.Room_id, (events) => {
          console.log(events);
          expect(events).to.have.property('Count');
          expect(events.Count).to.be.above(0);
          done();
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getChildEvents', () => {
  it('should create child event', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        const childOptions = {
          node_id: data.Child_node_id,
          event_type: 'videocall',
          from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com',
          time_posted: Number(new Date()),
          root_node_id: data.Root_node_id
        }
        eventMgr.createChildEvent(childOptions, (childData) => {
          console.log(childData);
          expect(childData).to.have.property('Child_node_id');
          eventMgr.getChildEvents(data.Child_node_id, 10, (childNodes) => {
            console.log(childNodes);
            expect(childNodes.length).to.be.above(0);
            childNodes.map((childNode) => {
              expect(childNode).to.have.property('Routing_id');
              expect(childNode).to.have.property('Child_node_id');
              expect(childNode).to.have.property('Event_type');
              expect(childNode).to.have.property('Time_posted');
              expect(childNode).to.have.property('Eventdata');
            });
            done();
          }, (error) => {
            console.log(error);
            expect(true).to.be.false;
            done();
          });
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});


describe('getChildEventsWithTime', () => {
  it('should create child event with time', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      const options = {
        room_name: 'wGMQQtEi8Y@IrisVideoChat.comcast.com',
        event_type: 'videocall',
        time_posted: Number(new Date()),
        from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com'
      }
      eventMgr.createRootEvent(options, (data) => {
        console.log(data);
        expect(data).to.have.property('Root_node_id');
        expect(data).to.have.property('Child_node_id');
        expect(data).to.have.property('Eventdata');
        const childOptions = {
          node_id: data.Child_node_id,
          event_type: 'videocall',
          from: '1bcypode-mda4-8g02-dawk-63fmjrqps4qf@IrisVideoChat.comcast.com',
          time_posted: Number(new Date()),
          root_node_id: data.Root_node_id
        }
        eventMgr.createChildEvent(childOptions, (childData) => {
          console.log(childData);
          expect(childData).to.have.property('Child_node_id');
          let timeMark = Number(new Date());
          eventMgr.getChildEventsWithTime(data.Child_node_id, timeMark, 10, (childNodes) => {
            console.log(childNodes);
            expect(childNodes.length).to.be.above(0);
            childNodes.map((childNode) => {
              expect(childNode).to.have.property('Routing_id');
              expect(childNode).to.have.property('Child_node_id');
              expect(childNode).to.have.property('Event_type');
              expect(childNode).to.have.property('Time_posted');
              expect(childNode).to.have.property('Eventdata');
            });
            done();
          }, (error) => {
            console.log(error);
            expect(true).to.be.false;
            done();
          });
        }, (error) => {
          console.log(error);
          expect(true).to.be.false;
          done();
        });
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('getEventManagerStatus', () => {
  it('should get event manager status', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': appKey});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      let eventMgr = new EventManager({ emApiUrl: eventManagerUrl, jwt: data.Token });
      eventMgr.getEventManagerStatus((data) => {
        console.log(data);
        expect(data).to.have.property('Version');
        done();
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});
