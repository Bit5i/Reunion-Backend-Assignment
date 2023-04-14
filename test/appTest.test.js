import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

// import { expect } from 'chai';
// import { describe, it } from 'mocha';
// import request from 'supertest';


chai.use(chaiHttp);
   
  /**
       * Test POST /api/authenticate
       * RETURN: return a JWT token.
       */
  describe('Authentication',  () => {
    it('should return a token when a valid username and password are provided',  () => {
        chai.request(app)
            .post('/api/authenticate')
            .send({"username": "karan", "password": "karan"})
            .then((res) => {
              // console.log(res.body);
              res.should.have.status(200);
              res.body.should.have.property('JWT_token')
              done();
            });
    });

  
  /**
         * Test Get /api/posts/{id}
         * RETURN: a post with number of likes and comment
         */
  describe('Get Post by id',  () => {
    it('should return  a post with number of likes and comments ',  () => {
        const postid = "";
        chai.request(app)
            .post('/api/posts'+ postid)
            .send({"username": "karan", "password": "karan"})
            .then((res) => {
              // console.log(res.body);
              res.should.have.status(200);
              res.body.should.have.property('JWT_token')
              done();
            });
    });

  });
