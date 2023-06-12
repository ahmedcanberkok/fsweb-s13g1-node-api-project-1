// SUNUCUYU BU DOSYAYA KURUN
const express = require('express');
const server = express();
const userMOdel = require("./users/model");

server.use(express.json());


//----------POST ADD
server.post("/api/users", async (req, res) => {
    try {
        let { name, bio } = req.body;
        if (!name || !bio) {
            res.status(400).json({ message: "Lütfen kullanıcı için bir name bio sağlayın " })
        } else {
            let insertedUser = await userModel.insert({ name, bio });
            res.status(201).json(insertedUser);
        }
    } catch (error) {
        res.status(500).json({
            message: "Veritabanına kaydedilirken bir hata oluştu"
        });
    }
});

//--------------GET
server.get("/api/users", async (req, res) => {
    try {
        let allUsers = await userMOdel.find();
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı biligileri bulunamadi" });

    }
});

server.get("/api/users/:id", async (req, res) => {
    try {
        let user = await userMOdel.findById(req.params.id)
        if (!user) {
            res.status(400).json({ message: "Belirtilen ID li kullanıcı bulunamadi" });
        } else {
            res.json(user)
        }

    } catch (error) {
        res.status(500).json({ message: "Kullanıcı bilgsi alınamadı" });

    }
});

//--------Delete
server.delete ("/api/users/:id", async (req,res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({message:"Belirtilen ID'li kullancı bulunamadi"});
            
        } else { await userModel.remove (req.params.id);
            res.json(user);
            
        }
    } catch (error) {
        res.status(500).json({message:"Kullanıcı silinimedi"});
    }
});

//-----------PUT Update

server.put("/api/user/:id", async (req, res) => {
    try {
        const {name,bio} = req.body;
        if (!name || !bio ) {
            res.status(400).json({message:"Lütfen kullanıcı için bir name bio sağlayın "});
            
        } else {
            const updatedUser = await userModel.update(req.params.id, {name,bio});
            res.json(updatedUser);
            
        }
    } catch (error) {
        res.status(500).json({message: "Kullanıcı bilgileri güncellenemedi"})

    }

})

module.exports = server; // SERVERINIZI EXPORT EDİN {}
