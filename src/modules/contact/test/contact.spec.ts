import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";

chai.use(chaiHttp);

describe('Contact Routes', () => {
  // Assuming you have mocked data or a test database
  let mockContactId = 'mock-contact-id';

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

  describe('GET /api/v1/contact/get-messages', () => {
    it('should get all messages', async () => {
      const res = await chai.request(app).get('/api/v1/contact/get-messages');

      expect(res).to.have.status(200);
    //   expect(res.body).to.be.an('array');
    });
  });

  describe('GET /api/v1/contact/get-message/:id', () => {
    it('should get a message by ID', async () => {
      const res = await chai.request(app).get(`/api/v1/contact/get-message/${mockContactId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('PUT /api/v1/contact/update-message/:id', () => {
    it('should update a message by ID', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/contact/update-message/${mockContactId}`)
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

  describe('DELETE /api/v1/contact/delete-message/:id', () => {
    it('should delete a message by ID', async () => {
      const res = await chai.request(app).delete(`/api/v1/contact/delete-message/${mockContactId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object")
      expect(res.body).to.have.property("message")
      expect(res.body.message).to.equal('Message deleted successfully');
    });
  });
});
