import mongoose from "mongoose";

const Schema = mongoose.Schema;

const watchListSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    watchList: {
        type : Object, 
        "default" : {} 
    }
});

const WatchListModel = mongoose.model("watchlist", watchListSchema);

export default WatchListModel;