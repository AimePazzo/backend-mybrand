import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server'

import fs from 'fs'
import path from 'path';

const imagePath = path.join(__dirname, '../../../../public/image/69180880-2138-11eb-8b06-03db3ef1abad.jpeg');
const imageBuffer = fs.readFileSync(imagePath )
chai.use(chaiHttp);
const router = () => chai.request(app);
let token: string;
let id :string;
const loginUser = (done:Function) =>{
    router()
   .post('/api/v1/user/login')
   .send({email:process.env.ADMIN, password:process.env.PASSWORD})
   .end((error,res)=>{
    token = res.body.token;
    done(error,token);
   })
}
describe('Project Test', () => {

    before((done)=>{
        loginUser((err:any,token:string)=>{
            token = token
            done();
        })
    })

    it('should be able to create a new project', (done) => {
        router()
        .post('/api/v1/project/post-project')
        .field('title', 'New Project')
        .field('description', 'Project description')
        .field('field', 'Field')
        .attach("image",imageBuffer,'69180880-2138-11eb-8b06-03db3ef1abad.jpeg')
        .set('authorization','Bearer ' + token)
        .end((err, res) => {
             if (err) return done(err);
             expect(200)
             expect(res.body).to.be.an('object');
             expect(res.body).to.have.property('message','Project Created successfully!');
             expect(res.body).to.have.property('projectDetail');
             id = res.body.projectDetail._id;
             done();
         });
        })
    it('should be able to get all projects', (done) => {
        router()
        .get('/api/v1/project/get-projects')
        .set('authorization','Bearer ' + token)
        .end((err, res) => {
             if (err) return done(err);
             expect(200)
             expect(res.body).to.be.an('array');
             done();
         });
    })
    it('should be able to get a single project', (done) => {
        router()
        .get(`/api/v1/project/get-project/${id}`)
        .set('authorization','Bearer ' + token)
        .end((err, res) => {
             if (err) return done(err);
             expect(200)
             expect(res.body).to.be.an('object');
             done();
         });
        })
    it('should be able to update a project', (done) => {
        router()
        .put(`/api/v1/project/update-project/${id}`)
        .field('title', 'New Project')
        .field('description', 'Project description')
        .field('field', 'Field')
        .attach("image",imageBuffer,'69180880-2138-11eb-8b06-03db3ef1abad.jpeg')
        .set('authorization','Bearer '+ token)
        .end((err, res) => {
             if (err) return done(err);
             expect(200)
             expect(res.body).to.be.an('object');
             expect(res.body).to.have.property('updateProject');
             expect(res.body.updateProject).to.be.an('object');
             expect(res.body).to.have.property('message', 'Project updated successful');
             done();
         });
    
    })
    it('should be able to delete a project', (done) => {
        router()
        .delete(`/api/v1/project/delete-project/${id}`)
        .set('authorization','Bearer '+ token)
        .end((err, res) => {
             if (err) return done(err);
             expect(200)
             expect(res.body).to.be.an('object');
             expect(res.body).to.have.property('message','Project and associated comments deleted');
             
             done();
         });
    })
    })
 