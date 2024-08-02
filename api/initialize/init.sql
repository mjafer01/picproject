-- Create User Table
CREATE TABLE IF NOT EXISTS user (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    username TEXT UNIQUE NOT NULL
);

-- Create Picture Table
CREATE TABLE IF NOT EXISTS picture (
                                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                                       url TEXT NOT NULL,
                                       title TEXT NOT NULL,
                                       createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                                       userId INTEGER,
                                       FOREIGN KEY (userId) REFERENCES user(id)
    );

-- Create Favorite Table
CREATE TABLE IF NOT EXISTS favorite (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        userId INTEGER,
                                        pictureId INTEGER,
                                        FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (pictureId) REFERENCES picture(id)
    );
