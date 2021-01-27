const { model, Schema } = require("mongoose");

const OrganizationSchema = new Schema({
  torreId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  picture: {
    type: String,
    default: "",
  },
});

//    Export
const OrganizationModel = model("organizations", OrganizationSchema);
module.exports = OrganizationModel;
