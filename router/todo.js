var router = require('express').Router();
const TodoApi = require('../controller/todo');

router.post('/create', TodoApi.create);

router.put('/update', TodoApi.update);

router.put('/list', TodoApi.list);

module.exports = router;