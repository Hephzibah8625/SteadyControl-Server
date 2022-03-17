import express from 'express';
import mongoose from "mongoose";
import cors from "cors";


const PORT = process.env.PORT || 3000;
const Schema = mongoose.Schema;


const CitizenSchema = new Schema({
    id: Number,
    name: String,
    city_id: Number,
    groups: Object
}, {collection: 'citizens'});

const CitizenData = mongoose.model('CitizenData', CitizenSchema);


const CitySchema = new Schema({
    id: Number,
    name: String,
    data: String
}, {collection: 'cities'});

const CityData = mongoose.model('CityData', CitySchema);



const app = express();
app.use(cors());


app.get('/cities', async (req, res) => {
   CityData.find().then(cities => res.status(200).json(cities));
})

app.get('/citizens', async (req, res) => {
    CitizenData.find().then(citizens => res.status(200).json(citizens));
})



const start = async () => {
    try {
        // 4 columns
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.vcr61.mongodb.net/steady-control?retryWrites=true&w=majority')

        // 5 columns
        // await mongoose.connect('mongodb+srv://admin:admin@cluster0.vcr61.mongodb.net/steady-control5?retryWrites=true&w=majority')

        // 3 columns
        // await mongoose.connect('mongodb+srv://admin:admin@cluster0.vcr61.mongodb.net/steady-control3?retryWrites=true&w=majority')


        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start().then();
