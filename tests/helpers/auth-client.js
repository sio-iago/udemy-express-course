/**
 * Creates a new auth client for testing.
 * 
 * @param {Chai} chai chai test object
 * @param {Express} server express app server
 */
const authClientBuilder = (chai, server) => {

    const client = chai.request.agent(server);

    const signIn = async () => {
        const res = await client
            .post('/auth/signin')
            .send({username: 'chai-test', password: '12345'});
        res.should.have.status(200);

        return client;
    }

    const signOut = async () => {
        const res = await client.get('/auth/signout')
        res.should.have.status(200);
        client.close();

        return res;
    };

    return {
        client: client,
        signIn: signIn,
        signOut: signOut,
    };
};

module.exports = authClientBuilder;