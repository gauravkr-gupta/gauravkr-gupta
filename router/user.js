var router = require('express').Router();
const UserApi = require('../controller/user');

router.get('/create', UserApi.create);

module.exports = router;