import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server'

import fs from 'fs'
import path from 'path';

const imagePath = path.join(__dirname, '../../../../public/image/69180880-2138-11eb-8b06-03db3ef1abad.jpeg');
const filePath = path.join(__dirname, '../../../../public/image/BUILD.txt');
const fileBuffer = path.join(filePath)
const imageBuffer = fs.readFileSync(imagePath)
chai.use(chaiHttp);
const router = () => chai.request(app);
let token: string;
let id: string;
const loginUser = (done: Function) => {
    router()
        .post('/api/v1/user/login')
        .send({ email: process.env.ADMIN, password: process.env.PASSWORD })
        .end((error, res) => {
            token = res.body.token;
            done(error, token);
        })
}
describe('Project Test', () => {

    before((done) => {
        loginUser((err: any, token: string) => {
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
            .attach("image", imageBuffer, '69180880-2138-11eb-8b06-03db3ef1abad.jpeg')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                expect(200)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Project Created successfully!');
                expect(res.body).to.have.property('projectDetail');
                id = res.body.projectDetail._id;
                done(err);
            });
    })
    it('should return fail', (done) => {
        router()
            .post('/api/v1/project/post-project')
            .field('title', 'New Project')
            .field('description', 'Project description')
            .field('field', 'Field')
            .attach("image", fileBuffer, 'BUILD.txt')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Only images are allowed');
                done(err);
            });
    })

    it('should return not token', (done) => {
        router()
            .post('/api/v1/project/post-project')
            .end((err, res) => {
                expect(401)
                done(err);
            });
    })

    //failed to authenticate token
    it('should return failed to authenticate token', (done) => {
        
        router()
            .post('/api/v1/project/post-project')
            .field('title', 'New Project')
            .field('description', 'Project description')
            .field('field', 'Field')
            .attach("image", fileBuffer, 'BUILD.txt')
            .set('authorization','Bearer ' +`${process.env.WRONG_TOKEN}`)
            .end((err, res) => {
                expect(401)
                done(err);
            });
    })

    it('should get message of please upload an image', (done) => {
        router()
            .post('/api/v1/project/post-project')
            .field('title', 'New Project')
            .field('description', 'Project description')
            .field('field', 'Field')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(400)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Please upload an image');
                done(err);
            });
    })
    it('should return not found', (done) => {
        router()
            .post('/api/v1/project/post-projects')
            .field('title', 'New Project')
            .field('description', 'Project description')
            .field('field', 'Field')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(404)
                done(err);
            });
    })
    it('should get message of internal server error', (done) => {
        router()
            .post('/api/v1/project/post-project')
            .attach("image", imageBuffer, '69180880-2138-11eb-8b06-03db3ef1abad.jpeg')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(500)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Internal server error');
                done(err);
            });
    })
    it('should be able to get all projects', (done) => {
        router()
            .get('/api/v1/project/get-projects')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(200)
                expect(res.body).to.be.an('array');
                done(err);
            });
    })
  
    it('should be able to get a single project', (done) => {
        router()
            .get(`/api/v1/project/get-project/${id}`)
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(200)
                expect(res.body).to.be.an('object');
                done(err);
            });
    })
    it('should return internal server error', (done) => {
        router()
            .get(`/api/v1/project/get-project/qwertyuioiuytdsgh`)
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(500)
                expect(res.body).to.be.an('object');
                done(err);
            });
    })
    it('should be able to update a project', (done) => {
        router()
            .put(`/api/v1/project/update-project/${id}`)
            .field('title', 'New Project')
            .field('description', 'Project description')
            .field('field', 'Field')
            .attach("image", imageBuffer, '69180880-2138-11eb-8b06-03db3ef1abad.jpeg')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(200)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('updateProject');
                expect(res.body.updateProject).to.be.an('object');
                expect(res.body).to.have.property('message', 'Project updated successful');
                done(err);
            });

    })

    it('should get message of please upload an image', (done) => {
        router()
            .put(`/api/v1/project/update-project/${id}`)
            .field('title', 'New Project')
            .field('description', 'Project description')
            .field('field', 'Field')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(400)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Please upload an image');
                done(err);
            });
    })

    it('should get message of internal server error', (done) => {
        router()
            .put(`/api/v1/project/update-project/jhbvhjbfvhjfdvegg88eeu98`)
            .attach("image", imageBuffer, '69180880-2138-11eb-8b06-03db3ef1abad.jpeg')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(500)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Internal server error');
                done(err);
            });
    })
    it('should be able to delete a project', (done) => {
        router()
            .delete(`/api/v1/project/delete-project/${id}`)
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(200)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Project and associated comments deleted');

                done(err);
            });
    })

    it('should return internal server error', (done) => {
        router()
            .delete(`/api/v1/project/delete-project/fgdfghjkoiuy434567`)
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                
                expect(500)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Internal server error');

                done(err);
            });
    })
})
