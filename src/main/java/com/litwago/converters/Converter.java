package com.litwago.converters;

public interface Converter<FROM, TO> {

    TO convert(FROM model);
}
