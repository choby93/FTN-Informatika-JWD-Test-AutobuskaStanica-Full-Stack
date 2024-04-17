package project.AutobuskaStanica.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Rezervacija {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne
	private Linija linija;

	public Rezervacija() {
		super();
	}

	public Rezervacija(Linija linija) {
		super();
		this.linija = linija;
	}

	public Rezervacija(long id, Linija linija) {
		super();
		this.id = id;
		this.linija = linija;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Linija getLinija() {
		return linija;
	}

	public void setLinija(Linija linija) {
		this.linija = linija;
	}

}
