import chai,{ expect } from 'chai';
import app from '../../../../server';
import chaiHttp from 'chai-http';



chai.use(chaiHttp);
const router = () => chai.request(app);
describe('User Controller', () => {
  let userId:any;

  it('should create a new user', (done) => {
    router()
      .post('/api/v1/user/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        username: 'john_doe',
      })
      
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('newUser');
        expect(res.body.newUser).to.have.property('firstName').equal('John');
        expect(res.body.newUser).to.have.property('lastName').equal('Doe');
        expect(res.body.newUser).to.have.property('email').equal('john.doe@example.com');
        expect(res.body.newUser).to.have.property('username').equal('john_doe');
        userId = res.body.newUser._id;
        done();
      });
  });

  it('should get a user by ID', (done) => {
    router()
      .get(`/api/v1/user/get-user/${userId}`)
      
      .end((err, res) => {
        if (err) return done(err);
        expect(200)
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id').equal(userId);
        expect(res.body).to.have.property('firstName').equal('John');
        expect(res.body).to.have.property('lastName').equal('Doe');
        expect(res.body).to.have.property('email').equal('john.doe@example.com');
        expect(res.body).to.have.property('username').equal('john_doe');
        done();
      });
  });

  it('should update a user', (done) => {
    router()
      .put(`/api/v1/user/update-user/${userId}`)
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        username: 'jane_doe',
      })
      
      .end((err, res) => {
        if (err) return done(err);
        expect(200)
        expect(res.body).to.be.an('object');
        expect(res.body.updateUser).to.have.property('firstName').equal('Jane');
        expect(res.body.updateUser).to.have.property('lastName').equal('Doe');
        expect(res.body.updateUser).to.have.property('email').equal('jane.doe@example.com');
        expect(res.body.updateUser).to.have.property('username').equal('jane_doe');
        done();
      });
  });

  it('should login a user', (done) => {
    router()
      .post('/api/v1/user/login')
      .send({
        email: 'jane.doe@example.com',
        password: 'password',
      })
      
      .end((err, res) => {
        if (err) return done(err);
        expect(200)
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id').equal(userId);
        expect(res.body).to.have.property('firstName').equal('Jane');
        expect(res.body).to.have.property('lastName').equal('Doe');
        expect(res.body).to.have.property('email').equal('jane.doe@example.com');
        expect(res.body).to.have.property('username').equal('jane_doe');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should delete a user', (done) => {
    router()
      .delete(`/api/v1/user/delete-user/${userId}`)
      
      .end((err, res) => {
        if (err) return done(err);
        expect(200)
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('User deleted successfully');
        done();
      });
  });
});
