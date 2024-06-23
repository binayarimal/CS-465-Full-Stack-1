const mongoose = require('mongoose');
const Trips = require('../models/travlr');
const Users = require('../models/user');
const Trip = mongoose.model('trips');
const User = mongoose.model('users')

// const getUser = (req, res, callback) => {
//     console.log(req.payload);
//     if (req.payload && req.payload.email) {            
//       User
//         .findOne({ email : req.payload.email })         
//         .exec((err, user) => {
//           if (!user) {
//             return res
//               .status(404)
//               .json({"message": "User not found"});
//           } else if (err) {
//             console.log(err);
//             return res
//               .status(404)
//               .json(err);
//            }
//           callback(req, res, user.name);                
//          });
//     } else {
//       return res
//         .status(404)
//         .json({"message": "User not found"});
//     }
//   };



const tripsList = async(req, res) => {
    const q = await Trip
        .find({}) // no Filter, return all records
        .exec();
    
    if(!q){
        return res
            .status(404)
            .json(err);
    }else{
        return res
            .status(200)
            .json(q)
    }
};

const tripsFindByCode = async(req, res) => {
    const q = await Trip
        .find({'code' : req.params.tripCode}) // no Filter, return all records
        .exec();
    
    if(!q){
        return res
            .status(404)
            .json(err);
    }else{
        return res
            .status(200)
            .json(q)
    }
};

const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description

    });

    const q = await newTrip.save();

    if(!q){
        return res
        .status(400)
        .json(err);

    }else{
        return res
        .status(200)
        .json(q);

    }
};


// const tripsAddTrip = async (req, res) => {
//     getUser(req, res,
//         async (req, res) => {
//             const newTrip = new Trip({
//                 code: req.body.code,
//                 name: req.body.name,
//                 length: req.body.length,
//                 start: req.body.start,
//                 resort: req.body.resort,
//                 perPerson: req.body.perPerson,
//                 image: req.body.image,
//                 description: req.body.description

//             });

//             const q = await newTrip.save();

//             if(!q){
//                 return res
//                 .status(400)
//                 .json(err);

//             }else{
//                 return res
//                 .status(200)
//                 .json(q);

//             }

//         }
//     );
// }


// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
   // console.log(req.params);
   // console.log(req.body);

    const q = await Trip
    .findOneAndUpdate(
    {'code': req.params.tripCode },
    {
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
    }
   )
    .exec();
    if(!q){ // Database returned no data
    return res
    .status(400)
    .json(err);
    } else { // Return resulting updated trip
    return res
    .status(201)
    .json(q);
    }
    // Uncomment the following line to show results of operation
     // on the console
// console.log(q);
    };

// const tripsUpdateTrip = async (req, res) => {
//     getUser(req, res,
//         (req, res) => {
//             Trip
//                 .findOneAndUpdate({'code': req.params.tripCode },{
//                     code: req.body.code,
//                     name: req.body.name,
//                     length: req.body.length,
//                     start: req.body.start,
//                     resort: req.body.resort,
//                     perPerson: req.body.perPerson,
//                     image: req.body.image,
//                     description: req.body.description },
//                     { new: true })
//                 .then(trip => {
//                     if (!trip) {
//                         return res
//                             .status(404)
//                             .send({
//                                 message: "Trip not found with code" + req.params.tripCode
//                             });
//                     }
//                     res.send(trip);
//                 }).catch(err => {
//                     if (err.kind === 'ObjectId') {
//                         return res
//                             .status(404)
//                             .send({
//                                  message: "Trip not found with code" + req.params.tripCode
//                             });
//                     }
//                     return res
//                         .status(500) // server error
//                         .json(err);
//                  });
//             }
//     );
// } 
    
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsUpdateTrip,
    tripsAddTrip
};