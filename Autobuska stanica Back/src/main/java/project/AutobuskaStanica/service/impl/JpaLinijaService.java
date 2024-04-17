package project.AutobuskaStanica.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import project.AutobuskaStanica.model.Linija;
import project.AutobuskaStanica.model.Rezervacija;
import project.AutobuskaStanica.repository.LinijaRepository;
import project.AutobuskaStanica.repository.RezervacijaRepository;
import project.AutobuskaStanica.service.LinijaService;

@Service
public class JpaLinijaService implements LinijaService {

	@Autowired
	private LinijaRepository linijaRepo;
	@Autowired
	private RezervacijaRepository rezervacijaRepo;

	@Override
	public Linija findOne(Long id) {
		Optional<Linija> linija = linijaRepo.findById(id);
		if (linija.isPresent()) {
			return linija.get();
		}
		return null;
	}

	@Override
	public Linija save(Linija linija) {
		return linijaRepo.save(linija);
	}

	@Override
	public Linija update(Linija linija) {
		return linijaRepo.save(linija);
	}

	@Override
	public Linija delete(Long id) {
		Linija linija = findOne(id);
		if (linija != null) {
			linijaRepo.delete(linija);
			return linija;
		}

		return null;
	}

	@Override
	public Page<Linija> search(String destinacija, Long prevozikId, Double maxCena, int pageNo) {
		if (maxCena == null) {
			maxCena = Double.MAX_VALUE;
		}
		return linijaRepo.search(destinacija, prevozikId, maxCena, PageRequest.of(pageNo, 3));
	}

	@Override
	public Linija rezervacija(Linija linija) {

		Linija rezervisano = findOne(linija.getId());
		if (rezervisano.getBrojMesta() > 0) {
			rezervisano.setBrojMesta(rezervisano.getBrojMesta() - 1);
			Rezervacija rezervacija = new Rezervacija(linija);
			rezervacijaRepo.save(rezervacija);
			return linijaRepo.save(rezervisano);

		}

		return null;
	}

}
