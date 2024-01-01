const whitelist = ['http://localhost:8080', 'http://localhost:3000', 'https://develop.d2zxv9sn1yne9h.amplifyapp.com']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    allowHeaders: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}

module.exports = corsOptions;