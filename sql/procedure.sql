DROP PROCEDURE IF EXISTS INSERT_BOOK;
DELIMITER //
CREATE PROCEDURE INSERT_BOOK(pBookTitle VARCHAR(250), 
							pBookPublication_year INT(11), 
							pBookDescription VARCHAR(4000), 
							pBookEditorName VARCHAR(50),
							pBookISBN VARCHAR(50),
							pBookUrl_cover_image VARCHAR(250),
							pBookAlt_text VARCHAR(100),
							pBookDate_reading_club DATE, 
							pAuthorFirstname VARCHAR(50), 
							pAuthorLastName VARCHAR(50))
BEGIN
 DECLARE vID_EDITOR INT DEFAULT 0;
 DECLARE vID_AUTHOR INT DEFAULT 0;
 
 SELECT ID_EDITOR INTO vID_EDITOR FROM editor WHERE name = pEditorName;
 SELECT ID_AUTHOR INTO vID_AUTHOR FROM author WHERE lastname = pAuthorLastname OR firstname = pAuthorFirstname;
 
 IF vID_EDITOR = 0 THEN
	INSERT INTO editor(name) VALUES(pEditorName);
	SELECT LAST_INSERT_ID() INTO vID_EDITOR;
 END IF;
 
 IF vID_AUTHOR = 0 THEN
	INSERT INTO author(firstname) VALUES(pAuthorFirstame);
	INSERT INTO author(lastname) VALUES(pAuthorLastname);
	SELECT LAST_INSERT_ID() INTO vID_AUTHOR;
 END IF;
 
 INSERT INTO books	(title, 
 					publication_year, 
					description, 
					ISBN, 
					url_cover_image, 
					alt_text, 
					date_reading_club, 
					if 	id_editor, 
						id_author, 
						id_book_category) 
					VALUES	(pBookTitle, 
							pBookPublication_year, 
							pBookDescription, 
							pBookEditorName, 
							pBookISBN, 
							pBookUrl_cover_image, 
							pBookAlt_text,
							pBookDate_reading_club,
							pAuthorFirstname, 
							pAuthorLastName,
							vID_EDITOR, 
							vID_AUTHOR, 
							1);
END;
//
DELIMITER //

