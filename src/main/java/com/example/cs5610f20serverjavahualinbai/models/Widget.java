package com.example.cs5610f20serverjavahualinbai.models;

public class Widget {
  private String id;
  private String name;
  private String type;
  // when create a new widget and send to service.java,
  // need to specify the topic it belongs to
  private String topicId;
  private String text;
  private Integer size;
  private Integer widgetOrder;



  public Widget(String id, String name, String type) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  public Widget(String id, String name, String type, String topicId) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.topicId = topicId;
  }


  // need a default constructor that takes no argument
  public Widget() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getTopicId() {
    return this.topicId;
  }

  public void setTopicId(String topicId) {
    this.topicId = topicId;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Integer getSize() {
    return size;
  }

  public void setSize(Integer size) {
    this.size = size;
  }

  public Integer getWidgetOrder() {
    return widgetOrder;
  }

  public void setWidgetOrder(Integer widgetOrder) {
    this.widgetOrder = widgetOrder;
  }



}
