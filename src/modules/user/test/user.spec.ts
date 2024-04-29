import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import app from "../../../../server";
import sinon from "sinon";
import userRepository from "../repository/userRepository";

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
        // it("should verify user email", async () => {
    
        //   // Stub the findUserById function from userRepository
        //   const findUserByIdStub = sinon.stub(userRepository, "findUserById").resolves();
    
        //   // Stub the verifyUser function from userRepository
        //   const verifyUserStub = sinon.stub(userRepository, "verifyUser").resolves();
    
        //   // Stub the UpdateUserVerified function from userRepository
        //   const updateUserVerifiedStub = sinon.stub(userRepository, "UpdateUserVerified").resolves();
    
        //   const res = await chai
        //     .request(app)
        //     .get(`/api/v1/users/${userId}/verify/${token}`);
    
        //   expect(res).to.redirectTo("public/verify.html");
        //   expect(res).to.have.status(200);
    
        //   // Restore the stubbed functions
        //   findUserByIdStub.restore();
        //   verifyUserStub.restore();
        //   updateUserVerifiedStub.restore();
        // });
    
        // it("should return error for invalid token", async () => {
          
    
        //   // Stub the findUserById function from userRepository
        //   const findUserByIdStub = sinon.stub(userRepository, "findUserById").resolves();
        //   const verifyUserStub = sinon.stub(userRepository, "verifyUser").resolves();
        //   // Stub the verifyUser function from userRepository
        //   const res = await chai
        //     .request(app)
        //     .get(`/api/v1/users/${userId}/verify/${token}`);
    
        //   expect(res).to.have.status(400);
        //   expect(res.body.message).to.equal("Invalid Token");
          
          
        //   // Restore the stubbed functions
        //   findUserByIdStub.restore();
        //   verifyUserStub.restore();
        // });
    
        // it("should return error for user not found", async () => {
        //   const mockUserId = "non-existing-user-id";
        //   const mockToken = "mock-token";
    
        //   // Stub the findUserById function from userRepository
        //   const findUserByIdStub = sinon.stub(userRepository, "findUserById").resolves(null);
    
        //   const res = await chai
        //     .request(app)
        //     .get(`/api/v1/users/${mockUserId}/verify/${mockToken}`);
    
        //   expect(res).to.have.status(400);
        //   expect(res.body.message).to.equal("User not found");
    
        //   // Restore the stubbed functions
        //   findUserByIdStub.restore();
        // });
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