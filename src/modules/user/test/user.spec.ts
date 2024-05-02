import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import app from "../../../../server";
import { fileURLToPath } from "url";


chai.use(chaiHttp);
const router = () => chai.request(app);

describe("User Test Cases", () => {

    let userId="";
    let token="";

    it("Should be able register new user", (done) => {
      router()
        .post("/api/v1/user/signup")
        .send({
          firstName: "TestingUser",
          lastName: "TestingUser",
          userName: "User",
          email: "testuser@gmail.com",
          password: "PasswordForUser",
        })
        
        .end((error, response) => {
            expect(200);
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.have.property('newUser');
          expect(response.body.newUser).to.have.property('firstName')
          expect(response.body.newUser).to.have.property('lastName')
          expect(response.body.newUser).to.have.property('email')
          expect(response.body.newUser).to.have.property('userName')
          userId = response.body.newUser._id;
          token = response.body.token.token;
          expect(response.body).to.have.property("message","An Email sent to your account please verify");
          done(error);
        });
    });
       
    it("Should not add same user twice", (done) => {
      router()
        .post("/api/v1/user/signup")
        .send({
            firstName: "TestingUser",
            lastName: "TestingUser",
            userName: "User",
            email: "testuser@gmail.com",
            password: "PasswordForUser",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.have.property("message");
          expect(response.body.message).to.equal("User already exists");
          done(error);
        });
    });

    it('should return a token on successful login', (done) => {
        router()
          .post('/api/v1/user/login')
          .send({
            email: 'testuser@gmail.com',
            password: 'PasswordForUser',
          })
          .end((err, res) => {
            if (err) return done(err);
            expect(200)
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
    
      it('should return a message to verify email if user is not verified', (done) => {
        router()
          .post('/api/v1/user/login')
          .send({
            email: 'unverifieduser@gmail.com',
            password: 'PasswordForUser',
          })
         
          .end((err, res) => {
            if (err) return done(err);
            expect(400)
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal("An Email sent to your account please verify")
            done();
          });
      });
    
      

    it("Should be able to update registered user", (done) => {
      router()
        .put(`/api/v1/user/update-user/${userId}`)
        .send({
          name: "TestingUser-Updated",
          email: "testuser@gmail.com",
        })
        .end((error, response) => {
            expect(200)
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("updateUser");
          done(error);
        });
    });

    it("Should be able to delete registered user", (done) => {
      router()
        .delete(`/api/v1/user/delete-user/${userId}`)
        .send({
          email: "testuser@gmail.com",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
            expect(response.body).to.have.property("message","User deleted successfully");
          done(error);
        });
    });
});