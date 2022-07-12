import nodemailer from 'nodemailer';
import multer from 'multer';


let Storage=multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'./upload')
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname + "_" + Date.now() + "_" + file.originalname )
    }
});

let upload=multer({
    storage:Storage
}).array('file');

 let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "nodirbekmamadaliyev1998@gmail.com",
        pass: "Nodirbek1972@"
    }
})

export const sendMessageService = (req, res) => {

    upload(req,res,function(err){
        if(err){
            console.log(err)
            res.end("Something went wrong")
        }
        else{
            let details = {
                from: "nodirbekdeveloper2018@gmail.com",
                to: req.body.to,
                subject: req.body.subject,
                text: req.body.text,
                attachments:[
                    {
                        path:req.files[0].path
                    },
                    {
                        path:req.files[1].path
                    }
                ]
            }
            console.log(details);
            mailTransporter.sendMail(details, (err) => {
                if(err){
                    console.log("if has an error", err);
                    res.send("Yuborilmadi");
                }else{
                    console.log("email has send !");
                    res.send("Yuborildi");
                }
            })
        }
    })
}
