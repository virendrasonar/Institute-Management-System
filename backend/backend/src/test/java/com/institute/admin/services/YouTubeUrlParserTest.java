package com.institute.admin.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class YouTubeUrlParserTest {

    @Test
    void extractsIdFromWatchUrl() {
        assertEquals("dQw4w9WgXcQ", YouTubeUrlParser.extractVideoId(
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"));
    }

    @Test
    void extractsIdFromShortUrl() {
        assertEquals("dQw4w9WgXcQ", YouTubeUrlParser.extractVideoId(
                "https://youtu.be/dQw4w9WgXcQ?t=10"));
    }

    @Test
    void rejectsNonYoutubeUrl() {
        assertThrows(IllegalArgumentException.class,
                () -> YouTubeUrlParser.extractVideoId("https://example.com/video"));
    }
}
