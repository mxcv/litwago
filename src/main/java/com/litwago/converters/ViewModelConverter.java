package com.litwago.converters;

public interface ViewModelConverter<DTO, VM> {

    VM toViewModel(DTO model);
}
