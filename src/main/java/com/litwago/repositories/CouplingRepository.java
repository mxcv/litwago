package com.litwago.repositories;

import com.litwago.models.Coupling;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
public interface CouplingRepository extends JpaRepository<Coupling, Integer> {

    Page<Coupling> findByTrailerNumberOrderByDateDesc(String trailerNumber, Pageable pageable);
    Page<Coupling> findByTrailerNumberAndTrailerChangeNullOrderByDateDesc(String trailerNumber, Pageable pageable);
    Page<Coupling> findByOldDriverIdOrNewDriverIdOrderByDateDesc(Integer oldDriverId, Integer newDriverId, Pageable pageable);
    Optional<Coupling> findTopByTrailerNumberAndTrailerChangeNotNullOrderByDateDesc(String trailerNumber);
    Optional<Coupling> findTopByTrailerNumberAndTrailerChangeNotNullAndDateBeforeOrderByDateDesc(String trailerNumber, OffsetDateTime date);
}
