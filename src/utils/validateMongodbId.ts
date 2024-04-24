const mongoose = require("mongoose");
export const validateMongoDbId = (id:string) => {
  const isValid: string = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This id is not valid or not Found");
};