import express from "express";
import skyRouter from "./sky/skyController";
import constellationRouter from "./constellation/constellationController";
import starRouter from "./star/starController";

const api = express.Router();

api.use("/sky", skyRouter);
api.use("/constellation", constellationRouter);
api.use("/star", starRouter);

export default api;