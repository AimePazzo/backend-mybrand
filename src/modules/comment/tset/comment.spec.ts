import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";

chai.use(chaiHttp);
const expect = chai.expect;


describe.only('Comment Routes', () => {
  // Assuming you have mocked data or a test database
  const mockUserId = 'mock-user-id';
  const mockCommentId = 'mock-comment-id';
  const mockProjectId = 'mock-project-id';

  describe('POST /comments', () => {
    it('should create a new comment', async () => {
      const res = await chai.request(app)
        .post(`/api/v1/comments/post-comment/${mockProjectId}`)
        .send({ 
            comment:'nice comment',
            rating: 5,
            user: mockUserId
            /* Your comment data here */ })
        .set('Authorization', `Bearer ${mockUserId}`);

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Success');
      // Add more assertions as needed
    });
  });

  describe('GET /comments', () => {
    it('should get all comments', async () => {
      const res = await chai.request(app).get('/api/v1/comments/get-comments');

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Success');
      // Add more assertions as needed
    });
  });

  describe('GET /comments/:id', () => {
    it('should get a comment by ID', async () => {
      const res = await chai.request(app).get(`/api/v1/comments/get-comment/${mockCommentId}`);

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Success');
      // Add more assertions as needed
    });
  });

  describe('PUT /comments/:id', () => {
    it('should update a comment status', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/comments/update-comment/${mockCommentId}`)
        .send({ status: 'Approval' });

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Comment status updated successfully');
      // Add more assertions as needed
    });
  });
});
