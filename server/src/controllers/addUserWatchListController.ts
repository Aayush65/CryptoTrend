import { Request, Response } from "express";
import { badRequest, serverError, statusOkay } from "../views/view";
import WatchListModel from "../models/WatchList";


export async function addUserWatchListController(req: Request, res: Response) {
    try {
        const { email } = req.body;
        if (!email){
            badRequest(res);
            return;
        }
        const data = await WatchListModel.findOne({ email }).select("_id");
        if (data && data._id) {
            statusOkay(res, { id: data._id });
            return;
        }
        const userObj = new WatchListModel({ email, watchList: {} });
        await userObj.save();
        statusOkay(res, { id: userObj._id });
    } catch(err) {
        serverError(res, {message: err})
    }
}