var router = require('express').Router();
const UserApi = require('../controller/user');

router.post('/create', UserApi.create);

module.exports = router;