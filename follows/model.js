import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("FollowModel", schema);

export default model;
