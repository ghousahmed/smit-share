import { useState, useEffect } from "react";

const useScreenWidth = () => {

    const [screenWidth, setScreenWidth] = useState({
        widthScreen: window.innerWidth,
        heightScreen: window.screen.height

    });

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth((prevScreenSize) => ({
                ...prevScreenSize,
                widthScreen: window.innerWidth,
                heightScreen: window.innerHeight,

            }));
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screenWidth]);

    return (screenWidth)
}

export default useScreenWidth;