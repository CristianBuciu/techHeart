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
    if (!user.confirmed) {
      throw new Error("You need to confirm the email first in order to log in");
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
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
      addresses: profile.addresses,
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

  if (user) {
    user.name = req.body.name || user.name;
   

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//! DESCRIPTION : Get all user addresses
//! ROUTE       : GET  /api/users/profile/addresses
//! ACCESS      : PRIVATE
const getUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = await Profile.findOne({ user: req.user._id });

  if (user) {
    // const addAddress = {
    //   country: req.body.country || profile.country,
    //   line1: req.body.line1 || profile.line1,
    //   line2: req.body.line2 || profile.line2,
    //   city: req.body.city || profile.city,
    //   stateProvinceRegion:
    //     req.body.stateProvinceRegion || profile.stateProvinceRegion,
    //   postalCode: req.body.postalCode || profile.postalCode,
    //   phoneNumber: req.body.phoneNumber || profile.phoneNumber,
    // };
    // profile.addresses.push(addAddress);

    res.json(profile.addresses);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//! DESCRIPTION : Put a new address
//! ROUTE       : PUT  /api/users/profile/addresses
//! ACCESS      : PRIVATE
const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = await Profile.findOne({ user: req.user._id });

  if (user) {
    const addAddress = {
      country: req.body.country || profile.country,
      line1: req.body.line1 || profile.line1,
      line2: req.body.line2 || profile.line2,
      city: req.body.city || profile.city,
      stateProvinceRegion:
        req.body.stateProvinceRegion || profile.stateProvinceRegion,
      postalCode: req.body.postalCode || profile.postalCode,
      phoneNumber: req.body.phoneNumber || profile.phoneNumber,
    };
    profile.addresses.push(addAddress);
    const updatedProfile = await profile.save();

    res.json({
      _id: user._id,
      addresses: updatedProfile.addresses,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserAddresses,
  addAddress,
};
