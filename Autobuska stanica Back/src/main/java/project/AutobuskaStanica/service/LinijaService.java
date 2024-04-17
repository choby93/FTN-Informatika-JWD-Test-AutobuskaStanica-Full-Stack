package project.AutobuskaStanica.service;

import org.springframework.data.domain.Page;

import project.AutobuskaStanica.model.Linija;

public interface LinijaService {

	Linija findOne(Long id);

	Linija save(Linija linija);

	Linija update(Linija linija);

	Linija delete(Long id);

	Page<Linija> search(String destinacija, Long prevozikId, Double maxCena, int pageNo);

	Linija rezervacija(Linija linija);

}
