package com.example.cs5610f20serverjavahualinbai.controllers;
import com.example.cs5610f20serverjavahualinbai.models.Widget;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


// this annotation makes the class susceptible to HTTP request
@RestController
// widget controller allows to manipulate all widgets and listens to incoming HTTP requests
public class WidgetController {

  // hardcode a local list of widgets to simulate a database
  List<Widget> widgets = new ArrayList<>();
  {
    widgets.add(new Widget("123", "Widget 1", "YOU_TUBE"));
    widgets.add(new Widget("234", "Widget 2", "IMAGE"));
    widgets.add(new Widget("345", "Widget 3", "HTML"));
  }


  @GetMapping("/hello")
  // if the incoming request is GET, execute the following function
  public String sayHello() {
    return "Hello World!!";
  }


  // @GetMapping("/find/all/widgets") // bad url
  // add token api to tell that this is not physical directory structure
  // but an api meant for dynamic data access
  @GetMapping("/api/widgets")
  public List<Widget> findAllWidgets() {
    return widgets;
  }



  @GetMapping("/api/widgets/{wid}")
  // reference the path param, parse it and convert to String, and then pass to widgetId
  public Widget findWidgetById(@PathVariable("wid") String widgetId) {
    for (Widget w : widgets) {
      if (w.getId().equals(widgetId)) {
        return w;
      }
    }
    return null;
  }

  // listen to incoming POST request
  @PostMapping("/api/widgets")
  // the RequestBody represents the body parsed from the request
  // parse JSON from the body of HTTP request coming from client
  // then the RequestBody tries to create an instance of type widget and
  // map the properties specified by client to the properties of widget
  // expect the parsed JSON object also has the same set of properties (id, name, type)
  // except id is not passed to widget since it is generated by database
  public Widget createWidget(@RequestBody Widget widget) {
    // simulate the fact that id used as primary key is set by database
    widget.setId(new Date().toString());
    // supposedly would be an insert into database
    widgets.add(widget);
    // return the actual object inserted to database
    return widget;
  }


  // TODO: updateWidget, deleteWidget
  @PutMapping("/api/widgets/{wid}")
  // widgetId is populated with the path var from incoming HTTP request
  // newWidget is populated with the new object from incoming HTTP request
  public Integer updateWidget(
      @PathVariable("wid") String widgetId,
      @RequestBody Widget newWidget) {
    for (Widget w : widgets) {
      if (w.getId().equals(widgetId)) {
        w.setName(newWidget.getName());
        w.setType(newWidget.getType());
        return 1;
      }
    }
    return 0; // return an int status
  }





}
