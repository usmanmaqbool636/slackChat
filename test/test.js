const chai = require('chai');
const chaiHttp = require('chai-http');
const user = require('../model/personModel')
const fs = require('fs');
const path= require('path');
const Server = require('../server');
const should = chai.should;
const expect = chai.expect;
chai.use(chaiHttp)
// const server = chai.request(Server)
chai.should();
// chai.expect();
const server = "http://localhost:5000"
describe("api testing", () => {
    before((done) => {
        user.findOneAndDelete({ name: 'm.usman' }, (err, doc) => {
            if (!err) {
                done();
            }
        })
    })
    describe("get  '/' ", () => {

        it("get home psage", (done) => {
            chai.request("http://localhost:5000")
                .get('/')
                .auth("token", "this is token")
                .end((err, res) => {
                    // console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(200);
                    res.body.should.to.be.a("object");
                    res.body.should.to.deep.include({ status: true });
                    done();
                })
        })



        it('404 error handle ', (done) => {
            chai.request("http://localhost:5000")
                .get('/undefinedroute')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    // err
                    done();
                })
        })
    })
    describe("post testing", function () {
        it("create user", (done) => {
            const user = { age: 22, gender: 'male', name: `m.usman` }
            chai
                .request(server)
                .post('/db/addPerson')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(err).to.be.null
                    done()
                })
        })
        it("email is already registered 1100", (done) => {
            const user = { age: 22, gender: 'male', name: "m.usman" }
            chai
                .request(server)
                .post('/db/addPerson')
                .send(user)
                .end((err, res) => {
                    // console.log(res);
                    expect(res).to.have.status(409);
                    expect(res.body).to.be.a("object");
                    done()
                })
        })
    })

    describe("files", () => {
        const directories= path.dirname('uploads')
        it("upload file", (done) => {
            chai.request(server)
                .post('/files/multiple')
                // attach('imageField', fs.readFileSync('avatar.png'), 'avatar.png')
                .attach("images",  fs.readFileSync(path.resolve('uploads')+'/images1.jpeg'), "images.jpeg")
                // .send({fileName:"testFile.jpeg"})
                .field("fileName", "testFile.jpeg")
                .end((err, res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.deep.include({status:true});
                    expect(res.body).to.have.property("status")
                    done()
                })
        })
    })
})
