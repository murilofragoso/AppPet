const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario')

router.post('/', controller.novo)
router.get('/', controller.listar)
router.put('/', controller.atualizar)
router.delete('/', controller.excluir)

module.exports = router; 