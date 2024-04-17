package project.AutobuskaStanica.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Prevoznik {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, unique = true)
	private String naziv;
	@Column
	private String adresa;
	@Column(nullable = false, unique = true)
	private String PIB;
	@OneToMany(mappedBy = "prevoznik")
	private List<Linija> linije = new ArrayList<>();

	public Prevoznik() {
	}

	public Prevoznik(Long id, String naziv, String adresa, String pIB, List<Linija> linije) {
		this.id = id;
		this.naziv = naziv;
		this.adresa = adresa;
		PIB = pIB;
		this.linije = linije;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getPIB() {
		return PIB;
	}

	public void setPIB(String pIB) {
		PIB = pIB;
	}

	public List<Linija> getLinije() {
		return linije;
	}

	public void setLinije(List<Linija> linije) {
		this.linije = linije;
	}

}
