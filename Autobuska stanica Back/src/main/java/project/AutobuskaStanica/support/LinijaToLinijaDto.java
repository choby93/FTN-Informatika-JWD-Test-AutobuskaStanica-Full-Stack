package project.AutobuskaStanica.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import project.AutobuskaStanica.model.Linija;
import project.AutobuskaStanica.web.dto.LinijaDto;

@Component
public class LinijaToLinijaDto implements Converter<Linija, LinijaDto> {

	@Override
	public LinijaDto convert(Linija l) {

		LinijaDto dto = new LinijaDto();

		dto.setId(l.getId());
		dto.setBrojMesta(l.getBrojMesta());
		dto.setCenaKarte(l.getCenaKarte());
		dto.setVremePolaska(l.getVremePolaska());
		dto.setDestinacija(l.getDestinacija());
		dto.setPrevoznikId(l.getPrevoznik().getId());
		dto.setPrevoznikNaziv(l.getPrevoznik().getNaziv());

		return dto;
	}

	public List<LinijaDto> convert(List<Linija> linije) {

		List<LinijaDto> dtoS = new ArrayList<>();

		for (Linija l : linije) {
			dtoS.add(convert(l));
		}

		return dtoS;
	}
}
