package com.litwago.services;

import com.litwago.dto.out.PageResponse;
import com.litwago.exceptions.BadRequestException;
import com.litwago.exceptions.NotFoundException;
import com.litwago.models.Coupling;
import com.litwago.models.Role;
import com.litwago.models.User;
import com.litwago.repositories.CouplingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
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

    public Page<Coupling> getByTrailerNumber(String trailerNumber, boolean withoutChange, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return withoutChange
            ? repository.findByTrailerNumberAndTrailerChangeNullOrderByDateDesc(trailerNumber, pageable)
            : repository.findByTrailerNumberOrderByDateDesc(trailerNumber, pageable);
    }

    public Coupling getLastFullCoupling(String trailerNumber) {
        return repository.findTopByTrailerNumberAndTrailerChangeNotNullOrderByDateDesc(trailerNumber)
            .orElseThrow(NotFoundException::new);
    }

    public Page<Coupling> getDriverCouplings(int page, int size) {
        int userId = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return repository.findByOldDriverIdOrNewDriverIdOrderByDateDesc(
            userId,
            userId,
            PageRequest.of(page, size));
    }

    public Coupling getFullCoupling(int id) {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Coupling coupling = repository.findById(id).orElseThrow(NotFoundException::new);
        Integer oldDriverId = coupling.getOldDriver() == null ? null : coupling.getOldDriver().getId();
        Integer newDriverId = coupling.getNewDriver() == null ? null : coupling.getNewDriver().getId();
        if (user.getRole() != Role.MECHANIC
            && !Objects.equals(oldDriverId, user.getId())
            && !Objects.equals(newDriverId, user.getId()))
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
