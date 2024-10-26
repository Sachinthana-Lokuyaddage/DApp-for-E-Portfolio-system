import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Row } from "reactstrap";
import './Hero.css';

const Hero = ({ state }) => {
    const [modal, setModal] = useState(false);
    const [hero, setHero] = useState({
        imageLink: "",
        description: "",
        resumeLink: "",
        email: "" // Add email state
    });

    useEffect(() => {
        const { contract } = state;
        const fetchHero = async () => {
            const heroData = await contract.methods.getHero().call();
            setHero({
                imageLink: heroData.imageLink,
                description: heroData.description,
                resumeLink: heroData.resumeLink,
                email: heroData.email // Fetch email
            });
        };
        contract && fetchHero();
    }, [state]);

    return (
        <section className="hero">
            <div className='searchOption'>

            </div>
            <div className="container">
                <div className="hero-text">
                    <p><span></span> </p>
                    <h3>{hero.description}</h3>

                    {/* Modal for contact info */}
                    <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                        <ModalBody>
                            <Row className="text-align">
                                <label htmlFor="" toggle={() => setModal(!modal)}>
                                    Mail Id - {hero.email}
                                </label>
                            </Row>
                        </ModalBody>
                    </Modal>

                    <button className="msg-btn" onClick={() => setModal(true)}>To Contact</button>
                </div>
                <div className="hero-img">
                    <div className="img-container">
                        <img src={`https://gateway.pinata.cloud/ipfs/${hero.imageLink}`} alt="profilePhoto" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
