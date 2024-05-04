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
             expect(res.body).to.have.property('message');
             
             done();
         });
        })
    })