package com.example.cs5610f20serverjavahualinbai.controllers;
import com.example.cs5610f20serverjavahualinbai.models.Widget;
import com.example.cs5610f20serverjavahualinbai.services.WidgetService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


// this annotation makes the class susceptible to HTTP request
@RestController
// configure the server to accept queries from listed domains
@CrossOrigin(origins = "*")
// widget controller allows to manipulate all widgets and listens to incoming HTTP requests
public class WidgetController {

  // controller delegates all the data manipulations to service
  WidgetService service = new WidgetService();


  @GetMapping("/hello")
  // if the incoming request is GET, execute the following function
  public String sayHello() {
    return "Hello World!!";
  }


  // add token api to tell that this is not physical directory structure
  // but an api meant for dynamic data access
  @GetMapping("/api/widgets")
  public List<Widget> findAllWidgets() {
    return service.findAllWidgets();
  }

  @GetMapping("/api/topics/{topicId}/widgets")
  public List<Widget> findWidgetsForTopic(@PathVariable("topicId") String topicId) {
    return service.findWidgetsForTopic(topicId);
  }


  @GetMapping("/api/widgets/{wid}")
  // reference the path param, parse it and convert to String, and then pass to widgetId
  public Widget findWidgetById(@PathVariable("wid") String widgetId) {
    return service.findWidgetById(widgetId);
  }


  // listen to incoming POST request
//  @PostMapping("/api/widgets")
  @PostMapping("/api/topics/{topicId}/widgets")
  // the RequestBody represents the body parsed from the request
  // parse JSON from the body of HTTP request coming from client
  // then the RequestBody tries to create an instance of type widget and
  // map the properties specified by client to the properties of widget
  // expect the parsed JSON object also has the same set of properties (id, name, type)
  // except id is not passed to widget since it is generated by database
  public Widget createWidget(@RequestBody Widget widget, @PathVariable("topicId") String topicId) {
    return service.createWidget(widget);
  }


  // TODO: updateWidget, deleteWidget
  @PutMapping("/api/widgets/{wid}")
  // widgetId is populated with the path var from incoming HTTP request
  // newWidget is populated with the new object from incoming HTTP request
  public Integer updateWidget(
      @PathVariable("wid") String widgetId,
      @RequestBody Widget newWidget) {
    return service.updateWidget(widgetId, newWidget);
  }


  @DeleteMapping("/api/widgets/{wid}")
  public Integer deleteWidget(@PathVariable("wid") String widgetId) {
    return service.deleteWidget(widgetId);
  }





}
