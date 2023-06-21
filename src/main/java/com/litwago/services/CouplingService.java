package com.litwago.services;

import com.litwago.exceptions.BadRequestException;
import com.litwago.exceptions.NotFoundException;
import com.litwago.models.Coupling;
import com.litwago.models.User;
import com.litwago.repositories.CouplingRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class CouplingService {

    private final CouplingRepository repository;

    public void createCoupling(Coupling coupling) {
        int userId = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        Integer oldDriverId = coupling.getOldDriver() == null ? null : coupling.getOldDriver().getId();
        Integer newDriverId = coupling.getNewDriver() == null ? null : coupling.getNewDriver().getId();
        if (!Objects.equals(oldDriverId, userId) && !Objects.equals(newDriverId, userId)
            || Objects.equals(oldDriverId, newDriverId)
            || Objects.equals(newDriverId, userId) && oldDriverId != null)
            throw new BadRequestException();
        repository.save(coupling);
    }

    public List<Coupling> getByTrailerNumber(String trailerNumber) {
        return repository.findByTrailerNumberOrderByDesc(trailerNumber);
    }

    public Coupling getLastFullCoupling(String trailerNumber) {
        return repository.findTopByTrailerNumberAndTrailerChangeNotNullOrderByDateDesc(trailerNumber)
            .orElseThrow(NotFoundException::new);
    }

    public List<Coupling> getDriverCouplings() {
        int userId = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return repository.findByOldDriverIdOrNewDriverIdOrderByDesc(userId, userId);
    }

    public Coupling getFullCoupling(int id) {
        int userId = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        Coupling coupling = repository.findById(id).orElseThrow(NotFoundException::new);
        Integer oldDriverId = coupling.getOldDriver() == null ? null : coupling.getOldDriver().getId();
        Integer newDriverId = coupling.getNewDriver() == null ? null : coupling.getNewDriver().getId();
        if (!Objects.equals(oldDriverId, userId) && !Objects.equals(newDriverId, userId))
            throw new NotFoundException();
        if (coupling.getTrailerChange() == null)
            coupling.setTrailerChange(repository
                .findTopByTrailerNumberAndTrailerChangeNotNullAndDateBeforeOrderByDateDesc(
                    coupling.getTrailerNumber(),
                    coupling.getDate())
                .orElseThrow(NotFoundException::new)
                .getTrailerChange());
        return coupling;
    }
}
