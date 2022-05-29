var router = require('express').Router();
const UserApi = require('../controller/user');

router.post('/create', UserApi.create);

router.post('/login', UserApi.login);

module.exports = router;