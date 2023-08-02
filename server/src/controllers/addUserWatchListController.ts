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
        const userObj = new WatchListModel({email});
        await userObj.save();
        statusOkay(res, { message: "WatchList updated successfully" });
    } catch(err) {
        serverError(res, {message: err})
    }
}