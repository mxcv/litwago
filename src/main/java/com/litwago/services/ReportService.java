package com.litwago.services;

import java.io.File;

public interface ReportService<T> {

    File createReport(T model);
}
