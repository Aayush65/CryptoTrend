import { Request, Response } from "express";
import WatchListModel from "../models/WatchList";
import { badRequest, notFound, serverError, statusOkay } from "../views/view";

export async function getUserWatchListController(req: Request, res: Response) {
    try {
        const email = req.params.email;
        if (!email) {
            badRequest(res);
            return;
        }
        const watchList = await WatchListModel.findOne({ email }).select("watchList");
        if (!watchList) {
            notFound(res);
            return;
        }
        statusOkay(res, watchList);
    } catch (error) {
        serverError(res, {message: error});
    }
}