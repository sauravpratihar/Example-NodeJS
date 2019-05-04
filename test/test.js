let supertest = require("supertest");
let should = require("should");

let server = supertest.agent("http://localhost:8000");

describe("Simple Unit Test", function () {
    it("should return wrong credentials", function (done) {
        server
            .post("/public/login_user")
            .send({ email: 'wrong@email.com', password: 'password' })
            .expect("Content-type", /json/)
            .expect(404)
            .end(function (err, res) {
                should(res.status).equal(404)
                done();
            });
    });

    it("should return wrong password", function (done) {
        server
            .post("/public/login_user")
            .send({ email: 'pratihar.saurav@gmail.com', password: 'wrongpassword' })
            .expect("Content-type", /json/)
            .expect(404)
            .end(function (err, res) {
                should(res.status).equal(403)
                done();
            });
    });

    it("should return token", function (done) {
        server
            .post("/public/login_user")
            .send({ email: 'pratihar.saurav@gmail.com', password: 'saurav123' })
            .expect("Content-type", /json/)
            .expect(404)

            .end(function (err, res) {
                should(res.status).equal(200)
                should(res.body).have.property('token')
                done();
            });
    });

    it("should return unauthorize user", function (done) {
        server
            .get("/private/get_users")
            .expect("Content-type", /json/)
            .expect(401)
            .end(function (err, res) {
                should(res.status).equal(401)
                done();
            });
    });

    it("should return all users while including token", function (done) {
        server
            .get("/private/get_users")
            .set('access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTU2OTc0NTE4LCJleHAiOjE1NTcwNjA5MTh9.wf8bA82P6-Zfu_R2_TuIW3iW0j_og5lNwk18FZn0ZnQ')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.status).equal(200)
                done();
            });
    });

    it("should return invalid url", function (done) {
        server
            .get("/public/thumbnail?url=xyz")
            .expect("Content-type", /json/)
            .expect(422)
            .end(function (err, res) {
                should(res.status).equal(422)
                done();
            });
    });

    it("should return thumbnail url", function (done) {
        server
            .get("/public/thumbnail?url=https://sample-videos.com/img/Sample-jpg-image-500kb.jpg")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.status).equal(200)
                should(res.body).have.property('thumbnail_image')
                done();
            });
    });

});