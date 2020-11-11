package com.example.cs5610f20serverjavahualinbai.services;

import com.example.cs5610f20serverjavahualinbai.models.Widget;
import com.example.cs5610f20serverjavahualinbai.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class WidgetService {

  // ask server to instantiate a widget repo and returns a reference
  @Autowired
  WidgetRepository widgetRepository;


  // hardcode a local list of widgets to simulate a database
  //List<Widget> widgets = new ArrayList<>();


  public List<Widget> findAllWidgets() {
    return (List<Widget>) widgetRepository.findAll();
  }


  public List<Widget> findWidgetsForTopic(String topicId) {
    return widgetRepository.findWidgetsForTopic(topicId);

  }


  public Widget findWidgetById(Integer widgetId) {
    return widgetRepository.findById(widgetId).get();

  }


  public Widget createWidget(Widget widget) {
    // save will do an insert if the object does not exist in database
    // an update if the object already exists in database
    // returns a new object inserted including primary key
    return widgetRepository.save(widget);

  }


  public Widget updateWidget(
      Integer widgetId,
      Widget newWidget) {

    // Widget widget = widgetRepository.findById(widgetId).get();
    Optional widgetO = widgetRepository.findById(widgetId);
    if (widgetO.isPresent()) {
      Widget widget = (Widget) widgetO.get();
      widget.setName(newWidget.getName());
      widget.setType(newWidget.getType());
      widget.setText(newWidget.getText());
      widget.setSize(newWidget.getSize());
      widget.setUrl(newWidget.getUrl());
      widget.setOrdered(newWidget.getOrdered());
      // save the widget we retrieved from database, not the newWidget
      // if we save newWidget, we would insert a new record
      return widgetRepository.save(widget);
    } else {
      return null;
    }

  }


  public Integer deleteWidget(Integer widgetId) {

    Optional widgetO = widgetRepository.findById(widgetId);
    if (widgetO.isPresent()) {
      // the selected widget exists in database, delete is successful
      widgetRepository.deleteById(widgetId);
      return 1;
    } else {
      return 0;
    }

  }


//  public List<Widget> moveWidget(String topicId, Integer widgetId, String direction) {
//    List<Widget> widgetsForTopic = findWidgetsForTopic(topicId);
//    Widget widget = findWidgetById(widgetId);
//    Integer prevOrder = widget.getWidgetOrder();
//
//    for (Widget w : widgetsForTopic) {
//      if (direction.equals("up")) {
//        // if the current widget is immediately above the selected widget
//        // moves down the current widget
//        if (w.getWidgetOrder() == prevOrder - 1) {
//          w.setWidgetOrder(w.getWidgetOrder() + 1);
//        }
//        // if the current widget is the selected widget
//        // moves up the selected widget
//        if (w.getId().equals(widgetId)) {
//          w.setWidgetOrder(prevOrder - 1);
//        }
//      }
//      // TODO: MOVE DOWN
//    }
//
//    // sort the widget list based on the order of each widget
//    widgetsForTopic.sort((w1, w2) -> w1.getWidgetOrder().compareTo(w2.getWidgetOrder()));
//    return widgetsForTopic;
//  }



}
