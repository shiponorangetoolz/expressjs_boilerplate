const express = require('express');
const GrpcController = require('../controllers/Grpc/GrpcController');

const router = express.Router();

const grpcController = new GrpcController();

router.get('/', grpcController.getAllList);

module.exports = router;
