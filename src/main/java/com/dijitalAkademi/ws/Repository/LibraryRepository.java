package com.dijitalAkademi.ws.Repository;

import com.dijitalAkademi.ws.entity.Library;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LibraryRepository extends JpaRepository<Library, Long> {
    Library findByNoteId(Long id);

    void deleteByNoteId_NoteId(Long id);
    void deleteAllByUserName(String userName);

    Library getNoteByNoteId_NoteIdAndUserName(Long id, String username);

    @Query(value = "select note_id from Library  where Library.username =:username", nativeQuery = true)
    List<String> getAllByUserName(@Param("username") String username);

    List<Library> findAllByUserName(String userName);

    Library findByUserName(String username);
}
