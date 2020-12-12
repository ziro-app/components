import React from "react";
import PropTypes from "prop-types";
import { Ziro } from "../../Icons/Ziro/index";
import { Amex } from "../../Icons/Amex/index";
import { Visa } from "../../Icons/Visa/index";
import { Mastercard } from "../../Icons/Mastercard/index";
import { Elo } from "../../Icons/Elo/index";
import { Hiper } from "../../Icons/Hiper/index";
import { Success } from "../../Icons/Success/index";
import { Alert } from "../../Icons/Alert/index";
import { Warning } from "../../Icons/Warning/index";
import { Pen } from "../../Icons/Pen/index";
import { Close } from "../../Icons/Close/index";
import { Menu } from "../../Icons/Menu/index";
import { Truck } from "../../Icons/Truck/index";
import { Card } from "../../Icons/Card/index";
import { User } from "../../Icons/User/index";
import { Logout } from "../../Icons/Logout/index";
import { Shopping } from "../../Icons/Shopping/index";
import { Back } from "../../Icons/Back/index";
import { Cnpj } from "../../Icons/Cnpj/index";
import { Whats } from "../../Icons/Whats/index";
import { Lock } from "../../Icons/Lock/index";
import { Email } from "../../Icons/Email/index";
import { Calendar } from "../../Icons/Calendar/index";
import { Id } from "../../Icons/Id/index";
import { Location } from "../../Icons/Location/index";
import { Facebook } from "../../Icons/Facebook/index";
import { Instagram } from "../../Icons/Instagram/index";
import { Money } from "../../Icons/Money/index";
import { Gear } from "../../Icons/Gear/index";
import { Present } from "../../Icons/Present/index";
import { Trending } from "../../Icons/Trending/index";
import { Globe } from "../../Icons/Globe/index";
import { Add } from "../../Icons/Add/index";
import { Send } from "../../Icons/Send/index";
import { Filter } from "../../Icons/Filter/index";
import { Camera } from "../../Icons/Camera/index";
import { Upload } from "../../Icons/Upload/index";
import { Trash } from "../../Icons/Trash/index";
import { Check } from "../../Icons/Check/index";
import { Star } from "../../Icons/Star/index";
import { Search } from "../../Icons/Search/index";
import { ShoppingBag } from "../../Icons/ShoppingBag/index";
import { ChevronUp } from "../../Icons/ChevronUp/index";
import { File } from "../../Icons/File/index";
import { Home } from "../../Icons/Home/index";
import { Heart } from "./../../Icons/Heart/index";
import { Cart } from "./../../Icons/Cart/index";
import { Forward } from "./../../Icons/Forward/index";
import { Help } from "./../../Icons/Help/index";
import { PlusCircle } from "./../../Icons/PlusCircle/index";
import { Copy } from "./../../Icons/Copy/index";
import { ChevronRight } from "./../../Icons/ChevronRight/index";
import { Rotate } from "./../../Icons/Rotate/index";
import { Zoom } from "./../../Icons/Zoom/index";
import { Headphone } from "./../../Icons/Headphone/index";
import { Link } from "./../../Icons/Link/index";
import { Circle } from "./../../Icons/Circle/index";
import { CircleChecked } from "./../../Icons/CircleChecked/index";
import { Rocket } from "./../../Icons/Rocket/index";
import { NoFlash } from "./../../Icons/NoFlash/index";
import { Sun } from "./../../Icons/Sun/index";
import { HappyEmoji } from "./../../Icons/HappyEmoji/index";
import { Document } from "./../../Icons/Document/index";
import { DocumentTwo } from "./../../Icons/DocumentTwo/index";
import { PersonalDocument } from "./../../Icons/PersonalDocument/index";
import { Magnifier } from "./../../Icons/Magnifier/index";
import { ShadowFace } from "./../../Icons/ShadowFace/index";
import { NoAccessories } from "./../../Icons/NoAccessories/index";
import { NoBackground } from "./../../Icons/NoBackground/index";
import { Library } from "./../../Icons/Library/index";
import { Percent } from "./../../Icons/Percent/index";

const Icon = ({ type, style, onClick, size, color, strokeWidth, fill }) => {
    const iconProps = { style, onClick, size, color, strokeWidth, fill };
    const iconList = {
        ziro: <Ziro {...iconProps} />,
        amex: <Amex {...iconProps} />,
        americanexpress: <Amex {...iconProps} />,
        visa: <Visa {...iconProps} />,
        mastercard: <Mastercard {...iconProps} />,
        elo: <Elo {...iconProps} />,
        hiper: <Hiper {...iconProps} />,
        hipercard: <Hiper {...iconProps} />,
        success: <Success {...iconProps} />,
        alert: <Alert {...iconProps} />,
        warning: <Warning {...iconProps} />,
        pen: <Pen {...iconProps} />,
        close: <Close {...iconProps} />,
        menu: <Menu {...iconProps} />,
        truck: <Truck {...iconProps} />,
        card: <Card {...iconProps} />,
        user: <User {...iconProps} />,
        logout: <Logout {...iconProps} />,
        shopping: <Shopping {...iconProps} />,
        back: <Back {...iconProps} />,
        cnpj: <Cnpj {...iconProps} />,
        whats: <Whats {...iconProps} />,
        lock: <Lock {...iconProps} />,
        email: <Email {...iconProps} />,
        calendar: <Calendar {...iconProps} />,
        id: <Id {...iconProps} />,
        location: <Location {...iconProps} />,
        facebook: <Facebook {...iconProps} />,
        instagram: <Instagram {...iconProps} />,
        money: <Money {...iconProps} />,
        gear: <Gear {...iconProps} />,
        present: <Present {...iconProps} />,
        trending: <Trending {...iconProps} />,
        globe: <Globe {...iconProps} />,
        add: <Add {...iconProps} />,
        send: <Send {...iconProps} />,
        filter: <Filter {...iconProps} />,
        camera: <Camera {...iconProps} />,
        upload: <Upload {...iconProps} />,
        trash: <Trash {...iconProps} />,
        check: <Check {...iconProps} />,
        star: <Star {...iconProps} />,
        search: <Search {...iconProps} />,
        shoppingBag: <ShoppingBag {...iconProps} />,
        chevronUp: <ChevronUp {...iconProps} />,
        file: <File {...iconProps} />,
        home: <Home {...iconProps} />,
        heart: <Heart {...iconProps} />,
        cart: <Cart {...iconProps} />,
        forward: <Forward {...iconProps} />,
        help: <Help {...iconProps} />,
        plusCircle: <PlusCircle {...iconProps} />,
        copy: <Copy {...iconProps} />,
        chevronRight: <ChevronRight {...iconProps} />,
        rotate: <Rotate {...iconProps} />,
        zoom: <Zoom {...iconProps} />,
        headphone: <Headphone {...iconProps} />,
        link: <Link {...iconProps} />,
        circleChecked: <CircleChecked {...iconProps} />,
        circle: <Circle {...iconProps} />,
        rocket: <Rocket {...iconProps} />,
        noFlash: <NoFlash {...iconProps} />,
        sun: <Sun {...iconProps} />,
        happyEmoji: <HappyEmoji {...iconProps} />,
        document: <Document {...iconProps} />,
        documentTwo: <DocumentTwo {...iconProps} />,
        personalDocument: <PersonalDocument {...iconProps} />,
        magnifier: <Magnifier {...iconProps} />,
        shadowFace: <ShadowFace {...iconProps} />,
        noAccessories: <NoAccessories {...iconProps} />,
        noBackground: <NoBackground {...iconProps} />,
        library: <Library {...iconProps} />,
        percent: <Percent {...iconProps} />,
    };
    return iconList[type] || null;
};

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
    fill: PropTypes.bool,
};

export default Icon;
