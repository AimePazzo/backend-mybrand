import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import app from "../../../../server";



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

    it('should return a message to verify email if user is not verified', (done) => {
      router()
        .post('/api/v1/user/login')
        .send({
          email: 'testuser@gmail.com',
          password: 'PasswordForUser',
        })
        .end((err, res) => {
          expect(400)
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal("An Email sent to your account please verify")
          done(err);
        });
    });

    it('should be able to verify email',(done)=>{
      router()
       .get(`/api/v1/user/${userId}/verify/${token}`)
       .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(200);
          done(error);
        });
    })

    it('should return Invalid Token',(done)=>{
      router()
       .get(`/api/v1/user/${userId}/verify/gfdsfcgvhbjnmkjkhgftdrdyuiouytredfgvbhn`)
       .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(400);
          done(error);
        });
    })

    it('should return User not fund',(done)=>{
      router()
       .get(`/api/v1/user/663a6627a763f87c67ae3081/verify/${token}`)
       .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.statusCode).to.equal(400);
          done(error);
        });
    })
       
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

    it('should be able to get all users', (done) => {
      router()
       .get("/api/v1/user/get-users")
       .end((error, response) => {
          expect(response.body).to.be.a("array");
          expect(response.statusCode).to.equal(200);
          done(error);
        });
    })

    it('should be able to get one user ',(done)=>{
      router()
       .get(`/api/v1/user/get-user/${userId}`)
       .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(200);
        done(error);
       })
    })

    it('should return user not found in get user ',(done)=>{
      router()
       .get(`/api/v1/user/get-user/663a6627a763f87c67ae308178`)
       .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(400);
        done(error);
       })
    })
    it('should return a token on successful login', (done) => {
        router()
          .post('/api/v1/user/login')
          .send({
            email: 'testuser@gmail.com',
            password: 'PasswordForUser',
          })
          .end((err, res) => {
            expect(200)
            expect(res.body).to.be.an('object');
            done(err);
          });
      });
      it('should return Invalid credentials', (done) => {
        router()
          .post('/api/v1/user/login')
          .send({
            email: 'testuser@gmail.com',
            password: 'wrongpassword',
          })
          .end((err, res) => {
            expect(401)
            expect(res.body).to.be.an('object');
            expect(res.body.message).equal('Invalid credentials');
            done(err);
          });
      });
      
    
      it("should be able login as admin",(done)=>{
        router()
         .post('/api/v1/user/admin-login')
         .send({
          email: process.env.ADMIN,
          password: process.env.PASSWORD,
          })
         .end((err, res) => {
            
            expect(200)
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message','Login successful');
            done(err);
          });
      })

      it("should return Not authorized",(done)=>{
        router()
         .post('/api/v1/user/admin-login')
         .send({
            email:'admin@example.com',
          password: 'wrongpassword',
          })
         .end((err, res) => {
            expect(401)
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message','Not Authorized');
            done(err);
          });
      })

      it("should return invalid credentials",(done)=>{
        router()
         .post('/api/v1/user/admin-login')
         .send({
            email:process.env.ADMIN,
          password: 'wrongpassword',
          })
         .end((err, res) => {
            
            expect(401)
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message','Invalid credentials');
            done(err);
          });
      })
     
      

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

    it("Should return User update error", (done) => {
      router()
        .put(`/api/v1/user/update-user/jnjnviebvpiqeb`)
        .send({
          name: "TestingUser-Updated",
          email: "testuser@gmail.com",
        })
        .end((error, response) => {
            expect(400)
          expect(response.body).to.be.a("object");
          done(error);
        });
    });

    it("Should be able to delete registered user", (done) => {
      router()
        .delete(`/api/v1/user/delete-user/${userId}`)
        .end((error, response) => {
          expect(response.body).to.be.a("object");
            expect(response.body).to.have.property("message","User deleted successfully");
          done(error);
        });
    });
    it("Should return user not found in delete", (done) => {
      router()
        .delete(`/api/v1/user/delete-user/663a68464c04014799cf3150`)
        .end((error, response) => {
          expect(response.body).to.be.a("object");
            expect(response.body).to.have.property("message","User not found");
          done(error);
        });
    });
});