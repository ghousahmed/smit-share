// React Hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Firebase
import { db, ref, set, onValue, remove, auth, signOut } from "../db/index.js";
// Helper Functions
import downloadAll from "../helper/downloadAll.js";
import uploadFile from "../firebase/uploadFile.js";
import useScreenWidth from "../helper/screenWidth.js";
import TextArea from "../components/TextArea";
import ThemeButton from "../components/Button";
import DropZone from "../components/DropZone";
import FilesList from "../components/FilesList";
import { useTheme } from "../context/ThemeContext.jsx";
<<<<<<< Updated upstream
import Navbar from "../components/Navbar";

//Ant Design
import { Switch, Modal, notification } from "antd";
// Translations
import { useTranslation } from "react-i18next";
=======
import Footer from "../components/Footer.jsx"
>>>>>>> Stashed changes
// Assets
import LOGO from "../assets/logo.svg";
import TEXT_GREY from "../assets/text-grey.svg";
import TEXT_COLOR from "../assets/text-color.svg";
import FILE_GREY from "../assets/files-grey.svg";
import FILE_COLOR from "../assets/files-color.svg";
// Icons
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
// Export
export {
    Navbar,
    useTheme,
    downloadAll,
    uploadFile,
    useScreenWidth,
    TextArea,
    ThemeButton,
    DropZone,
    FilesList,
    useEffect,
    useState,
    db,
    ref,
    set,
    onValue,
    remove,
    auth,
    signOut,
    LOGO,
    FILE_COLOR,
    FILE_GREY,
    TEXT_COLOR,
    TEXT_GREY,
    FaDownload,
    MdDelete,
    FiMenu,
    MdLightMode,
    MdDarkMode,
<<<<<<< Updated upstream
    Link,
    Switch,
    Modal,
    notification,
    useTranslation,
=======
    Footer,
    FaGithub,
    TbWorld
>>>>>>> Stashed changes
};
