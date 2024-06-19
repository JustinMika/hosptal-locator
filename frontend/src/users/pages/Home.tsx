/* eslint-disable no-unused-vars */
import Header from "../../components/site/Header";
import Content from "../../components/site/Content";
import HeroHome from "../../components/site/HeroHome";
import saveVisite from "../../utils/saveVisitors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    window.document.title = "Accueil | 1000pharma";
    const [users, setusers] = useState([]);

    useEffect(() => {
        setusers(JSON.parse(localStorage.getItem("users")));
    }, []);

    const navigate = useNavigate();

    const openWhatsAppChat = () => {
        // const phoneNumber = '+243815027256'
        // const message = 'Bonjour!'

        // const encodedMessage = encodeURIComponent(message)
        // const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
        // window.open(url, '_blank')
        navigate("/services");
    };
    localStorage.setItem("isPharmacien", false);
    useEffect(() => {
        return () => {
            saveVisite(window.document.title);
        };
    }, []);
    return (
        <>
            <Header />
            <Content>
                <HeroHome openWhatsAppChat={openWhatsAppChat} />
            </Content>
        </>
    );
};

export default Home;
