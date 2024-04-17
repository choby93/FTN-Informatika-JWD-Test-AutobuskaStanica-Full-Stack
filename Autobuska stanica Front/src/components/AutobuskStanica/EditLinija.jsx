import React, { useCallback, useEffect, useState } from "react";
import Axios from "../../apis/Axios";
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
import { useNavigate, useParams } from "react-router-dom";

//izmena linije
const EditLinija = () => {
  const linija = {
    id: -1,
    brojMesta: 0,
    cenaKarte: 0,
    destinacija: "",
    vremePolaska: "",
    prevoznik: -1,
  };
  const [prevoznici, setPrevoznici] = useState([]);
  const [izmenaLinije, setIzmenaLinija] = useState(linija);
  let params = useParams();
  let linijaId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    getLinijaById(linijaId);
    getAllPrevoznici();
  }, []);

  //preuzimanje linije po ID
  const getLinijaById = useCallback((id) => {
    Axios.get("/linije/" + id)
      .then((result) => {
        setIzmenaLinija({
          id: result.data.id,
          brojMesta: result.data.brojMesta,
          cenaKarte: result.data.cenaKarte,
          destinacija: result.data.destinacija,
          vremePolaska: result.data.vremePolaska,
          prevoznikId: result.data.prevoznik,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert("Došlo je do greške u preuzimanju linija!");
      });
  }, []);

  //izmena linije
  const editlinija = () => {
    let dto = {
      id: izmenaLinije.id,
      brojMesta: izmenaLinije.brojMesta,
      cenaKarte: izmenaLinije.cenaKarte,
      vremePolaska: izmenaLinije.vremePolaska,
      destinacija: izmenaLinije.destinacija,
      prevoznikId: izmenaLinije.prevoznik,
    };
    Axios.put("/linije/" + izmenaLinije.id, dto)
      .then(() => {
        navigate("/redVoznje");
      })
      .catch((err) => console.log(err));
  };

  //preuzimanje svih prevoznika
  const getAllPrevoznici = useCallback(() => {
    Axios.get("/prevoznici")
      .then((result) => {
        setPrevoznici(result.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Došlo je do greške u preuzimanju prevoznika!");
      });
  }, []);

  //selektovanje prevoznika
  const selectPrevoznik = () => {
    return prevoznici.map((p) => {
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

    let izmenjeno = { ...izmenaLinije };
    izmenjeno[name] = value;
    setIzmenaLinija(izmenjeno);
  };
  return (
    <Col>
      <Row>
        <Form>
          <FormGroup>
            <FormLabel htmlFor="brojMesta">Broj mesta</FormLabel>
            <FormControl
              id="brojMesta"
              name="brojMesta"
              type="number"
              value={izmenaLinije.brojMesta}
              onChange={(e) => inputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel value={izmenaLinije.cenaKarte}>Cena karte</FormLabel>
            <FormControl
              id="cenaKarte"
              name="cenaKarte"
              type="text"
              onChange={(e) => inputChange(e)}
              value={izmenaLinije.cenaKarte}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Destinacija</FormLabel>
            <FormControl
              id="destinacija"
              name="destinacija"
              type="text"
              onChange={(e) => inputChange(e)}
              value={izmenaLinije.destinacija}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Vreme polaska</FormLabel>
            <FormControl
              id="vremePolaska"
              name="vremePolaska"
              type="text"
              onChange={(e) => inputChange(e)}
              value={izmenaLinije.vremePolaska}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Prevoznik</FormLabel>
            <FormSelect
              id="prevoznik"
              name="prevoznik"
              onChange={(e) => inputChange(e)}
            >
              <option value=""></option>
              {selectPrevoznik()}
            </FormSelect>
          </FormGroup>
        </Form>
      </Row>
      <Col className="d-flex gap-1 mt-2">
        <Button variant="success" onClick={() => editlinija()}>
          Izmeni
        </Button>
        <Button variant="warning" onClick={() => navigate("/redVoznje")}>
          Odustani
        </Button>
      </Col>
    </Col>
  );
};

export default EditLinija;
