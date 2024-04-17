import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import Axios from "../../apis/Axios";
import { useNavigate } from "react-router-dom";

const AddLinija = () => {
  const linija = {
    brojMesta: "",
    cenaKarte: "",
    destinacija: "",
    vremePolaska: "",
    prevoznik: -1,
  };

  const [prevoznik, setPrevoznik] = useState([]);
  const [novaLinija, setNovaLinija] = useState(linija);
  const [validno, setValidno] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPrevoznici();
  }, []);

  const createLinija = () => {
    let dto = {
      brojMesta: novaLinija.brojMesta,
      cenaKarte: novaLinija.cenaKarte,
      vremePolaska: novaLinija.vremePolaska,
      destinacija: novaLinija.destinacija,
      prevoznikId: novaLinija.prevoznik,
    };

    Axios.post("/linije", dto)
      .then(() => {
        console.log("Uspešmo dodavanje!");
        navigate("/redVoznje");
      })
      .catch((error) => {
        console.log(error);
        alert("Došlo je do greške u dodavanju linije!");
      });
  };

  const getAllPrevoznici = useCallback(() => {
    Axios.get("/prevoznici")
      .then((result) => {
        setPrevoznik(result.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Došlo je do greške u preuzimanju prevoznika!");
      });
  }, []);

  const selectPrevoznik = () => {
    return prevoznik.map((p) => {
      return (
        <option value={p.id} key={p.id}>
          {p.naziv}
        </option>
      );
    });
  };

  const inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    novaLinija[name] = value;
    setNovaLinija(novaLinija);
    validacija();
  };

  const validacija = () => {
    if (
      novaLinija.brojMesta === "" ||
      novaLinija.cenaKarte === "" ||
      novaLinija.destinacija === "" ||
      novaLinija.vremePolaska === "" ||
      novaLinija.prevoznik === -1
    ) {
      setValidno(false);
    } else {
      setValidno(true);
    }
  };
  return (
    <Col>
      <h1>Autobuska stanica</h1>
      <br />
      <h3>Dodavanje linija</h3>
      <br />
      <br />
      <Row>
        <Form>
          <FormGroup>
            <FormLabel>Broj mesta</FormLabel>
            <FormControl
              name="brojMesta"
              type="text"
              onChange={(e) => inputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Cena karte</FormLabel>
            <FormControl
              name="cenaKarte"
              type="number"
              onChange={(e) => inputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Destinacija</FormLabel>
            <FormControl
              name="destinacija"
              type="text"
              onChange={(e) => inputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Vreme polaska</FormLabel>
            <FormControl
              name="vremePolaska"
              type="text"
              onChange={(e) => inputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Prevoznik</FormLabel>
            <FormSelect name="prevoznik" onChange={(e) => inputChange(e)}>
              <option value=""></option>
              {selectPrevoznik()}
            </FormSelect>
          </FormGroup>
        </Form>
      </Row>
      <Col className="d-flex gap-1 mt-2">
        <Button onClick={() => createLinija()} disabled={!validno}>
          Dodaj
        </Button>
        <Button variant="warning" onClick={() => navigate("/redVoznje")}>
          Odustani
        </Button>
      </Col>
    </Col>
  );
};

export default AddLinija;
