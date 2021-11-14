const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail = async (client,panier) => {
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure : true,
        auth: {
          user: process.env.MON_EMAIL,
          pass: process.env.MON_PASS
        }
     });
    
     const mailOptions = {
        from: process.env.MON_EMAIL, // Sender address
        to: client.emailClient, // List of recipients
        subject: 'Send email', // Subject line
        html : `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div class="">
                    <b>Bonjour zaza</b>
                    <p>Nous avons réçu votre commande qui sont les suivants : </p>
                    ${panier?.map(p => p.ligneCommande.produit)}
                    <p>aaaaaaaaaaaaaaaaaaaaaaaa</p>
                    <p>Votre commande sera livré d'ici peu.</p>
                </div>
            </body>
            </html>
        ` 
    };
    
    await transport.sendMail(mailOptions, function(err, info) {
       if (err) {
         console.log(err)
       } else {
         console.log(info);
       }
    });
}

module.exports = sendEmail;
