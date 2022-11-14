const Message = require("../model/message.model");
const fs = require("fs-extra");

//add new message
exports.addMessage = async (req, res) => {
    const { staffId, message } = req.body;
    try {

        const file = req.files ? req.files.uploadFile : '';
        const path = `uploads/${staffId}`;
        const correctPath = `${path}/` + file.name;

        if (file) {
            console.log('File have')

            if (fs.existsSync(correctPath)) {
                res.status(409).json('File is already exist!');
            } else {

                if (req.files && message) {

                    if (!fs.existsSync(path)) {
                        //path not exist create new path
                        fs.mkdirSync(path);
                        console.log('path created');
                        console.log(`file path , ${path}/` + file.name);
                    }

                    console.log('move to path');
                    console.log(`file path , ${path}/` + file.name);

                    //send message and upload file to server
                    const newMessage = new Message({ staffId, message, uploadFile: correctPath });
                    file.mv(`${path}/` + file.name, function (err, result) {
                        if (err) { throw err; }
                        console.log('Correct Path ', correctPath);
                        newMessage.save();
                        res.status(201).json('Message with file saved successfully');
                    });

                } else {

                    if (fs.existsSync(path)) {
                        console.log('move to path');
                        console.log(`file path , ${path}/` + file.name);
                    } else {
                        fs.mkdirSync(path);
                        console.log('path created');
                        console.log(`file path , ${path}/` + file.name);
                    }

                    //set upload location path with file name
                    const newMessage = new Message({ staffId, uploadFile: correctPath });
                    file.mv(`${path}/` + file.name, function (err, result) {
                        if (err) { throw err; }
                        console.log('File only ', newMessage)
                        newMessage.save();
                        res.status(201).json('File uploaded successfully!');
                    });
                }
            }


        } else {
            console.log('No File ')
            const newMessage = new Message({ staffId, message });
            newMessage.save()
            res.status(201).json('Message saved successfully');
        }


    } catch (error) {
        res.status(500).json(error);
    }
};


exports.getMessage = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
};