import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import Axios from "../../apis/Axios";
import "../../index.css";
import { useNavigate } from "react-router-dom";

const AutobuskaStanica = () => {
  const [linija, setLinija] = useState([]);
  const [prevoznik, setPrevoznik] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pretraga, setPretraga] = useState({
    destinacija: "",
    prevoznik: "",
    maxismalnaCena: "",
  });
  const navigate = useNavigate();
  const admin = window.localStorage["role"] === "ROLE_ADMIN";
  const user = window.localStorage["role"] === "ROLE_KORISNIK";
  const ulogovan = window.localStorage["jwt"];

  useEffect(() => {
    getAllLinije(0);
    getAllPrevoznici();
  }, []);

  //preuzimanje svih linija
  const getAllLinije = useCallback((nextPage) => {
    const config = {
      params: {
        pageNo: nextPage,
        destinacija: pretraga.destinacija,
        prevoznikId: pretraga.prevoznik,
        maxCena: pretraga.maxismalnaCena,
      },
    };
    Axios.get("/linije", config)
      .then((result) => {
        setLinija(result.data);
        setPageNo(nextPage);
        setTotalPage(result.headers["total-pages"]);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert("Došlo je do greške u preuzimanju linija!");
      });
  }, []);

  const linije = () => {
    return linija.map((l) => {
      return (
        <tr key={l.id}>
          <td>{l.prevoznikNaziv}</td>
          <td>{l.destinacija}</td>
          <td>{l.brojMesta}</td>
          <td>{l.vremePolaska}</td>
          <td>{l.cenaKarte}</td>
          <td className="d-flex gap-1">
            {user && l.brojMesta > 0 ? (
              <Button onClick={() => rezervacija(l.id)}>Rezerviši</Button>
            ) : null}
            {user && l.brojMesta <= 0 ? (
              <strong style={{ color: "red" }}>RASPRODATO!</strong>
            ) : null}
            {admin ? (
              <>
                <Button variant="warning" onClick={() => goToEdit(l.id)}>
                  Izmeni
                </Button>
                <Button variant="danger" onClick={() => deleteLinija(l.id)}>
                  Obriši
                </Button>
              </>
            ) : null}
          </td>
        </tr>
      );
    });
  };

  // preuzimanje prevoznika
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

  //selektovanje prevoznika
  const selectPrevoznik = () => {
    return prevoznik.map((p) => {
      return (
        <option value={p.id} key={p.id}>
          {p.naziv}
        </option>
      );
    });
  };

  // brisanje linije
  const deleteLinija = (id) => {
    let confirm = window.confirm(
      "da li ste sigurni da želite da obrišete liniju?"
    );

    if (confirm) {
      Axios.delete("/linije/" + id)
        .then(reload())
        .catch((error) => {
          console.log(error);
          Alert("Došlo je do greške u brisanju!");
        });
    }
  };

  //rezervacija
  const rezervacija = (id) => {
    Axios.put("/linije/" + id + "/rezervacija")
      .then((result) => {
        console.log(result);
        reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Došlo je do greške pri rezervaciji!");
      });
  };

  const inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    pretraga[name] = value;
    setPretraga(pretraga);
  };

  //idi ba stranicu za izmenu linije
  const goToEdit = (linijaId) => {
    navigate("/redVoznje/edit/" + linijaId);
  };

  //osvezi stranicu
  const reload = () => {
    window.location.reload();
  };
  return (
    <Col>
      <h1>Pretraga linija</h1>
      <Form className="d-grid gap-2 mb-2">
        <Form.Group>
          <Form.Label>Destinacija</Form.Label>
          <Form.Control
            onChange={(e) => inputChange(e)}
            name="destinacija"
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Prevoznik</Form.Label>
          <Form.Select onChange={(e) => inputChange(e)} name="prevoznik">
            <option value="-1"></option>
            {selectPrevoznik()}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Maximalna cena</Form.Label>
          <Form.Control
            onChange={(e) => inputChange(e)}
            name="maxismalnaCena"
            type="number"
          />
        </Form.Group>
      </Form>
      <Col className="d-flex gap-1">
        <Button onClick={() => getAllLinije(0)}>Traži</Button>
        <Button onClick={() => reload()} variant="warning">
          Osveži
        </Button>
      </Col>

      <Row>
        <Col className="text-end">
          <Button
            variant="info"
            disabled={pageNo == "0"}
            onClick={() => {
              getAllLinije(pageNo - 1);
            }}
          >
            Prethodna
          </Button>
          <Button
            variant="info"
            disabled={pageNo + 1 === Number(totalPage)}
            onClick={() => {
              getAllLinije(pageNo + 1);
            }}
          >
            Sledeća
          </Button>
        </Col>
        <table className="mt-2">
          <thead>
            <tr>
              <th>Naziv prevoznika</th>
              <th>Destinacija</th>
              <th>Broj mesta</th>
              <th>Vreme polaska</th>
              <th>Cena karte</th>
              <th colSpan={"2"}></th>
            </tr>
          </thead>
          <tbody>{linije()}</tbody>
        </table>
      </Row>
      {admin ? (
        <Button
          variant="success"
          className="mt-3"
          onClick={() => navigate("/dodajLiniju")}
        >
          Dodaj Liniju
        </Button>
      ) : null}
    </Col>
  );
};

export default AutobuskaStanica;
