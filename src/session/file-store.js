const fs = require('fs');
const path = require('path');

const fileStoreBuilder = (session) => {
    
    const Store = session.Store;

    class FileStore extends Store {

        constructor(options = {}) {
            super(options);

            if (!options.path) {
                options.path = path.join(__dirname, '..', '..', 'session-store');
            }

            if (!fs.existsSync(options.path)) {
                fs.mkdirSync(options.path);
            }

            this.options = options;
        }

        sessionPathFor(sid) {
            return path.join(this.options.path, sid);
        }

        serializeSession(sessionObj) {
            return JSON.stringify(sessionObj);
        }

        deserializeSession(sessionStr) {
            return JSON.parse(sessionStr);
        }

        /**
         * Removes a session from disk.
         * 
         * @param {string} sid session ID
         * @param {function} cb callback (error)
         */
        destroy(sid, cb) {
            const sessionPath = this.sessionPathFor(sid);

            if (fs.existsSync(sessionPath)) {
                fs.unlinkSync(sessionPath);
            }

            if (cb) {
                return cb(null);
            }

            return null;
        }

        /**
         * Retrieves a session from disk.
         * 
         * @param {string} sid session ID
         * @param {function} cb callback (error, data)
         */
        get(sid, cb) {
            const sessionPath = this.sessionPathFor(sid);

            if (fs.existsSync(sessionPath)) {
                return cb(
                    null,
                    this.deserializeSession(fs.readFileSync(sessionPath))
                );
            }

            return cb(null, null);
        }

        /**
         * Stores the session in disk.
         * 
         * @param {string} sid session ID
         * @param {object} sessionObj session object itself
         * @param {function} cb callback (error)
         */
        set(sid, sessionObj, cb) {
            const sessionPath = this.sessionPathFor(sid);
            
            fs.writeFileSync(sessionPath, this.serializeSession(sessionObj));

            return cb(null);
        }

    };

    return FileStore;
};

module.exports = fileStoreBuilder;