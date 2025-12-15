const Attendance = require('../models/Attendance');
const Registration = require('../models/Registration');

const markAttendance = async (req, res) => {
    try {
        const {registrationId, attended} = req.body;
        if (!registrationId) res.status(400).json({message: "Can't mark attendance without a valid registration ID"});
        
        const reg = await Registration.findById(registrationId);
        if (!reg) return res.status(404).json({message: "Error 404: Registration not found"});

        let att = await Attendance.findOne({registration: registrationId});
        if (!att) {
            att = await Attendance.create({registration: registrationId, attended: !!attended});
        }
        else {
            att.attended = !!attended;
            await att.save();
        }
        res.json(att);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Error marking attendance"});
    }
};

const getAttendanceByWorkshop = async (req, res) => {
    try {
        const workshopId = req.params.workshopId;
        const regs = await Registration.find({workshop: workshopId});
        const regIds = regs.map(r=>r._id);
        const attendance = await Attendance.find({registration: {$in: regIds}}).populate({
            path: 'registration',
            populate: {path: 'user', select: 'name email'}
        });
        res.json(attendance);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message: "Error fetching attendance details"});
    }
};

module.exports = {markAttendance, getAttendanceByWorkshop};