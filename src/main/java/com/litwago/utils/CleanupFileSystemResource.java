package com.litwago.utils;

import org.springframework.core.io.FileSystemResource;

import java.io.*;

public class CleanupFileSystemResource extends FileSystemResource {

    public CleanupFileSystemResource(File file) {
        super(file);
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return new DeleteOnCloseFileInputStream(super.getFile());
    }

    private static final class DeleteOnCloseFileInputStream extends FileInputStream {

        private final File file;

        DeleteOnCloseFileInputStream(File file) throws FileNotFoundException {
            super(file);
            this.file = file;
        }

        @Override
        public void close() throws IOException {
            super.close();
            file.delete();
        }
    }
}
