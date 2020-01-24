const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/app');

const cheerio = require('cheerio');
const should = chai.should();

chai.use(chaiHttp);

describe('Index Page', () => {
    it('should load index page', async () => {
        const res = await chai.request(server)
            .get('/');
            
        res.should.have.status(200);
        const body = res.text;

        const $ = cheerio.load(body);

        const headers = $('h1');
        headers.length.should.be.eql(1);
        $(headers[0]).text().should.be.eql('Basic Express with Hot Reload');

        const menu = $('ul');
        menu.length.should.be.eql(1);

        const menuItems = $('li');
        menuItems
            .filter(index => 
                $(menuItems[index]).text() === 'Sign In'
            )
            .length
            .should.be.eql(1);

        body.toLowerCase().should.contain('welcome');
        body.toLowerCase().should.contain('user:');
    });

    it('should have sign out on menu if user is authenticated', async () => {
        const authClient = require('../helpers/auth-client')(chai, server);

        const signedInClient = await authClient.signIn();
        const res = await signedInClient
                .get('/');

        res.should.have.status(200);
        const body = res.text;

        const $ = cheerio.load(body);
        
        const menuItems = $('li');
        menuItems
            .filter(index => 
                $(menuItems[index]).text() === 'Sign Out'
            )
            .length
            .should.be.eql(1);

        authClient.signOut();
    });
});