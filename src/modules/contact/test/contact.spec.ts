import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";

chai.use(chaiHttp);

let token: string;
const loginUser = async (done: Function) => {
  const res = await chai.request(app)
    .post('/api/v1/user/login')
    .send({ email: "ndagijimanapazo64@gmail.com", password: "Admin@123" })
    .end((error, res) => {
      token = res.body.token;
      done(error, token);
    })
}

describe('Contact Routes', () => {
  // Assuming you have mocked data or a test database
  let mockContactId = 'mock-contact-id';

  before((done) => {
    loginUser((err: any, token: string) => {
      token = token
      done();
    })
  })

  describe('POST /api/contact/send-message', () => {
    it('should create a new message', async () => {
      const res = await chai.request(app)
        .post('/api/v1/contact/send-message')
        .send({
          userName: 'John Doe',
          email: 'john.doe@example.com',
          subject: 'Test Subject',
          message: 'Test Message'
        });

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Message sent');
      expect(res.body.ContactDetail).to.be.an('object');
      expect(res.body.ContactDetail.userName).to.equal('John Doe');
      expect(res.body.ContactDetail.email).to.equal('john.doe@example.com');
      expect(res.body.ContactDetail.subject).to.equal('Test Subject');
      expect(res.body.ContactDetail.message).to.equal('Test Message');
      mockContactId = res.body.ContactDetail._id
    });
  });

  describe('POST /api/contact/send-message', () => {
    it('should return internal server error', async () => {
      const res = await chai.request(app)
        .post('/api/v1/contact/send-message')
        .send({});
      expect(res).to.have.status(500);
    });
  });

  describe('GET /api/v1/contact/get-messages', () => {
    it('should get all messages', async () => {
      const res = await (((await chai.request(app)
        .get('/api/v1/contact/get-messages')
        .set('authorization', 'Bearer ' + token)
      )))

      expect(res).to.have.status(200);
      //   expect(res.body).to.be.an('array');
    });
  });

  describe('GET /api/v1/contact/get-message/:id', () => {
    it('should get a message by ID', async () => {
      const res = await chai.request(app).get(`/api/v1/contact/get-message/${mockContactId}`)
        .set('authorization', 'Bearer ' + token)


      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('GET /api/v1/contact/get-message/:id', () => {
    it('should return error when id is wrong', async () => {
      const res = await chai.request(app).get(`/api/v1/contact/get-message/jbbeuvbiuerviywer7890`)
        .set('authorization', 'Bearer ' + token)

      expect(res).to.have.status(500);
      expect(res.body).to.be.an('object');
    });
  });


  describe('PUT /api/v1/contact/update-message/:id', () => {
    it('should update a message by ID', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/contact/update-message/${mockContactId}`)
        .set('authorization', 'Bearer ' + token)

        .send({
          userName: 'Updated Name',
          email: 'updated.email@example.com',
          subject: 'Updated Subject',
          message: 'Updated Message'
        });

      expect(res).to.have.status(200);
      expect(res.body.updateContact).to.be.an('object');
      expect(res.body.updateContact.userName).to.equal('Updated Name');
      expect(res.body.updateContact.email).to.equal('updated.email@example.com');
      expect(res.body.updateContact.subject).to.equal('Updated Subject');
      expect(res.body.updateContact.message).to.equal('Updated Message');
    });
  });

  describe('PUT /api/v1/contact/update-message/:id', () => {
    it('should return error in update with wrong ID', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/contact/update-message/jjjerfwer6789iherir`)
        .set('authorization', 'Bearer ' + token)
        .send({
          userName: 'Updated Name',
          email: 'updated.email@example.com',
          subject: 'Updated Subject',
          message: 'Updated Message'
        });

      expect(res).to.have.status(500);
    });
  });

  describe('DELETE /api/v1/contact/delete-message/:id', () => {
    it('should delete a message by ID', async () => {
      const res = await chai.request(app).delete(`/api/v1/contact/delete-message/${mockContactId}`)
        .set('authorization', 'Bearer ' + token)


      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object")
      expect(res.body).to.have.property("message")
      expect(res.body.message).to.equal('Message deleted successfully');
    });
  });

  describe('DELETE /api/v1/contact/delete-message/:id', () => {
    it('should return error a message because of wrong ID', async () => {
      const res = await chai.request(app).delete(`/api/v1/contact/delete-message/jhrjferfjerf9803q4jfe`)
        .set('authorization', 'Bearer ' + token)
      expect(res).to.have.status(500);
      
    });
  });
});
