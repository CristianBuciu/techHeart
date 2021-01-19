import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addresses: [
    {
      isDefault: {
        type: Boolean,
        default: false,
      },
      fullName: {
        type: String,
      },
      country: {
        type: String,
      },
      line1: {
        type: String,
      },
      line2: {
        type: String,
      },
      city: {
        type: String,
      },
      stateProvinceRegion: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
