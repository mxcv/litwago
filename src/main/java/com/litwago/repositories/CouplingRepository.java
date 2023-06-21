package com.litwago.repositories;

import com.litwago.models.Coupling;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
public interface CouplingRepository extends JpaRepository<Coupling, Integer> {

    List<Coupling> findByTrailerNumberOrderByDateDesc(String trailerNumber);
    List<Coupling> findByOldDriverIdOrNewDriverIdOrderByDateDesc(Integer oldDriverId, Integer newDriverId);
    Optional<Coupling> findTopByTrailerNumberAndTrailerChangeNotNullOrderByDateDesc(String trailerNumber);
    Optional<Coupling> findTopByTrailerNumberAndTrailerChangeNotNullAndDateBeforeOrderByDateDesc(String trailerNumber, OffsetDateTime date);
}
