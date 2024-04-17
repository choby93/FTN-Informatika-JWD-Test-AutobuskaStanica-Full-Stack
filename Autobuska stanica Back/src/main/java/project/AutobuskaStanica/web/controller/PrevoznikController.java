package project.AutobuskaStanica.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.AutobuskaStanica.model.Prevoznik;
import project.AutobuskaStanica.service.PrevoznikService;
import project.AutobuskaStanica.support.PrevoznikDtoToPrevoznik;
import project.AutobuskaStanica.support.PrevoznikToPrevoznikDto;
import project.AutobuskaStanica.web.dto.PrevoznikDto;

@RestController
@RequestMapping(value = "/api/prevoznici", produces = MediaType.APPLICATION_JSON_VALUE)
public class PrevoznikController {

	@Autowired
	private PrevoznikService prevoznikService;
	@Autowired
	private PrevoznikToPrevoznikDto toPrevoznikDto;
	@Autowired
	private PrevoznikDtoToPrevoznik toEntity;

	@PreAuthorize("permitAll()")
	@GetMapping
	public ResponseEntity<List<PrevoznikDto>> getAll() {
		List<Prevoznik> prevoznici = prevoznikService.getAll();
		return new ResponseEntity<>(toPrevoznikDto.convert(prevoznici), HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PrevoznikDto> create(@Valid @RequestBody PrevoznikDto dto) {

		Prevoznik prevoznik = toEntity.convert(dto);
		Prevoznik savedPrevoznik = prevoznikService.save(prevoznik);

		return new ResponseEntity<>(toPrevoznikDto.convert(savedPrevoznik), HttpStatus.OK);
	}

}
