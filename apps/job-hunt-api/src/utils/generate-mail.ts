import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path:path.resolve(__dirname,'../','../.env')});
const mailconfig = () => {
  let transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY as string,
    }),
  );

  const hbsConfig = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(__dirname, '../views', 'mail-templates/'),
      layoutsDir: path.join(__dirname, '../views/'),
      defaultLayout: '',
    },
    viewPath: path.join(__dirname, '../views', 'mail-templates/'),
    extName: '.hbs',
  };

  transporter.use('compile', hbs(hbsConfig));

  return transporter;
};

export const generateVerificationMail = async (email: string, token: string) => {
  try {
    const transporter = mailconfig();
    const mailConfig = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: 'Email verification',
      template: 'verification',
      context: {
        token: token,
        // @ts-ignore
        platformname: PLATFORM_NAME,
        url: `${process.env.DOMAIN}/verification?token=${token}`,
      },
    };
    let info = await transporter.sendMail(mailConfig,(err,info)=>{
      console.log('====info==',info)
      console.log(err);
      
    });
   
    return info;
  } catch (error) {
    throw error;
  }
};

export const generateResetPasswordMail = async (email: string, token: string) => {
  try {
    const transporter = mailconfig();
    const mailConfig = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: 'Password reset',
      template: 'reset-password',
      context: {
        url: `${process.env.DOMAIN}/reset-pass?token=${token}`,
      },
    };
    let info = await transporter.sendMail(mailConfig);
    console.log(info)
    return info;
  } catch (error) {
    throw error;
  }
};
