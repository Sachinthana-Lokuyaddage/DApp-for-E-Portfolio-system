import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Row } from 'reactstrap'; // Import Modal components
import './Contact.css';

const Contact = ({ state }) => {
    const [modal, setModal] = useState(false); // State for modal visibility
    const [email, setEmail] = useState(""); // State for storing the email

    useEffect(() => {
        const { contract } = state;
        const resumeDetails = async () => {
            if (contract) {
                const heroData = await contract.methods.getHero().call();
                setEmail(heroData.email); // Set email from the contract data
            }
        };
        contract && resumeDetails();
    }, [state]);

    return (
        <section className="contact-section">
            <h1 className="title">
                Interested?
                Let's Get In Touch!
            </h1>
            <button className="downlodeBTN" onClick={() => setModal(true)}>
                Contact
            </button>

            {/* Modal for contact info */}
            <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalBody>
                    <Row className="text-align">
                        <label>
                            Mail Id - {email}
                        </label>
                    </Row>
                </ModalBody>
            </Modal>
        </section>
    );
}

export default Contact;
