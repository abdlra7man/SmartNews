package com.informaticsware.smartnews.utils;

/**
 * Created by abdelrahman on 12/7/17.
 */

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class HttpUtils {

    public static String getContentsForURL(String pageURL) {
        String contents = "";
        try {
            Document doc = Jsoup.connect(pageURL).get();
            contents = doc.body().text();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return contents;
    }
}
