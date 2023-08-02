import mongoose from "mongoose";

const Schema = mongoose.Schema;

const watchListSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    follows: {
        type : Array, 
        "default" : [] 
    }
});

const WatchListModel = mongoose.model("watchlist", watchListSchema);

export default WatchListModel;