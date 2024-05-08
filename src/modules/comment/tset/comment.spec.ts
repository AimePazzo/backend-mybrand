import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server'

import fs from 'fs'
import path from 'path';

const imagePath = path.join(__dirname, '../../../../public/image/69180880-2138-11eb-8b06-03db3ef1abad.jpeg');
const imageBuffer = fs.readFileSync(imagePath)
chai.use(chaiHttp);
const router = () => chai.request(app);
let token: string;
let id: string;
let commentId:string;
const loginUser = (done: Function) => {
    router()
        .post('/api/v1/user/login')
        .send({ email: process.env.ADMIN, password: process.env.PASSWORD })
        .end((error, res) => {
            token = res.body.token;
            done(error, token);
        })
}

describe('Comment Test', () => {

    before((done) => {
        loginUser((err: any, token: string) => {
            token = token
            done();
        })
    })

    it('should be able to create a project to comment ', (done) => {
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

    it('should be able to post a comment to the project', (done) => {
        router()
            .post(`/api/v1/comments/post-comment/${id}`)
            .send({
                comment: 'test comment',
                rating: 5
            })
            .set('authorization', 'Bearer ' + token)
        .end((err, res) => {
            
            expect(200)
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message', 'Success');
            expect(res.body).to.have.property('data');
            commentId = res.body.data._id;
            done(err);
        })
    })

    it('should return error ', (done) => {
        router()
            .post(`/api/v1/comments/post-comment/asdvdfbgnykuikik6j`)
           
            .set('authorization', 'Bearer ' + token)
        .end((err, res) => {
            expect(500)
            expect(res.body).to.be.an('object');
            done(err);
        })
    })

    it('should be able to get all comments', (done) => {
        router()
           .get(`/api/v1/comments/get-comments`)
           .set('authorization', 'Bearer '+ token)
           .end((err, res) => {
                
                expect(200)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('array');
                done(err);
            });
    })

    it('should be able to get comment of project',(done)=>{
        router()
           .get(`/api/v1/comments/get-comment/${id}`)
           .set('authorization','Bearer '+token)
           .end((err, res) => {
                
                expect(200)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('array');
                done(err);
            });
    })
    it('should return error when we get comment by wrong id',(done)=>{
        router()
           .get(`/api/v1/comments/get-comment/jnveibvieruiwer456`)
           .set('authorization','Bearer '+token)
           .end((err, res) => {
                
                expect(500)
                expect(res.body).to.be.an('object');
                done(err);
            });
    })
    it('should be able to update a comment', (done) => {
        router()
           .put(`/api/v1/comments/update-comment/${id}`)
           .send({
                rating: 3
            })
           .set('authorization', 'Bearer '+ token)
           .end((err, res) => {
                
                expect(200)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Comment status updated successfully');
                done(err);
            })
    })

    it('should return error when we update a comment with wrong ', (done) => {
        router()
           .put(`/api/v1/comments/update-comment/jnjenvwehvvuwherf789909`)
           .set('authorization', 'Bearer '+ token)
           .end((err, res) => {
                
                expect(500)
                expect(res.body).to.be.an('object');
                done(err);
            })
    })

    it('should be able to delete a comment',(done)=>{
        router()
           .delete(`/api/v1/comments/delete-comment/${commentId}`)
           .set('authorization','Bearer '+token)
           .end((err, res) => {
                
                expect(200)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Comment deleted successfully');
                done(err);
            });
    })

    it('should return error when we delete a comment by wrong id',(done)=>{
        router()
           .delete(`/api/v1/comments/delete-comment/nuuefefjrefejrk798`)
           .set('authorization','Bearer '+token)
           .end((err, res) => {
                
                expect(500)
                expect(res.body).to.be.an('object');
                done(err);
            });
    })

    it('should be able to delete a comment by project id', (done) => {
        router()
           .delete(`/api/v1/comments/delete-project-comment/${id}`)
           .set('authorization', 'Bearer '+ token)
           .end((err, res) => {
                
                expect(200)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Comment deleted successfully');
                done(err);
            });
    })

    it('should be error when id is wrong', (done) => {
        router()
           .delete(`/api/v1/comments/delete-project-comment/jnenviwebwevw980`)
           .set('authorization', 'Bearer '+ token)
           .end((err, res) => {
                
                expect(500)
                expect(res.body).to.be.an('object');
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
});