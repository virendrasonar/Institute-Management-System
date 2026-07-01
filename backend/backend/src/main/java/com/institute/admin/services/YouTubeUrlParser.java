package com.institute.admin.services;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

final class YouTubeUrlParser {

    private YouTubeUrlParser() {}

    static String extractVideoId(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("YouTube video URL is required");
        }

        String input = value.trim();
        if (isVideoId(input)) {
            return input;
        }

        try {
            URI uri = URI.create(input);
            String host = uri.getHost();
            if (host == null) {
                throw invalidUrl();
            }

            host = host.toLowerCase();
            String path = uri.getPath() == null ? "" : uri.getPath();
            String candidate = null;

            if (host.equals("youtu.be") || host.endsWith(".youtu.be")) {
                candidate = firstPathSegment(path);
            } else if (host.equals("youtube.com") || host.endsWith(".youtube.com")
                    || host.equals("youtube-nocookie.com") || host.endsWith(".youtube-nocookie.com")) {
                if (path.equals("/watch")) {
                    candidate = queryParameter(uri.getRawQuery(), "v");
                } else if (path.startsWith("/embed/") || path.startsWith("/shorts/") || path.startsWith("/live/")) {
                    candidate = firstPathSegment(path.substring(path.indexOf('/', 1)));
                }
            }

            if (!isVideoId(candidate)) {
                throw invalidUrl();
            }
            return candidate;
        } catch (IllegalArgumentException exception) {
            if ("Invalid YouTube URL or video ID".equals(exception.getMessage())) {
                throw exception;
            }
            throw invalidUrl();
        }
    }

    private static String queryParameter(String query, String name) {
        if (query == null) return null;
        return Arrays.stream(query.split("&"))
                .map(part -> part.split("=", 2))
                .filter(pair -> URLDecoder.decode(pair[0], StandardCharsets.UTF_8).equals(name))
                .map(pair -> pair.length == 2 ? URLDecoder.decode(pair[1], StandardCharsets.UTF_8) : "")
                .findFirst()
                .orElse(null);
    }

    private static String firstPathSegment(String path) {
        return Arrays.stream(path.split("/"))
                .filter(segment -> !segment.isBlank())
                .findFirst()
                .orElse(null);
    }

    private static boolean isVideoId(String value) {
        return value != null && value.matches("[A-Za-z0-9_-]{11}");
    }

    private static IllegalArgumentException invalidUrl() {
        return new IllegalArgumentException("Invalid YouTube URL or video ID");
    }
}
