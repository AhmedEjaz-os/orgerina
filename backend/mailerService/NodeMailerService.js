const nodemailer = require("nodemailer");

const sendEmail = async (email, headers) => {
try {
    const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    secure: true,
    auth: {
    user: process.env.GMAIL_AUTH_EMAIL,
    pass: process.env.GMAIL_AUTH_PASS,
    }, });
    await transporter.sendMail({
    from: process.env.GMAIL_AUTH_EMAIL,
    to: email,
    subject: "Confirm Your Email",
    html: HtmlTemplate(email, headers)
    });

    return true
} catch (error) {
    return false
} 
};

const HtmlTemplate = (email, headers) => {
    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="en" style="height: 100%;">
    <style>
        p, h1, h2, h5, button{
            font-family: 'Poppins', sans-serif;
        }
        button:hover{
            cursor: pointer;
        }
        html, body{
            width: 100%;
        }
        .template-parent{
            
        }
        .template-logo-image{
            
        }
    </style>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirm Email</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Poppins:wght@100;200;300;400;500;700;800&display=swap" rel="stylesheet">
    </head>
    <body style="height: max-content; margin: 0px; background: linear-gradient(130deg, #9921e8 0%, #163fb9 74%, #9921e8 100% ); background-attachment: fixed; padding: 30px; width: 60%;">
        <div class="template-parent" style="border-radius: 30px;  height: max-content; background-color: white; padding: 20px 1em; margin: 0 auto;">
            <div>
                <h2 style="text-transform: uppercase; text-align: center;">Welcome!!!</h2>
            </div>
            <div class="section-1" style="padding-top: 20px; margin: 0 auto; width: fit-content;">
                <img src='https://imageupload.io/ib/t1JuCjwsZoK4dNu_1694111424.png' alt="LOGO PNG" class="template-logo-image" style="object-fit: contain; width: 80%;">
            </div>
            <div class="section-2" style="margin: 0px; margin-top: 70px;">
                <h3 style="font-weight: normal; margin: 0 auto; font-size: 20px; width: fit-content; text-align: center;">Verify your Email to start using your account</h3>
                <input type="text" value=${headers} style="display: none;" id="tokenInput" />
                <input type="text" value=${email} style="display: none;" id="emailInput" />
                <div style="margin: 0 auto; width: fit-content;">
                    <a href=http://localhost:5000/signIn/email-verification/${headers}/${email} target="_blank"><button style="color: white; background-color: black; padding: 10px 48px; border: none; border-radius: 10px; font-size: 16px; margin-top: 25px; cursor: pointer;">Verify Email</button></a>
                </div>
            </div>
            <div class="section-3" style="margin-top: 70px; border-top: 1px dashed black;">
                <p style="padding: 1em; margin: 0 auto; width: fit-content; text-align: center; padding-bottom: 0px;">This Email is sent by <b>ORGERINA</b></p>
            </div>
        </div>
    </body>
    </html>`;
    return html;
}

 module.exports = sendEmail;