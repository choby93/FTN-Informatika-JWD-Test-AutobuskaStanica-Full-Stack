package project.AutobuskaStanica.service;

import java.util.List;

import project.AutobuskaStanica.model.Prevoznik;

public interface PrevoznikService {

	List<Prevoznik> getAll();

	Prevoznik findOne(Long id);

	Prevoznik save(Prevoznik prevoznik);

}
