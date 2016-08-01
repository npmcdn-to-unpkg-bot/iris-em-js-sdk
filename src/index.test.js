import { expect } from 'chai';
import { AuthManager } from './index';

describe('anonymousLogin', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('anonymousLoginGetUserInformation', () => {
  it('should return anonymous user', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      authMgr.userInformation(data.Token, (data) => {
        expect(data.error.message).to.equal('Anonymous user');
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

describe('anonymousLoginValidateToken', () => {
  it('should verify that token is valid', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      authMgr.validateUserAccessToken(data.Token, (data) => {
        console.log(data);
        expect(data.error.message).to.equal('Valid token');
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

describe('anonymousLoginLogout', () => {
  it('should logout successfully', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      authMgr.logout(data.Token, (data) => {
        expect(data.status).to.equal('User logged out');
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

describe('anonymousLoginDecodeToken', () => {
  it('should logout successfully', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      const decoded = authMgr.decodeToken(data.Token);
      expect(decoded.header.alg).to.equal('ES256');
      expect(decoded.header.typ).to.equal('JWT');
      expect(decoded.payload.iss).to.equal('irisauth');
      done();
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('emailRegister', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.emailRegister('UserName', 'test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      const responseBody = error.response;
      expect(responseBody.status).to.equal(409);
      done();
    });
  });
});

describe('emailLogin', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.emailLogin('test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('emailLoginGetUserInformation', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.emailLogin('test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      authMgr.userInformation(data.Token, (data) => {
        expect(data.TokenType).to.equal('Email');
        expect(data.Email).to.equal('test1@test.com');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('emailLoginValidateAccessToken', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.emailLogin('test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      authMgr.validateUserAccessToken(data.Token, (data) => {
        expect(data.error.message).to.equal('Valid token');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('emailLoginLogout', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager({'managementApiUrl': 'https://iris.xrtc.me/', 'appKey': '6y14ljTXnjEgeHYZ0+R5NHA8FEEVg9wR'});
    authMgr.emailLogin('test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      authMgr.logout(data.Token, (data) => {
        expect(data.status).to.equal('User logged out');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});
