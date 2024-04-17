import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "../../apis/Axios";

const Register = () => {
  const korisnik = {
    id: -1,
    ime: "",
    prezime: "",
    korisnickoIme: "",
    eMail: "",
    lozinka: "",
    ponovljenaLozinka: "",
  };

  const [noviKorisnik, setNovkorisnik] = useState(korisnik);
  const [valid, setValid] = useState(false);
  let navigate = useNavigate();

  const addKorisnik = () => {
    const dto = {
      ime: noviKorisnik.ime,
      prezime: noviKorisnik.prezime,
      korisnickoIme: noviKorisnik.korisnickoIme,
      eMail: noviKorisnik.eMail,
      lozinka: noviKorisnik.lozinka,
      ponovljenaLozinka: noviKorisnik.ponovljenaLozinka,
    };
    Axios.post("/korisnici", dto)
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("Došlo je do greške, pokušajte ponovo");
      });
  };

  const valueInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    let novo = noviKorisnik;
    novo[name] = value;
    setNovkorisnik(novo);
    validacija();
  };
  const validacija = () => {
    if (
      noviKorisnik.ime === "" ||
      noviKorisnik.prezime === "" ||
      noviKorisnik.eMail === "" ||
      noviKorisnik.korisnickoIme === "" ||
      noviKorisnik.lozinka === "" ||
      noviKorisnik.ponovljenaLozinka === ""
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form className="d-grid gap-2 ">
            <Form.Label>Ime</Form.Label>
            <Form.Control
              name="ime"
              type="text"
              onChange={(e) => valueInputChange(e)}
            />

            <Form.Label>Prezime</Form.Label>
            <Form.Control
              name="prezime"
              onChange={(e) => valueInputChange(e)}
              type="text"
            />

            <Form.Label>eMail</Form.Label>
            <Form.Control
              name="eMail"
              onChange={(e) => valueInputChange(e)}
              type="text"
            />

            <Form.Label>Korisničko ime</Form.Label>
            <Form.Control
              name="korisnickoIme"
              onChange={(e) => valueInputChange(e)}
              type="text"
            />

            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              name="lozinka"
              onChange={(e) => valueInputChange(e)}
              type="password"
            />

            <Form.Label>Ponovljena lozinka</Form.Label>
            <Form.Control
              name="ponovljenaLozinka"
              onChange={(e) => valueInputChange(e)}
              type="password"
            />
            <Col className="d-flex gap-3 mt-3">
              <Button
                variant="success"
                disabled={!valid}
                onClick={(e) => addKorisnik(e)}
              >
                Registracija
              </Button>
              <Button variant="danger" onClick={() => navigate("/")}>
                Odustani
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
