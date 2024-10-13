<%@page import="java.util.Date"%>
<%
    long ts = (new Date()).getTime();
    session.setAttribute("versionJS",ts);
%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title> Template</title>
    </head>
    <body>
        <script src="js/jquery/jquery.min.js"></script>  
        <script src="js/notification/SmartNotification.min.js"></script>
        <script src="externe.js"></script>
    </body>
</html>
