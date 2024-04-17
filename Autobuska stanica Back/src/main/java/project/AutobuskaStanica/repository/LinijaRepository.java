package project.AutobuskaStanica.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import project.AutobuskaStanica.model.Linija;

@Repository
public interface LinijaRepository extends JpaRepository<Linija, Long> {

	@Query(
	"SELECT l FROM Linija l WHERE"
	+ "(:destinacija IS NULL OR l.destinacija LIKE %:destinacija%) AND"
	+ "(:prevoznikId IS NULL OR l.prevoznik.id LIKE :prevoznikId) AND"
	+ "(:maxCena IS NULL OR l.cenaKarte <= :maxCena)"
	)

	Page<Linija> search(
			@Param("destinacija") String destinacija, 
			@Param("prevoznikId") Long prevoznikId, 
			@Param("maxCena") Double maxCena,
			Pageable pageNo);

}