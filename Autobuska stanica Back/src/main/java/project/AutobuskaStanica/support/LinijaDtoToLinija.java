package project.AutobuskaStanica.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import project.AutobuskaStanica.model.Linija;
import project.AutobuskaStanica.service.LinijaService;
import project.AutobuskaStanica.service.PrevoznikService;
import project.AutobuskaStanica.web.dto.LinijaDto;

@Component
public class LinijaDtoToLinija implements Converter<LinijaDto, Linija> {

	@Autowired
	private LinijaService linijaService;
	@Autowired
	private PrevoznikService prevoznikService;

	@Override
	public Linija convert(LinijaDto dto) {

		Linija linija = null;

		if (dto.getId() == null) {
			linija = new Linija();
		} else {
			linija = linijaService.findOne(dto.getId());
		}

		if (linija != null) {
			linija.setBrojMesta(dto.getBrojMesta());
			linija.setCenaKarte(dto.getCenaKarte());
			linija.setVremePolaska(dto.getVremePolaska());
			linija.setDestinacija(dto.getDestinacija());
			linija.setPrevoznik(prevoznikService.findOne(dto.getPrevoznikId()));
		}

		return linija;
	}

}
