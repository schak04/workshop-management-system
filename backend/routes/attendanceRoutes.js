const express = require('express');
const router = express.Router();
const {markAttendance, getAttendanceByWorkshop} = require('../controllers/attendanceController');
const {verifyToken, requireRole} = require('../middleware/authMiddleware');

router.post('/mark', verifyToken, requireRole(['instructor', 'admin']), markAttendance);
router.get('/workshop/:workshopId', verifyToken, requireRole(['instructor', 'admin']), getAttendanceByWorkshop);
// TODO in a future version: restrict instructors to gettinga attendance details for their own workshops only

module.exports = router;