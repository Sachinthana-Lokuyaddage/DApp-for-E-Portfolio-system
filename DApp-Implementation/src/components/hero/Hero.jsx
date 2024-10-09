import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, Row } from "reactstrap"
import heroImg from '../../assets/hero-img.png'
import './Hero.css'

const Hero = ({ state }) => {
    const [modal, setModal] = useState(false);
    const [description, setDescription] = useState("");
    const [cid, setCid] = useState("");
    useEffect(() => {
        const { contract } = state;
        const description = async () => {
            const descriptionText = await contract.methods.description().call();
            setDescription(descriptionText);
        }
        contract && description();
    }, [state])
    useEffect(() => {
        const { contract } = state;
        const cidOfImage = async () => {
            const cid = await contract.methods.imageLink().call();
            setCid(cid);
        }
        contract && cidOfImage();
    }, [state])
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-text">
                    <p><span>Sachinthana  </span>
                        is a Full-Stack Softwere Developer From SL.</p>
                    {/* <h1>I develop decentralised apps in web3 space.</h1> */}
                    <h3>A motivated software engineer with a solid foundation in full-stack development and a passion for building innovative solutions.</h3>
                    {/*  =========popup bootstrap==========  */}

                    <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                        <ModalBody>
                            <Row className="text-align">
                                <label htmlFor="" toggle={() => setModal(!modal)}>
                                    Mail Id - sachinthanabuddhika79@gmail.com
                                </label>

                            </Row>
                        </ModalBody>
                    </Modal>

                    <button className="msg-btn" onClick={() => setModal(true)}>To Contact</button>
                    {/*  =========popup bootstrap end==========  */}

                </div>
                <div className="hero-img">

                    <div className="img-container">
                        <img src={`https://gateway.pinata.cloud/ipfs/QmRAazsMThx95YGBQfPLepAL1zYP1MdKJV3GL48uatzHLW`} alt="profilePhoto" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
