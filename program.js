require('dotenv').config();
const http = require('http');
const nodemailer = require('nodemailer');
const idMail = process.env.USERNAME;
const pwdMail = process.env.PASSWORD;

http.createServer(function (req, res) {    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

    // Check the method and block all ip except localhost
    if(req.method === 'POST' ) {
        var reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
            sendMail(reqBody);
            res.end();
        });
    }
    else {
        res.write("You need to use POST method & be allowed to access to this API");
        res.end();
    }
}).listen(20002); 


function sendMail(request) {
    var parseReq = request.split("&");

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: idMail,
            pass: pwdMail
        }
    });

    const mailOptions = {
        from: idMail, // sender address
        to: 'Arthur.Titos2@gmail.com', 
        subject: 'Porfolio - Contact',
        html: '<p>' + parseReq[1] + '<br>' + parseReq[2] + '<br>' + parseReq[3] + '</p>'
      };

    transporter.sendMail(mailOptions, function(error, info){
        if(error)
           return console.log(error);

        console.log('Mail sent: ' + info.response);
   });
   
   transporter.close();
}


