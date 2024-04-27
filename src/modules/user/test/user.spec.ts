import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import app from "../../../../server";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("User Test Cases", () => {

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
            expect(res.body).to.have.property('token');
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
            expect(res.body).to.have.property('message').equal('An Email sent to your account please verify');
            done();
          });
      });
    
      it('should return "Invalid credentials" if login fails', (done) => {
        router()
          .post('/api/v1/user/login')
          .send({
            email: 'invaliduser@gmail.com',
            password: 'WrongPassword',
          })
          
          .end((err, res) => {
            if (err) return done(err);
            expect(401)
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').equal('Invalid credentials');
            done();
          });
      });

    it("Should be able to update registered user", (done) => {
      router()
        .put("/api/v1/user/update-user")
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
        .delete("/api/v1/user/delete-user")
        // .set("Authorization", `Bearer ${token}`)
        .send({
          email: "testuser@gmail.com",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
            expect(response.body).to.have.key("deleteUser")
          done(error);
        });
    });
  
  });