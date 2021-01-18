import React from "react";
import "./ProfileScreen.scss";
import { Route } from "react-router-dom";
import ProfileSidebar from "../../components/profile-sidebar/ProfileSidebar.js";
import YourInfo from "../../components/profile-info/YourInfo.js";
import ProfileAddresses from "../../components/profile-addresses/ProfileAddresses.js";
import Checkout from "../checkout/Checkout.js";

//todo ADD GSAP SCROLL TO MAKE LEFT MENU STICKY
import gsap from "gsap";
import AddressEdit from "../address-edit/AddressEdit";

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
      </div>
    </div>
  );
};

export default ProfileScreen;
