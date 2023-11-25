DROP PROCEDURE IF EXISTS INSERT_BOOK;
DELIMITER //
CREATE PROCEDURE INSERT_BOOK(pBookTitle VARCHAR(250), 
							 pBookPublicationYear INT(11), 
							 pBookDescription VARCHAR(4000), 
							 pBookISBN VARCHAR(50),
							 pBookUrlCoverImage VARCHAR(250),
							 pBookAltText VARCHAR(100),
							 pBookDateReadingClub DATE,
							 pIdBookCategory INT,
							 pBookEditorName VARCHAR(50),
							 pAuthorFirstname VARCHAR(50), 
							 pAuthorLastname VARCHAR(50))
BEGIN
 DECLARE vID_EDITOR INT DEFAULT 0;
 DECLARE vID_AUTHOR INT DEFAULT 0;
 
 SELECT ID_EDITOR INTO vID_EDITOR FROM editor WHERE name = pBookEditorName;
 SELECT ID_AUTHOR INTO vID_AUTHOR FROM author WHERE lastname = pAuthorLastname AND firstname = pAuthorFirstname;
 
 IF vID_EDITOR = 0 THEN
	INSERT INTO editor(name) VALUES(pBookEditorName);
	SELECT LAST_INSERT_ID() INTO vID_EDITOR;
 END IF;
 
 IF vID_AUTHOR = 0 THEN
	INSERT INTO author(firstname, lastname) VALUES(pAuthorFirstname, pAuthorLastname);
	SELECT LAST_INSERT_ID() INTO vID_AUTHOR;
 END IF;
 
 INSERT INTO books	
 			 (title, publication_year, description, ISBN, url_cover_image, alt_text, date_reading_club, id_editor, id_author, id_book_category) 
      VALUES (pBookTitle, 
			  pBookPublicationYear, 
			  pBookDescription, 
			  pBookISBN, 
			  pBookUrlCoverImage, 
			  pBookAltText, 
			  pBookDateReadingClub,
			  vID_EDITOR,
			  vID_AUTHOR, 
			  pIdBookCategory);
END;
//
DELIMITER //

