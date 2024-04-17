INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga)
              VALUES (1,'miroslav@maildrop.cc','miroslav','$2y$12$NH2KM2BJaBl.ik90Z1YqAOjoPgSd0ns/bF.7WedMxZ54OhWQNNnh6','Miroslav','Simic','ADMIN');
INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga)
              VALUES (2,'tamara@maildrop.cc','tamara','$2y$12$DRhCpltZygkA7EZ2WeWIbewWBjLE0KYiUO.tHDUaJNMpsHxXEw9Ky','Tamara','Milosavljevic','KORISNIK');
INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga)
              VALUES (3,'petar@maildrop.cc','petar','$2y$12$i6/mU4w0HhG8RQRXHjNCa.tG2OwGSVXb0GYUnf8MZUdeadE4voHbC','Petar','Jovic','KORISNIK');


INSERT INTO prevoznik (id, pib, naziv, adresa) VALUES (1, 100495556, "Dunavprevoz doo", "Bačka Palanka" );
INSERT INTO prevoznik (id, pib, naziv, adresa) VALUES (2, 109851317, "Dab Brat doo", "Požega" );
INSERT INTO prevoznik (id, pib, naziv, adresa) VALUES (3, 100277615, "JGSP Novi Sad", "Novi Sad" );
INSERT INTO prevoznik (id, pib, naziv, adresa) VALUES (4, 100142462, "Saobracaj Zabalj", "Žabalj" );
INSERT INTO prevoznik (id, pib, naziv, adresa) VALUES (5, 100002006, "Lasta", "Beograd" );

INSERT INTO  linija (id, broj_mesta, destinacija, cena_karte, vreme_polaska, prevoznik_id) VALUES (1, 48, "Beograd", 918.66, "12:30h", 4);
INSERT INTO  linija (id, broj_mesta, destinacija, cena_karte, vreme_polaska, prevoznik_id) VALUES (2, 52, "Subotica", 619.9, "14:22h", 2);
INSERT INTO  linija (id, broj_mesta, destinacija, cena_karte, vreme_polaska, prevoznik_id) VALUES (3, 2, "Bačka Palanka", 420, "17:00h", 1 );
INSERT INTO  linija (id, broj_mesta, destinacija, cena_karte, vreme_polaska, prevoznik_id) VALUES (4, 36, "Vrbas", 575.20, "21:20h", 5);
INSERT INTO  linija (id, broj_mesta, destinacija, cena_karte, vreme_polaska, prevoznik_id) VALUES (5, 46,"Niš", 1230.9, "18:45h", 3);