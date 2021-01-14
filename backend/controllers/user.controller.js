import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generate.token.js";
import Profile from "../models/profile.model.js";

//! DESCRIPTION : Auth user & get token
//! ROUTE       :POST to /api/users/login
//! ACCESS      : PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//! DESCRIPTION : Register a new user
//! ROUTE       :POST to /api/users
//! ACCESS      : PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  const profile = await Profile.create({ user });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profileId: profile._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//! DESCRIPTION : Get user profile
//! ROUTE       : GET  /api/users/profile
//! ACCESS      : PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = await Profile.findOne({ user: req.user._id });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      country: profile.country,
      line1: profile.line1,
      line2: profile.line2,
      city: profile.city,
      stateProvinceRegion: profile.stateProvinceRegion,
      postalCode: profile.postalCode,
      phoneNumber: profile.phoneNumber,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//! DESCRIPTION : Update user profile
//! ROUTE       : PUT  /api/users/profile
//! ACCESS      : PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = await Profile.findOne({ user: req.user._id });

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    profile.country = req.body.country || profile.country;
    profile.line1 = req.body.line1 || profile.line1;
    profile.line2 = req.body.line2 || profile.line2;
    profile.city = req.body.city || profile.city;
    profile.stateProvinceRegion =
      req.body.stateProvinceRegion || profile.stateProvinceRegion;
    profile.postalCode = req.body.postalCode || profile.postalCode;
    profile.phoneNumber = req.body.phoneNumber || profile.phoneNumber;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    const updatedProfile = await profile.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      country: updatedProfile.country,
      line1: updatedProfile.line1,
      line2: updatedProfile.line2,
      city: updatedProfile.city,
      stateProvinceRegion: updatedProfile.stateProvinceRegion,
      postalCode: updatedProfile.postalCode,
      phoneNumber: updatedProfile.phoneNumber,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile, updateUserProfile };
