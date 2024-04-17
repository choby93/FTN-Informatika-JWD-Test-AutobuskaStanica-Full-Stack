package project.AutobuskaStanica.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.AutobuskaStanica.model.Prevoznik;
import project.AutobuskaStanica.repository.PrevoznikRepository;
import project.AutobuskaStanica.service.PrevoznikService;

@Service
public class JpaPrevoznikService implements PrevoznikService {

	@Autowired
	private PrevoznikRepository prevoznikRepo;

	@Override
	public List<Prevoznik> getAll() {
		return prevoznikRepo.findAll();
	}

	@Override
	public Prevoznik findOne(Long id) {
		Optional<Prevoznik> prevoznik = prevoznikRepo.findById(id);
		if (prevoznik.isPresent()) {
			return prevoznik.get();
		}
		return null;
	}

	@Override
	public Prevoznik save(Prevoznik prevoznik) {
		return prevoznikRepo.save(prevoznik);
	}

}
