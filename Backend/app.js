const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/MentorStudents', {useNewUrlParser:true});

const adsSchema = new Schema({
    "companyId" : {
        type: Schema.Types.ObjectId,
        required: true
      },
    "primaryText" : String,
    "headline" : String,
    "description" : String,
    "CTA" : String,
    "imageUrl" : String
});

const companiesSchema = new Schema({
    "id": {
        type: Schema.Types.ObjectId,
        required: true
      },
    "name" : String,
    "url" : String
})


const ads = mongoose.model('ads2', adsSchema);
const companies = mongoose.model('companies2', companiesSchema);


app.get('/data', (req, res) => {
  ads.find({}, function(err, ads) {
    if (err) return console.error("ERROR IN FUNCTION" +err);
    res.json(ads);
});
});

app.get('/companyname',(req, res) =>{
    const id = req.query.id;

    companies.find({_id: id}, function(err, com) {
        if (err) return console.error("ERROR IN FUNCTION" +err);
        res.json(com);
    });

})

app.get('/search', (req, res) => {
    const searchTerm = req.query.key;

    if(searchTerm.length==0) {
        res.redirect("/data")
    }
    else {
        companies.find({name: new RegExp(searchTerm,'gmi')}, function(err, com) {
            if (err) return console.error("ERROR IN FUNCTION" +err);
            if (com.length===0) {
                ads.find({$or: [{primaryText: new RegExp(searchTerm,'gmi')  },  {headline:  new RegExp(searchTerm,'gmi') }, {description:  new RegExp(searchTerm,'gmi') } ]}, function(err, ads) {
                    if (err) return console.error("ERROR IN FUNCTION" +err);
                    res.json(ads)
                });
            }else{
                // res.json(com)
                ads.find({companyId: com[0]._id}, function(err, ads) {
                    if (err) return console.error("ERROR IN FUNCTION" +err);
                    res.json(ads);
                });
    
                
            }
            
        })
    }

    
  });

app.listen(8080, () => console.log('Server started on port 8080'));