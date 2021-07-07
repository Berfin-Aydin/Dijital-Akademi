package com.dijitalAkademi.ws.Repository;

import com.dijitalAkademi.ws.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    //List<Note> findByNoteIdIn(List<Long> noteId);

    @Query(value=
            "SELECT * FROM Note l1 WHERE l1.note_id IN (:noteId)",
            nativeQuery=true)
    List<Note> findAllByNoteIds(@Param("noteId") Long[] noteId);


}
