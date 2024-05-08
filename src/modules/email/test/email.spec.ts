import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";

chai.use(chaiHttp);
const router = () => chai.request(app)
describe('Email Routes', () => {
  describe('POST /api/v1/email/send-email', () => {
    it('should send email successfully', (done) => {
      const emailData = {
        userName:"userName",
        email: 'ndagijimanapazo64@gmail.com',
        subject: 'Test Email',
        message: 'This is a test email'
      };
      router()
        .post('/api/v1/email/send-email')
        .send(emailData)
        .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Email sent successfully');
        done(err);
      })
    });
  });

  describe('POST /api/v1/email/email-user', () => {
    it('should send email to user successfully',(done) => {
      const emailData = {
        email: 'ndagijimanapazo64@gmail.com',
        subject: 'Test Email',
        message: 'This is a test email'
      };
      router()
        .post('/api/v1/email/email-user')
        .send(emailData)
      .end((err,res)=>{
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Email sent successfully');
        done(err);
      })
    });
  });
});
