package project.AutobuskaStanica.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.AutobuskaStanica.model.Linija;
import project.AutobuskaStanica.service.LinijaService;
import project.AutobuskaStanica.support.LinijaDtoToLinija;
import project.AutobuskaStanica.support.LinijaToLinijaDto;
import project.AutobuskaStanica.web.dto.LinijaDto;

@RestController
@RequestMapping(value = "/api/linije", produces = MediaType.APPLICATION_JSON_VALUE)
public class LinijaController {

	@Autowired
	private LinijaService linijaService;
	@Autowired
	private LinijaToLinijaDto toLinijaDto;
	@Autowired
	private LinijaDtoToLinija toEntity;

	@PreAuthorize("permitAll()")
	@GetMapping
	public ResponseEntity<List<LinijaDto>> getAll(@RequestParam(required = false, defaultValue = "0") int pageNo,
			@RequestParam(required = false) String destinacija, @RequestParam(required = false) Long prevoznikId,
			@RequestParam(required = false) Double maxCena) {

		Page<Linija> page = linijaService.search(destinacija, prevoznikId, maxCena, pageNo);
		HttpHeaders headers = new HttpHeaders();
		headers.add("total-pages", Integer.toString(page.getTotalPages()));

		return new ResponseEntity<>(toLinijaDto.convert(page.getContent()), headers, HttpStatus.OK);
	}
	
	@PreAuthorize("permitAll()")
	@GetMapping(value = "/{id}")
	public ResponseEntity<LinijaDto> getOne(@PathVariable Long id) {
		Linija linija = linijaService.findOne(id);
		if (linija == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(toLinijaDto.convert(linija), HttpStatus.OK);
		}
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping
	public ResponseEntity<LinijaDto> createLinija(@Valid @RequestBody LinijaDto dto) {

		Linija linija = toEntity.convert(dto);
		Linija savedLinija = linijaService.save(linija);

		return new ResponseEntity<>(toLinijaDto.convert(savedLinija), HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping(value = "/{id}")
	public ResponseEntity<LinijaDto> editLinija(@PathVariable Long id, @Valid @RequestBody LinijaDto linijaDto) {

		if (!linijaDto.getId().equals(id)) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Linija linija = toEntity.convert(linijaDto);
		Linija updateLinija = linijaService.update(linija);

		return new ResponseEntity<>(toLinijaDto.convert(updateLinija), HttpStatus.OK);

	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<LinijaDto> deleteLinija(@PathVariable Long id) {

		Linija deleteLinija = linijaService.delete(id);

		if (deleteLinija == null) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}

	@PreAuthorize("hasRole('ROLE_KORISNIK')")
	@PutMapping(value = "/{id}/rezervacija")
	public ResponseEntity<Void> rezervacija(@PathVariable Long id) {

		Linija linija = linijaService.findOne(id);
		if (linija == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		if (linija.getPrevoznik() == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Linija rezervisanaKarta = linijaService.rezervacija(linija);
		if (rezervisanaKarta == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(HttpStatus.CREATED);
	}

}
