package project.AutobuskaStanica.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import project.AutobuskaStanica.model.Prevoznik;
import project.AutobuskaStanica.service.PrevoznikService;
import project.AutobuskaStanica.web.dto.PrevoznikDto;

@Component
public class PrevoznikDtoToPrevoznik implements Converter<PrevoznikDto, Prevoznik> {

	@Autowired
	private PrevoznikService prevoznikService;

	@Override
	public Prevoznik convert(PrevoznikDto dto) {

		Prevoznik prevoznik = null;

		if (dto.getId() == null) {
			prevoznik = new Prevoznik();
		} else {
			prevoznik = prevoznikService.findOne(dto.getId());
		}

		if (prevoznik != null) {
			prevoznik.setNaziv(dto.getNaziv());
			prevoznik.setAdresa(dto.getAdresa());
			prevoznik.setPIB(dto.getPIB());
		}
		return prevoznik;
	}

}
