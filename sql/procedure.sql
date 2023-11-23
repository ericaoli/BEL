DROP PROCEDURE IF EXISTS INSERT_BOOK;
DELIMITER //
CREATE PROCEDURE INSERT_BOOK(pBookName VARCHAR(20), pEditorName VARCHAR(20), pAuthorName VARCHAR(20))
BEGIN
 DECLARE vID_EDITOR INT DEFAULT 0;
 DECLARE vID_AUTHOR INT DEFAULT 0;
 
 SELECT ID_EDITOR INTO vID_EDITOR FROM editor WHERE name = pEditorName;
 SELECT ID_AUTHOR INTO vID_AUTHOR FROM author WHERE lastname = pAuthorName OR firstname = pAuthorFirstname;
 
 IF vID_EDITOR = 0 THEN
	INSERT INTO editor(name) VALUES(pEditorName);
	SELECT LAST_INSERT_ID() INTO vID_EDITOR;
 END IF;
 
 IF vID_AUTHOR = 0 THEN
	INSERT INTO author(lastname) VALUES(pAuthorName);
	SELECT LAST_INSERT_ID() INTO vID_AUTHOR;
 END IF;
 
 INSERT INTO books(id_author,if id_editor, id_book_category, title) VALUES(vID_AUTHOR, vID_EDITOR, 1, pBookName);
END;
//
DELIMITER //

