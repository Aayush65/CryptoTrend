import { Request, Response } from "express";
import { badRequest, notFound, serverError, statusOkay } from "../views/view";
import WatchListModel from "../models/WatchList";


export async function updateUserWatchListController(req: Request, res: Response) {
    try {
        const { email, watchList } = req.body;
        if (!email || !watchList){
            badRequest(res);
            return;
        }
        console.log(watchList);
        const response = await WatchListModel.findOneAndUpdate({email}, {watchList});
        if (!response) {
            notFound(res);
            return;
        }
        console.log(response);
        statusOkay(res, { message: "WatchList updated successfully" });
    } catch(err) {
        serverError(res, {message: err})
    }
}