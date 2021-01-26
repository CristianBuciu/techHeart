import React from "react";
import "./ProfileScreen.scss";
import { Route } from "react-router-dom";
import ProfileSidebar from "../../components/profile-sidebar/ProfileSidebar.js";
import YourInfo from "../profile-info/YourInfo.js";
import ProfileAddresses from "../profile-addresses/ProfileAddresses.js";
import Checkout from "../checkout/Checkout.js";

//todo ADD GSAP SCROLL TO MAKE LEFT MENU STICKY
import gsap from "gsap";
import AddressEdit from "../address-edit/AddressEdit";
import FavoriteScreen from "../profile-favorite/FavoriteScreen";

//!=================================================================
const ProfileScreen = () => {
  return (
    <div className="profile-screen">
      <ProfileSidebar />
      <div className="profile-screen__right">
        <Route exact path="/profile/info" component={YourInfo} />
        <Route exact path="/profile/addresses" component={ProfileAddresses} />
        <Route exact path="/profile/checkout/:id?" component={Checkout} />{" "}
        <Route exact path="/profile/addresses/:id" component={AddressEdit} />{" "}
        <Route exact path="/profile/favorites" component={FavoriteScreen} />{" "}
      </div>
    </div>
  );
};

export default ProfileScreen;
