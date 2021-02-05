import React from "react";
import "./ProfileScreen.scss";
import { Route } from "react-router-dom";
import ProfileSidebar from "../../components/profile-sidebar/ProfileSidebar.js";
import YourInfo from "../profile-info-screen/YourInfo.js";
import ProfileAddresses from "../profile-addresses-screen/ProfileAddresses.js";
import Checkout from "../checkout-screen/Checkout.js";
import AllOrdersScreen from "../all-orders-screen/AllOrdersScreen";
//todo ADD GSAP SCROLL TO MAKE LEFT MENU STICKY
import gsap from "gsap";
import AddressEdit from "../address-edit-modal/AddressEdit";
import FavoriteScreen from "../profile-favorite-screen/FavoriteScreen";
import OrderScreen from "../order-screen/OrderScreen";

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
        <Route exact path="/profile/orders/:id" component={OrderScreen} />
        <Route exact path="/profile/orders/" component={AllOrdersScreen} />
      </div>
    </div>
  );
};

export default ProfileScreen;
