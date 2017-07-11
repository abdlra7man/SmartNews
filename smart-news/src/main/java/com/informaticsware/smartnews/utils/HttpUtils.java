package com.informaticsware.smartnews.utils;

/**
 * Created by abdelrahman on 12/7/17.
 */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class HttpUtils {

    public static String getContentsForURL(String pageURL) {
        URL url;
        StringBuilder builder = new StringBuilder();
        try {
            // get URL content
            url = new URL(pageURL);
            URLConnection conn = url.openConnection();

            // open the stream and put it into BufferedReader
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));

            String inputLine;

            while ((inputLine = br.readLine()) != null) {
                builder.append(inputLine);
            }
            br.close();

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return builder.toString();
    }
}
