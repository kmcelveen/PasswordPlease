var argv = require('yargs')
    .command('create', 'Create an account', function(yargs){
        yargs.options({
          name: {
            demand: true,
            alias: 'n',
            description: 'Account name (eg: Gmail, Twitter, Github)',
            type: 'string'
          },

          username: {
            demand: true,
            alias: 'u',
            description: 'Account username or email',
            type: 'string'
          },

          password: {
            demand: true,
            alias: 'p',
            description: 'Account password',
            type: 'string'
          },

          masterPassword: {
            demand: true,
            alias: 'm',
            description: 'Master password',
            type: 'string'
          }


        }).help('help')


    })
    .command('get', 'Get an existing account', function(yargs){

      yargs.options({
        name: {
          demand: true,
          alias: 'n',
          description: 'Account name (eg: Gmail, Twitter, Github)',
          type: 'string'
        },
        masterPassword: {
            demand: true,
            alias: 'm',
            description: 'Master password',
            type: 'string'
        }

      }).help('help')

    })
    .help('help')
    .argv;

module.exports = argv