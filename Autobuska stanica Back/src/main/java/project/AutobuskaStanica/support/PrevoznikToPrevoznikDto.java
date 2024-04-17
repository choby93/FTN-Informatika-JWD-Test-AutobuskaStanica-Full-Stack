package project.AutobuskaStanica.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import project.AutobuskaStanica.model.Prevoznik;
import project.AutobuskaStanica.web.dto.PrevoznikDto;

@Component
public class PrevoznikToPrevoznikDto implements Converter<Prevoznik, PrevoznikDto> {

	@Override
	public PrevoznikDto convert(Prevoznik p) {

		PrevoznikDto dto = new PrevoznikDto();

		dto.setId(p.getId());
		dto.setNaziv(p.getNaziv());
		dto.setAdresa(p.getAdresa());
		dto.setPIB(p.getPIB());

		return dto;
	}

	public List<PrevoznikDto> convert(List<Prevoznik> prevoznici) {
		List<PrevoznikDto> dtoS = new ArrayList<>();

		for (Prevoznik p : prevoznici) {
			dtoS.add(convert(p));
		}
		return dtoS;
	}
}
