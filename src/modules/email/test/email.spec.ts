import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import nodemailer from "nodemailer";
import app from "../../../../server";

chai.use(chaiHttp);

describe('Email Routes', () => {
  describe('POST /api/v1/email/send-email', () => {
    it('should send email successfully', async () => {
      const emailData = {
        userName:"userName",
        email: 'ndagijimanapazo64@gmail.com',
        subject: 'Test Email',
        message: 'This is a test email'
      };

      // Stub nodemailer's sendMail function
      const sendMailStub = sinon.stub().callsFake((options, callback) => {
        callback(null, { response: 'OK' });
      });

      // Stub nodemailer's createTransport function
      const createTransportStub = sinon.stub(nodemailer, 'createTransport').callsFake(() => {
        return {
          sendMail: sendMailStub
        } as unknown as nodemailer.Transporter<any>;
      });

      const res = await chai.request(app)
        .post('/api/v1/email/send-email')
        .send(emailData);

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Email sent successfully');

      // Restore the stubbed functions
      createTransportStub.restore();
    });
  });

  describe('POST /api/v1/email/email-user', () => {
    it('should send email to user successfully', async () => {
      const emailData = {
        email: 'ndagijimanapazo64@gmail.com',
        subject: 'Test Email',
        message: 'This is a test email'
      };

      // Stub nodemailer's sendMail function
      const sendMailStub = sinon.stub().callsFake((options, callback) => {
        callback(null, { response: 'OK' });
      });

      // Stub nodemailer's createTransport function
      const createTransportStub = sinon.stub(nodemailer, 'createTransport').callsFake(() => {
        return {
          sendMail: sendMailStub
        } as unknown as nodemailer.Transporter<any>;
      });

      const res = await chai.request(app)
        .post('/api/v1/email/email-user')
        .send(emailData);

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Email sent successfully');

      // Restore the stubbed functions
      createTransportStub.restore();
    });
  });
});
