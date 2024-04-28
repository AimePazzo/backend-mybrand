import chai,{ expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server'; // Import your Express app


chai.use(chaiHttp);
const router = ()=> chai.request(app)
describe('Project Controller', () => {
  let projectId:any;
  let token:string;
 const imagePath = 'C:\\Users\\Pazzo\\Pictures\\Camera Roll\\82528385-a73f-488f-9003-513321283a6b.png';


   // Login user and get token
   before((done) => {
    router()
      .post('/api/v1/user/admin-login')
      .send({
        email: 'aime@gmail.com', // Provide your test user email
        password: '1234' // Provide your test user password
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });


  it('should create a new project', (done) => {
    router()
      .post('/api/v1/project/post-project')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'New Project')
      .field('description', 'Project description')
      .field('field', 'Field')
    //   .attach('image', imagePath) // Adjust the path to your image
      
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('projectDetail');
        expect(res.body.projectDetail).to.have.property('title').equal('New Project');
        expect(res.body.projectDetail).to.have.property('description').equal('Project description');
        expect(res.body.projectDetail).to.have.property('field').equal('Field');
        expect(res.body).to.have.property('message').equal('Project Created successful!');
        projectId = res.body.projectDetail._id;
        done();
      });
  });

  // Get all projects
  it('should get all projects', (done) => {
    router()
      .get('/api/v1/project/get-projects')
      
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  // Get a project by ID
  it('should get a project by ID', (done) => {
    router()
      .get(`/api/v1/project/get-project/${projectId}`)
      
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id').equal(projectId);
        done();
      });
  });

  // Update a project
//   it('should update a project', (done) => {
//     router()
//       .put(`/api/v1/project/update-project/${projectId}`)
//       .field('title', 'Updated Project')
//       .field('description', 'Updated project description')
//       .field('field', 'Updated Field')
//       .attach('image', imagePath) // Adjust the path to your updated image
      
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.be.an('object');
//         expect(res.body.updateProject).to.have.property('title').equal('Updated Project');
//         expect(res.body.updateProject).to.have.property('description').equal('Updated project description');
//         expect(res.body.updateProject).to.have.property('field').equal('Updated Field');
//         done();
//       });
//   });

  // Delete the project
  after(async () => {
    if (projectId) {
      await router().delete(`/api/v1/project/delete-project/${projectId}`);
    }
  });
});
