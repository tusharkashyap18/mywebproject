const moment = require('moment')

module.exports = {
    formatdate: function (date, format){
        return moment(date).format(format)
    },
}
