package com.example.cs5610f20serverjavahualinbai.repositories;

import com.example.cs5610f20serverjavahualinbai.models.Widget;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

// extends CrudRepository<object to crud, type of primary key>
public interface WidgetRepository extends CrudRepository<Widget, Integer> {

  // customize a method equivalent to the query
  // select * from widgets where topic_id = 'topic123'
  // if topic id does not exist in database, return null
  @Query(value = "select * from widgets where topic_id=:topicId", nativeQuery = true)
  public List<Widget> findWidgetsForTopic(
      @Param("topicId") String topicId);

  

}
