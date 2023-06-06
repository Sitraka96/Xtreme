/*const stripe = require('stripe')('sk_test_51JwBkXJidBi9QAXqLQ9hI5UbrtBiWh1Pd16sYAsSaHbx56R98UwTqhQEui4PUHX06hkOjjNuh0ZhzWE923Tw83NY00TWap9guJ');
const Reservation = require('../models/Reservation/index');

exports.register = async (request, res) => {
let payemment = false; 
const token = request.body.stripeToken.id
  // console.log("test")
  // console.log(request.body.stripeToken.id)
  const amount = request.body.price 
  const charge = await stripe.charges.create({
    amount: amount*100,
    currency: 'eur',
    description: 'Reservation d\' evenement par',
    source: token,
  },
  async function(error, result){
    if(error){
      // console.log(error)
      
      res.status(400).json({msg:error.raw.code})
    }
    if(result){
      
        console.log(result)
        console.log("request.body.userId : "+request.body.userId)
        console.log("request.body.eventId : "+request.body.eventId)
        var now = new Date();
        const reservation = await Reservation.update({
                checked: "paid#"+now
            },{where:{
                userId: request.body.userId,
                eventId: request.body.eventId,
            }})
      console.log("paid")
       console.log(reservation)
      // mreserve
      res.status(200).json({succes: true})
    }
  })
}*/