const nodemailer = require('nodemailer');
require('dotenv').config()
const fs = require('fs')

const sendEmail = async (commande) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let h = String(today.getHours());
    let m = String(today.getMinutes());
    let s = String(today.getSeconds());

    today = dd + '/' + mm + '/' + yyyy;
    let time = h + ':' + m 

    const message = `<!DOCTYPE html>
                    <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Document</title>
                      </head>
                      <body>
                          <div class="">
                              <b>Bonjour <em> ${commande.client.nomClient} </em></b>
                              <p>A la date du ${today} - ${time} &nbsp;; vous avez passé commande sur notre site, tels que:</p>                            
          
                              <ul>
                              ` 
                              +
                              commande.panier?.map(p => `<li>${p.ligneCommande.produit.nomProd} - ${p.ligneCommande.qte} x ${p.ligneCommande.produit.prixProd} Ar </li>`)
                              +
                              `
                              </ul>
                              <p>Votre commande a bien été prise en compte.  Elle sera acheminée par "COLIS EXPRESS" à l'adresse que vous avez fournis : </p>
                              <p>&nbsp;&nbsp;&nbsp;&nbsp;  ${commande.client.adresse.lotClient} -  ${commande.client.adresse.villeClient} </p>
                              <p>Votre commande sera livré d'ici peu.</p>
                          </div>
                      </body>
                    </html>`

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
        to: commande.client.emailClient, // List of recipients
        subject: "Confirmation de l'envoi d'une commande", // Subject line
        html :  message
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
