import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generate.token.js";
import Profile from "../models/profile.model.js";
import mongoose from "mongoose";
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
    res.json(profile.addresses);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//! DESCRIPTION : Add a new address
//! ROUTE       : POST  /api/users/profile/addresses
//! ACCESS      : PRIVATE
const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = await Profile.findOne({ user: req.user._id });

  if (user) {
    const addAddress = {
      fullName: req.body.fullName || profile.fullName,
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

//! DESCRIPTION : Get an address by its ID
//! ROUTE       : GET  /api/users/profile/addresses/:id
//! ACCESS      : PRIVATE

const getAddressById = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  const address = await profile.addresses.find(
    (x) => x._id.toString() === req.params.id
  );

  if (address) {
    res.json(address);
  } else {
    res.status(404);
    throw new Error("Address not found");
  }
});

//! DESCRIPTION : Update an address by ID
//! ROUTE       : PUT  /api/users/profile/addresses/:id
//! ACCESS      : PRIVATE
const updateAddress = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  const address = await profile.addresses.find(
    (x) => x._id.toString() === req.params.id
  );

  if (address) {
    address.fullName = req.body.fullName || address.fullName;
    address.country = req.body.country || address.country;
    address.line1 = req.body.line1 || address.line1;
    address.line2 = req.body.line2 || address.line2;
    address.city = req.body.city || address.city;
    address.stateProvinceRegion =
      req.body.stateProvinceRegion || address.stateProvinceRegion;
    address.postalCode = req.body.postalCode || address.postalCode;
    address.phoneNumber = req.body.phoneNumber || address.phoneNumber;

    const updatedProfile = await profile.save();
    const updatedAddress = await updatedProfile.addresses.find(
      (x) => x._id.toString() === req.params.id
    );

    res.json({
      _id: updatedAddress._id,
      fullName: updatedAddress.fullName,
      country: updatedAddress.country,
      line1: updatedAddress.line1,
      line2: updatedAddress.line2,
      city: updatedAddress.city,
      stateProvinceRegion: updatedAddress.stateProvinceRegion,
      postalCode: updatedAddress.postalCode,
      phoneNumber: updatedAddress.phoneNumber,
    });
  } else {
    res.status(404);
    throw new Error("Address not found");
  }
});

//! DESCRIPTION : Delete an address by its ID
//! ROUTE       : DELETE /api/users/profile/addresses/:id
//! ACCESS      : PRIVATE

const deleteAddressById = asyncHandler(async (req, res) => {
  const deletedAddress = await Profile.updateOne(
    { user: req.user._id, "addresses._id": req.params.id },
    { $pull: { addresses: { _id: req.params.id } } }
  );

  if (deletedAddress) {
    res.json("Address deleted");
  } else {
    res.status(404);
    throw new Error("Address not found");
  }
});

//! DESCRIPTION : Add Product to favorites
//! ROUTE       : Post /api/users/profile/favorites
//! ACCESS      : PRIVATE

const addItemToFavorites = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body._id);
  const profile = await Profile.findOne({ user: req.user._id })
    .populate("favoriteProducts")
    .exec();
  if (profile && product) {
    const findProduct = profile.favoriteProducts.find((x) =>
      x.equals(req.body._id)
    );
    if (findProduct) {
      null;
    } else {
      profile.favoriteProducts.push(product);
    }

    await profile.save();

    res.json("Product added to favorites");
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//! DESCRIPTION : Get all favorites
//! ROUTE       : GET /api/users/profile/favorites
//! ACCESS      : PRIVATE

const getAllFavorites = asyncHandler((req, res) => {
  Profile.findOne({ user: req.user._id })
    .populate("favoriteProducts")
    .exec(function (err, products) {
      if (products !== null) {
        res.json(products.favoriteProducts);
      } else {
        res.status(404);
        throw new Error(`An error has ocured : ${err}`);
      }
    });
});

//! DESCRIPTION : Delete an favorite product by its ID from Users and Products
//! ROUTE       : DELETE /api/users/profile/favorites/:id
//! ACCESS      : PRIVATE

const deleteFavoriteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const profile = await Profile.findOne({ user: req.user._id });

  if (product && profile) {
    product.likedBy.pull(req.user._id);
    profile.favoriteProducts.pull(req.params.id);
    const updatedProduct = await product.save();
    const updatedProfile = await profile.save();
    res.json([updatedProduct, updatedProfile]);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserAddresses,
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddressById,
  addItemToFavorites,
  getAllFavorites,
  deleteFavoriteProductById,
};
