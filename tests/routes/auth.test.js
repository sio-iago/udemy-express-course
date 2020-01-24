const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/app');

const cheerio = require('cheerio');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth Flow', () => {
    it('should have form rendered correctly', async () => {
        const res = await chai.request(server)
            .get('/auth/signin');

            res.should.have.status(200);

            const body = res.text;

            const $ = cheerio.load(body);

            const form = $('form');

            // Verify form action is empty and method is post
            form.attr('method').toLowerCase().should.be.eql('post'); 
            expect(form.attr('action')).to.be.undefined;

            // Verify username form input
            const usernameInput = $(form.children()).find('input[name="username"]');
            expect(usernameInput).not.to.be.null;
            usernameInput[0].attribs['type'].should.be.eql('text');

            // Verify password form input
            const passwordInput = $(form.children()).find('input[name="password"]');
            expect(passwordInput).not.to.be.null;
            passwordInput[0].attribs['type'].should.be.eql('password');

            // Verify submit button
            const submitInput = $(form.children()).find('input[type="submit"]');
            expect(submitInput).not.to.be.null;
            submitInput[0].attribs['type'].should.be.eql('submit');
    });

    it('should sign in correctly', async () => {
        const authClient = require('../helpers/auth-client')(chai, server);

        await authClient.signIn();
        await authClient.signOut();
    });
});